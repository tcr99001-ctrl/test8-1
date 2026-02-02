import React, { useState, useEffect } from 'react';
import { Lock, UserX, Gavel, AlertCircle } from 'lucide-react';

const VotingOverlay = ({ players, onVote, currentPlayerId }) => {
  const [selectedSuspect, setSelectedSuspect] = useState(null); // 내가 찍은 사람
  const [timeLeft, setTimeLeft] = useState(15); // 제한 시간 15초

  // 1. 카운트다운 타이머 (압박감 조성)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 10초 이하일 때 째깍거리는 햅틱/소리 연출 (선택 사항)
  useEffect(() => {
    if (timeLeft <= 5 && timeLeft > 0) {
        if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
    }
  }, [timeLeft]);

  // 2. 투표 핸들러 (한 번 찍으면 변경 불가)
  const handleVote = (targetId) => {
    if (timeLeft === 0) return;
    
    setSelectedSuspect(targetId);
    
    // 묵직한 햅틱 피드백 (판사봉 내리치는 느낌)
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(100);
    
    // 상위 컴포넌트로 전송
    onVote(targetId); 
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-6 animate-fade-in font-mono text-white select-none">
      
      {/* --- 헤더: 침묵의 압박 --- */}
      <div className="text-center mb-10 relative">
        {/* 배경에 붉은색 펄스 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-red-600/20 blur-xl animate-pulse rounded-full"></div>
        
        <Lock className="w-10 h-10 mx-auto text-red-500 mb-3 animate-bounce" />
        
        <h2 className="text-3xl font-black tracking-[0.2em] text-white mb-2">
          JUDGMENT
        </h2>
        
        <div className="flex items-center justify-center gap-2 text-red-500 text-xs font-bold border border-red-900 bg-red-950/50 px-3 py-1 rounded-full">
            <AlertCircle size={12} />
            <span>COMMUNICATION TERMINATED</span>
        </div>

        {/* 타이머 */}
        <div className={`text-6xl font-black mt-6 tabular-nums transition-colors duration-300
            ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-gray-200'}`}>
          {timeLeft}
        </div>
      </div>

      {/* --- 용의자 목록 (그리드) --- */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8">
        {Object.entries(players).map(([uid, player]) => {
          // 자기 자신은 투표 대상에서 제외 (선택 사항)
          if (uid === currentPlayerId) return null; 
          
          // 이미 사망한 플레이어 제외 로직이 필요하다면 여기서 필터링
          // if (!player.isAlive) return null;

          const isSelected = selectedSuspect === uid;
          const isTimeOver = timeLeft === 0;

          return (
            <button
              key={uid}
              onClick={() => !selectedSuspect && !isTimeOver && handleVote(uid)}
              disabled={isTimeOver || selectedSuspect}
              className={`
                relative p-5 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center min-h-[120px] group
                ${isSelected 
                  ? 'bg-red-900/40 border-red-500 scale-105 z-10 shadow-[0_0_30px_rgba(220,38,38,0.5)]' 
                  : 'bg-gray-800/50 border-gray-700 hover:border-gray-500 hover:bg-gray-700 opacity-80'}
                ${(isTimeOver || selectedSuspect) && !isSelected ? 'opacity-20 grayscale cursor-not-allowed' : ''}
              `}
            >
              {/* 프로필 아이콘 (없으면 기본 아이콘) */}
              <div className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center transition-colors
                  ${isSelected ? 'bg-red-500 text-black' : 'bg-gray-700 text-gray-400'}`}>
                 <UserX size={24} />
              </div>

              <span className={`text-sm font-bold truncate w-full text-center ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                {player.displayName}
              </span>
              
              {/* 선택 시 "GUILTY" 도장 찍히는 연출 */}
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="border-4 border-red-500 text-red-500 font-black text-2xl px-4 py-2 rounded -rotate-12 opacity-0 animate-[stamp_0.3s_ease-out_forwards] bg-black/50 backdrop-blur-sm">
                        GUILTY
                    </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* --- 하단 상태 메시지 --- */}
      <div className="mt-auto text-center">
        {selectedSuspect ? (
            <div className="animate-pulse text-red-400 font-bold text-sm">
                VOTE REGISTERED. WAITING FOR VERDICT...
            </div>
        ) : timeLeft === 0 ? (
            <div className="text-gray-500 font-bold">
                TIME EXPIRED. ABSTENTION RECORDED.
            </div>
        ) : (
            <div className="text-gray-500 text-xs font-mono">
                TRUST YOUR INSTINCT. <br/>
                <span className="text-red-500">NO TURNING BACK.</span>
            </div>
        )}
      </div>

      {/* 배경 장식 (철창 느낌) */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-10 bg-[linear-gradient(90deg,transparent_95%,#ffffff_95%)] bg-[length:20px_20px]"></div>
    </div>
  );
};

export default VotingOverlay;