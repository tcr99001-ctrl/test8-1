'use client';
import React, { useState, useEffect } from 'react';
import { db, auth } from '../utils/firebase';
import { onSnapshot, doc, updateDoc, setDoc, arrayUnion } from 'firebase/firestore';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';

import EntryScreen from '../components/EntryScreen'; // [추가됨] 대문 화면
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
  
  // [변경점 1] roomId를 처음엔 비워둡니다.
  const [roomId, setRoomId] = useState(null); 
  
  const [gameData, setGameData] = useState(null);
  const [hasSeenRole, setHasSeenRole] = useState(false);

  // 1. Auth (로그인은 미리 해둠)
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      if (u) setUser(u);
      else signInAnonymously(auth);
    });
    return () => unsubAuth();
  }, []);

  // 2. Room Sync (roomId가 설정된 후에만 실행됨)
  useEffect(() => {
    if (!user || !roomId) return; // [핵심] 방 코드가 없으면 DB 연결 안 함

    const roomRef = doc(db, 'rooms', roomId);
    const unsubRoom = onSnapshot(roomRef, (docSnap) => {
      if (docSnap.exists()) setGameData(docSnap.data());
      else {
        // 방이 없으면 새로 생성 (이 사람이 방장이 됨)
        setDoc(roomRef, { players: {}, gamePhase: 'LOBBY', logs: [] });
      }
    });
    return () => unsubRoom();
  }, [user, roomId]);

  // 3. Player Join (게임 데이터가 로드되면 참가 처리)
  useEffect(() => {
    if (user && gameData && roomId && !gameData.players?.[user.uid]) {
      updateDoc(doc(db, 'rooms', roomId), {
        [`players.${user.uid}`]: {
          displayName: `Player ${user.uid.slice(0,4)}`,
          // [핵심] 방에 플레이어가 0명일 때 들어오면 Host가 됨
          isHost: !gameData.players || Object.keys(gameData.players).length === 0,
          uid: user.uid,
          isAlive: true
        }
      });
    }
  }, [user, gameData, roomId]);


  // --- Handlers ---

  // [추가됨] 방 입장 핸들러
  const handleJoinRoom = (code) => {
    setRoomId(code); // 여기서 roomId가 세팅되면 위의 useEffect들이 작동 시작
  };

  const handleWeaponCommit = async (weapon) => {
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
    await updateDoc(doc(db, 'rooms', roomId), { gamePhase: 'ENDING', winner: 'Detective' }); 
  };
  
  const handleRestart = async () => {
     await updateDoc(doc(db, 'rooms', roomId), { gamePhase: 'LOBBY', players: {}, logs: [] });
     setHasSeenRole(false);
  };


  // --- Render Router ---

  // 1. 방 코드가 없으면 [입장 화면] 보여주기
  if (!roomId) {
    return <EntryScreen onJoin={handleJoinRoom} />;
  }

  // 2. 연결 중 화면
  if (!user || !gameData) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center font-mono text-red-600 animate-pulse">
        <div className="text-2xl font-black">CONNECTING...</div>
        <div className="text-xs mt-2 text-gray-500">TARGET: {roomId}</div>
      </div>
    );
  }

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
