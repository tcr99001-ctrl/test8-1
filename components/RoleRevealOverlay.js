import React, { useState, useEffect } from 'react';
import { Shield, Skull, Fingerprint, Search, WifiOff, AlertTriangle } from 'lucide-react';

const RoleRevealOverlay = ({ role, onConfirm }) => {
  // 단계: BLACKOUT (암전) -> FALSE_HOPE (가짜 시민) -> REVEAL (진짜 역할)
  const [stage, setStage] = useState('BLACKOUT'); 
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  
  const isKiller = role === 'Killer';

  // 1. 오프닝 시퀀스 (타이밍 제어)
  useEffect(() => {
    // 0~2초: 완전 암전 및 로딩 (긴장감 조성)
    const timer1 = setTimeout(() => {
        if (isKiller) {
            setStage('FALSE_HOPE'); // 살인자는 낚시 단계로 진입
        } else {
            setStage('REVEAL'); // 탐정은 바로 공개
        }
    }, 2000);

    return () => clearTimeout(timer1);
  }, [isKiller]);

  // 2. 살인자 전용: 희망 고문 (False Hope) 연출
  useEffect(() => {
    if (stage === 'FALSE_HOPE') {
        // 0.3초 동안만 "시민"인 척 보여줌
        const timer2 = setTimeout(() => {
            setStage('REVEAL');
            // 쿵-쿵! 하는 강한 진동 (모바일 햅틱)
            if (typeof navigator !== 'undefined' && navigator.vibrate) {
                navigator.vibrate([50, 50, 50, 50, 500]); 
            }
        }, 300); // 0.3초 찰나의 순간
        return () => clearTimeout(timer2);
    }
  }, [stage]);

  // 3. 버튼 클릭 핸들러 (피의 계약 / 수사 개시)
  const handleConfirm = () => {
    setIsButtonPressed(true);
    
    // 버튼 누르는 순간의 임팩트
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(200);
    }
    
    // 0.8초 후 실제 페이즈 전환 (버튼 깨지는/번지는 연출 보여줄 시간 확보)
    setTimeout(onConfirm, 800);
  };


  // --- 렌더링: 1단계 (Blackout) ---
  if (stage === 'BLACKOUT') {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center cursor-none">
        {/* 중앙 로딩 바 */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-gray-500 animate-[width_2s_ease-out]" style={{ width: '100%' }}></div>
        </div>
        <div className="text-gray-500 text-xs font-mono animate-pulse tracking-widest">
          ESTABLISHING SECURE CONNECTION...
        </div>
      </div>
    );
  }

  // --- 렌더링: 2단계 (False Hope - 살인자 낚시용) ---
  if (stage === 'FALSE_HOPE') {
      return (
        <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col items-center justify-center">
             <div className="p-6 rounded-full bg-blue-900/20 border-4 border-blue-500/50 mb-6">
                <Shield size={80} className="text-blue-400" />
             </div>
             <h2 className="text-3xl font-bold text-blue-400 tracking-widest">CITIZEN</h2>
             <p className="text-blue-300/50 mt-2 font-mono">You are innocent.</p>
        </div>
      );
  }

  // --- 렌더링: 3단계 (REVEAL - 최종 공개) ---
  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-300 overflow-hidden font-mono
        ${isKiller ? 'bg-red-950' : 'bg-slate-900'}
        ${isButtonPressed && isKiller ? 'animate-ping opacity-0' : ''} 
    `}>
      
      {/* 배경 노이즈/패턴 */}
      <div className={`absolute inset-0 opacity-20 pointer-events-none 
        ${isKiller ? 'animate-[pulse_0.1s_infinite]' : 'animate-[pulse_3s_infinite]'}`}
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}
      ></div>

      <div className="z-10 flex flex-col items-center max-w-sm w-full p-6 text-center">
        
        {/* --- 아이콘 영역 --- */}
        <div className={`mb-8 p-6 rounded-full border-4 relative overflow-hidden transition-all duration-500
            ${isKiller ? 'border-red-600 bg-black shadow-[0_0_50px_rgba(255,0,0,0.5)]' : 'border-blue-400/50 bg-blue-900/20'}
            ${isButtonPressed ? 'scale-150 opacity-0' : 'scale-100'}
        `}>
          {isKiller ? (
            <>
                {/* 메인 해골 */}
                <Skull size={80} className="text-red-600 relative z-10" />
                {/* 글리치 효과 (잔상) */}
                <Skull size={80} className="text-red-400 absolute top-0 left-1 opacity-50 animate-pulse mix-blend-screen"/>
                <Skull size={80} className="text-white absolute top-0 -left-1 opacity-30 animate-ping mix-blend-overlay"/>
            </>
          ) : (
            <Shield size={80} className="text-blue-400 opacity-90" />
          )}
        </div>

        {/* --- 텍스트 연출 --- */}
        {isKiller ? (
          <div className="animate-[bounce_0.1s_infinite]">
            <h2 className="text-5xl font-black text-red-600 tracking-tighter mb-4 scale-y-125" 
                style={{ textShadow: '4px 4px 0px #000' }}>
              KILLER
            </h2>
            <div className="text-red-500 font-bold bg-black/50 p-3 border border-red-800 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500 animate-[ping_1s_infinite]"></div>
              <p className="text-xs border-b border-red-800 pb-1 mb-1 text-red-400">[ SYSTEM ERROR 0x99 ]</p>
              <p className="text-lg tracking-wider">MURDER PROTOCOL<br/>ONLINE</p>
            </div>
          </div>
        ) : (
          <div className="relative">
             {/* 탐정 배경 노이즈 박스 */}
             <div className="absolute -inset-4 border border-blue-500/30 rounded animate-pulse opacity-50"></div>
            <h2 className="text-3xl font-bold text-blue-300 tracking-[0.2em] mb-4 drop-shadow-[0_0_10px_rgba(100,200,255,0.8)]">
              DETECTIVE
            </h2>
            <div className="text-blue-400/70 text-xs space-y-2">
              <div className="flex items-center justify-center gap-2 text-blue-300">
                 <WifiOff size={14} className="animate-pulse"/> <p>Signal Unstable...</p>
              </div>
              <p className="opacity-70">Unknown interference detected.</p>
              <p className="text-blue-200 font-bold mt-2 pt-2 border-t border-blue-500/30 tracking-widest">
                TRUST NO ONE
              </p>
            </div>
          </div>
        )}

        {/* --- 액션 버튼 (Blood Pact) --- */}
        <div className="mt-12 w-full">
            <button
            onClick={handleConfirm}
            disabled={isButtonPressed}
            className={`
                w-full py-5 font-black text-lg tracking-widest transition-all duration-100 relative group overflow-hidden border-2
                ${isKiller 
                ? 'bg-red-700 hover:bg-red-600 text-black border-red-500 hover:scale-105 shadow-[0_0_20px_rgba(255,0,0,0.6)]' 
                : 'bg-transparent hover:bg-blue-900/30 text-blue-300 border-blue-500/50 hover:border-blue-400'}
                ${isButtonPressed ? 'scale-95 brightness-50 grayscale cursor-not-allowed' : ''}
            `}
            >
            {isKiller ? (
                <>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        <Fingerprint size={24} /> 
                        {isButtonPressed ? "ERASING..." : "ERASE EVIDENCE"}
                    </span>
                    {/* 살인자 버튼: 디지털 혈흔 효과 (붉은색이 차오름) */}
                    <div className={`absolute inset-0 bg-red-950 transition-transform duration-500 ease-out origin-left
                        ${isButtonPressed ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 opacity-20'}`}>
                    </div>
                </>
            ) : (
                <span className="flex items-center justify-center gap-2">
                    <Search size={20} /> 
                    {isButtonPressed ? "ACCESSING..." : "ACCESS CASE FILE"}
                </span>
            )}
            </button>
            
            {/* 하단 경고 문구 */}
            {isKiller && (
                <p className="text-[10px] text-red-800 mt-2 font-mono animate-pulse">
                    WARNING: NO TURNING BACK
                </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default RoleRevealOverlay;