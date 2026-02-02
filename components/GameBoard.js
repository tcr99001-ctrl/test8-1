import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Scan, Zap, Siren } from 'lucide-react';

const GameBoard = ({ roomId, gameData, currentPlayer, onCallMeeting }) => {
  const [intro, setIntro] = useState(true);
  const [battery, setBattery] = useState(100);
  const [scanResult, setScanResult] = useState(null);
  const [decrypted, setDecrypted] = useState({});

  useEffect(() => { setTimeout(() => setIntro(false), 3000); }, []);

  const handleScan = async (card) => {
    if (battery < 40) return;
    setBattery(prev => prev - 40);
    if(navigator.vibrate) navigator.vibrate(50);

    // Private Result
    const isPositive = currentPlayer.role === 'Detective' && (card.type === 'Physical'); // 예시 로직
    const msg = currentPlayer.role === 'Killer' ? "SCAN MOCKED" : (isPositive ? "[POSITIVE] MATCH FOUND" : "[NEGATIVE] NO MATCH");
    
    setScanResult({ msg, positive: isPositive });
    setTimeout(() => setScanResult(null), 4000);

    // Public Log (Action Only)
    await updateDoc(doc(db, 'rooms', roomId), {
      logs: arrayUnion({
        text: `${currentPlayer.displayName} scanned [${card.name}].`,
        type: 'action',
        time: new Date().toLocaleTimeString()
      })
    });
  };

  if (intro) return <div className="h-screen bg-black flex items-center justify-center text-red-600 font-black text-2xl animate-pulse">CRIME SCENE RENDER...</div>;

  return (
    <div className="h-screen bg-slate-900 text-white p-4 relative overflow-hidden">
      {/* 증거 리스트 */}
      <div className="grid grid-cols-2 gap-4 mt-12">
        {gameData.evidenceList?.map((card, idx) => (
          <div key={idx} onClick={() => !decrypted[card.uid] ? setDecrypted(p=>({...p, [card.uid]:true})) : handleScan(card)}
               className={`p-4 border rounded transition-all duration-500 ${decrypted[card.uid] ? 'bg-slate-800 border-blue-400' : 'bg-black blur-sm'}`}>
            <p className="font-bold text-sm">{card.name}</p>
            {decrypted[card.uid] && <p className="text-xs text-gray-400 mt-2">TAP TO SCAN</p>}
          </div>
        ))}
      </div>
      
      {/* 스캔 결과 (Private) */}
      {scanResult && (
        <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 border-2 bg-gray-900 z-50 ${scanResult.positive ? 'border-green-500 text-green-500' : 'border-gray-500 text-gray-500'}`}>
          {scanResult.msg}
        </div>
      )}

      {/* 하단 컨트롤 */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-black/80 flex justify-between items-center">
        <div className="text-xs text-green-400 border border-green-900 px-2 py-1">PWR: {battery}%</div>
        <button onClick={onCallMeeting} className="bg-red-700 text-white px-6 py-2 rounded font-bold flex items-center gap-2">
          <Siren size={16}/> EMERGENCY
        </button>
      </div>
    </div>
  );
};
export default GameBoard;