'use client';
import React, { useState, useEffect } from 'react';
import { db, auth } from '../utils/firebase';
import { onSnapshot, doc, updateDoc, setDoc, arrayUnion } from 'firebase/firestore';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';

import LobbyView from '../components/LobbyView';
import RoleRevealOverlay from '../components/RoleRevealOverlay';
import WeaponSelector from '../components/WeaponSelector';
import DetectiveWaiting from '../components/DetectiveWaiting';
import GameBoard from '../components/GameBoard';
import VotingOverlay from '../components/VotingOverlay';
import EndGameScreen from '../components/EndGameScreen';
import { generateCrimeScene } from '../utils/gameLogic';

export default function Home() {
  const [user, setUser] = useState(null);
  const [roomId] = useState("room_alpha"); // 테스트용 고정 룸
  const [gameData, setGameData] = useState(null);
  const [hasSeenRole, setHasSeenRole] = useState(false);

  // Auth & Room Sync
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      if (u) setUser(u);
      else signInAnonymously(auth);
    });
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!user) return;
    const roomRef = doc(db, 'rooms', roomId);
    const unsubRoom = onSnapshot(roomRef, (docSnap) => {
      if (docSnap.exists()) setGameData(docSnap.data());
      else setDoc(roomRef, { players: {}, gamePhase: 'LOBBY', logs: [] });
    });
    return () => unsubRoom();
  }, [user, roomId]);

  // Player Join
  useEffect(() => {
    if (user && gameData && !gameData.players[user.uid]) {
      updateDoc(doc(db, 'rooms', roomId), {
        [`players.${user.uid}`]: {
          displayName: `Player ${user.uid.slice(0,4)}`,
          isHost: Object.keys(gameData.players).length === 0,
          uid: user.uid,
          isAlive: true
        }
      });
    }
  }, [user, gameData, roomId]);

  // --- Handlers ---

  const handleWeaponCommit = async (weapon) => {
    // 증거 생성 및 페이즈 전환
    const evidenceList = generateCrimeScene(weapon.id);
    await updateDoc(doc(db, 'rooms', roomId), {
      gamePhase: 'INVESTIGATION',
      evidenceList: evidenceList,
      logs: arrayUnion({ text: ">>> BREAKING: HOMICIDE REPORTED", type: "system", time: "NOW" })
    });
  };

  const handleVoteStart = async () => {
    await updateDoc(doc(db, 'rooms', roomId), { gamePhase: 'VOTING' });
  };

  const handleVoteSubmit = async (targetId) => {
    // 투표 로직 (간소화: 마지막 투표자가 투표하면 엔딩)
    // 실제로는 서버 사이드나 투표 수 집계 로직 필요
    await updateDoc(doc(db, 'rooms', roomId), { gamePhase: 'ENDING', winner: 'Detective' }); // 예시
  };
  
  const handleRestart = async () => {
     await updateDoc(doc(db, 'rooms', roomId), { gamePhase: 'LOBBY', players: {}, logs: [] });
     setHasSeenRole(false);
  };

  // --- Render Router ---
  if (!user || !gameData) return <div className="bg-black h-screen text-red-600 font-mono p-10">CONNECTING...</div>;

  const myRole = gameData.roles?.[user.uid]?.role;
  const isKiller = myRole === 'Killer';

  switch (gameData.gamePhase) {
    case 'LOBBY':
      return <LobbyView roomId={roomId} players={gameData.players} currentPlayer={user} isHost={gameData.players[user.uid]?.isHost} />;
    
    case 'ROLE_REVEAL':
      if (!hasSeenRole) return <RoleRevealOverlay role={myRole} onConfirm={() => setHasSeenRole(true)} />;
      return isKiller ? <WeaponSelector onSelectWeapon={handleWeaponCommit} /> : <DetectiveWaiting />;
      
    case 'INVESTIGATION':
      return <GameBoard roomId={roomId} gameData={gameData} currentPlayer={{...user, role: myRole}} onCallMeeting={handleVoteStart} />;
      
    case 'VOTING':
      return <VotingOverlay players={gameData.players} currentPlayerId={user.uid} onVote={handleVoteSubmit} />;
      
    case 'ENDING':
      return <EndGameScreen winner={gameData.winner} roles={gameData.roles} truthLogs={gameData.logs} onRestart={handleRestart} />;
      
    default:
      return <div>ERROR: UNKNOWN PHASE</div>;
  }
}