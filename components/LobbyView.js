import React from 'react';
import { db } from '../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const LobbyView = ({ roomId, players, currentPlayer, isHost }) => {
  const startGame = async () => {
    if(!isHost) return;
    const pIds = Object.keys(players);
    // 역할 셔플
    const shuffled = [...pIds].sort(() => 0.5 - Math.random());
    const roles = {};
    pIds.forEach(id => {
      roles[id] = { role: id === shuffled[0] ? 'Killer' : 'Detective', displayName: players[id].displayName };
    });
    
    await updateDoc(doc(db, 'rooms', roomId), {
      gamePhase: 'ROLE_REVEAL',
      roles: roles
    });
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-8 animate-pulse">MURDER TOOL</h1>
      <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-md">
        {Object.values(players).map(p => (
          <div key={p.uid} className="p-4 border border-gray-700 rounded text-center">
            {p.displayName} {p.uid === currentPlayer.uid && "(YOU)"}
          </div>
        ))}
      </div>
      {isHost ? (
        <button onClick={startGame} className="w-full py-4 bg-red-700 font-bold rounded hover:bg-red-600">
          INVESTIGATE START
        </button>
      ) : (
        <p className="text-gray-500 animate-pulse">Waiting for host...</p>
      )}
    </div>
  );
};
export default LobbyView;