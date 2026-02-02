import React, { useState, useEffect } from 'react';
import { Skull, Zap, Syringe, Hammer, CheckCircle, Lock, Eye } from 'lucide-react';

// 무기 데이터 (gameLogic.js와 ID가 일치해야 함)
const WEAPONS = [
  { id: 'w_neuro', name: 'Neurotoxin', icon: Syringe, desc: '신경 마비. 외상 없음.', type: 'Chemical' },
  { id: 'w_knife', name: 'Ceramic Blade', icon: Skull, desc: '탐지기 회피. 정밀 절단.', type: 'Physical' },
  { id: 'w_hack', name: 'System Overload', icon: Zap, desc: '원격 과부하. 디지털 타격.', type: 'Digital' },
  { id: 'w_hammer', name: 'Impact Hammer', icon: Hammer, desc: '단순 물리 타격. 확실함.', type: 'Physical' },
];

const WeaponSelector = ({ onSelectWeapon }) => {
  const [bootSequence, setBootSequence] = useState(true); // 터미널 부팅 화면 여부
  const [traceRate, setTraceRate] = useState(0.00);       // 추적률 (0.00 ~ 99.99%)
  const [selectedId, setSelectedId] = useState(null);     // 선택된 무기 ID
  const [isConfirming, setIsConfirming] = useState(false); // 확정 중 여부

  // 1. 진입 연출: 혼란스러운 글리치 후 -> 차가운 "Safe Mode" 부팅 (1.5초)
  useEffect(() => {
    const timer = setTimeout(() => setBootSequence(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // 2. 시간 압박 로직: Trace Rate 증가
  useEffect(() => {
    if (bootSequence) return;
    
    // 0.1초마다 불규칙하게 추적률 증가
    const interval = setInterval(() => {
      setTraceRate(prev => {
        if (prev >= 99.9) return 99.9;
        const jump = Math.random() * 0.15; // 0.0 ~ 0.15% 씩 증가
        return prev + jump;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [bootSequence]);

  // 추적률에 따른 글리치 강도 계산 (20% 넘어가면 화면이 붉어지기 시작)
  const glitchOpacity = Math.max(0, (traceRate - 20) / 100); 

  // 무기 선택 핸들러
  const handleSelect = (id) => {
    if (isConfirming) return;
    // 햅틱: 툭 (가벼운 선택감)
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
    setSelectedId(id);
  };

  // 최종 확정 핸들러
  const handleCommit = () => {
    setIsConfirming(true);
    // 햅틱: 징--- (무거운 결정)
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(500);
    
    // 1초 후 데이터 전송 (부모 컴포넌트로 전달)
    setTimeout(() => {
        const weaponData = WEAPONS.find(w => w.id === selectedId);
        onSelectWeapon(weaponData);
    }, 1000);
  };

  // --- 렌더링 1: 부팅 시퀀스 (Terminal Boot) ---
  if (bootSequence) {
    return (
      <div className="flex flex-col items-start justify-end h-screen bg-black p-8 font-mono text-green-500 text-xs leading-tight cursor-none">
        <p className="opacity-50">System rebooting...</p>
        <p>Loading chaotic_kernel.sys... <span className="text-white">OK</span></p>
        <p>Bypassing security protocols... <span className="text-white">OK</span></p>
        <p>Establishing encrypted tunnel...</p>
        <p className="mt-4 text-red-500 font-bold">ACCESS GRANTED.</p>
        <p className="animate-pulse mt-2">_</p>
      </div>
    );
  }

  // --- 렌더링 2: 메인 스토어 (Dark Web Interface) ---
  return (
    <div className="min-h-screen bg-neutral-900 text-gray-300 font-mono flex flex-col relative overflow-hidden select-none">
      
      {/* 배경 글리치 오버레이 (시간이 지날수록 붉어짐) */}
      <div 
        className="absolute inset-0 pointer-events-none bg-red-600 mix-blend-overlay z-0 transition-opacity duration-500"
        style={{ opacity: glitchOpacity * 0.4 }} 
      ></div>
      
      {/* 배경 스캔라인 패턴 */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-[1] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

      {/* --- 헤더: 관리자 모드 & 추적률 --- */}
      <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-black/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-center gap-2 text-red-500">
            <Lock size={12} />
            <span className="text-xs tracking-widest font-bold animate-pulse">ADMIN_ACCESS</span>
        </div>
        
        {/* 시간 압박 요소: Trace Rate */}
        <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-[9px] text-gray-500">
                <Eye size={10}/> TRACE PROBABILITY
            </div>
            <span className={`text-xl font-black tracking-tighter tabular-nums 
                ${traceRate > 50 ? 'text-red-500 animate-pulse' : 'text-emerald-500'}`}>
                {traceRate.toFixed(2)}%
            </span>
        </div>
      </div>

      {/* --- 타이틀 --- */}
      <div className="p-6 z-10">
        <h2 className="text-2xl font-black text-white mb-1 tracking-tight">EXECUTION PROTOCOL</h2>
        <p className="text-xs text-gray-500">Choose your methodology. No records will remain.</p>
      </div>

      {/* --- 무기 리스트 (그리드) --- */}
      <div className="grid grid-cols-2 gap-4 px-4 pb-32 z-10">
        {WEAPONS.map((weapon) => {
          const isSelected = selectedId === weapon.id;
          const Icon = weapon.icon;
          return (
            <div
              key={weapon.id}
              onClick={() => handleSelect(weapon.id)}
              className={`
                relative p-4 rounded-xl border transition-all duration-200 active:scale-95 cursor-pointer flex flex-col justify-between min-h-[140px]
                ${isSelected 
                  ? 'bg-red-900/20 border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)]' 
                  : 'bg-neutral-800/80 border-neutral-700 hover:border-gray-500 opacity-80'}
              `}
            >
              <div>
                <div className={`mb-3 ${isSelected ? 'text-red-400' : 'text-gray-600'}`}>
                    <Icon size={32} />
                </div>
                <h3 className={`font-bold text-sm mb-1 ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                    {weapon.name}
                </h3>
                <p className="text-[10px] text-gray-500 leading-tight">
                    {weapon.desc}
                </p>
              </div>
              
              {/* 선택 시 체크 표시 */}
              {isSelected && (
                  <div className="absolute top-3 right-3 text-red-500 animate-scale-in">
                      <CheckCircle size={18}/>
                  </div>
              )}
            </div>
          );
        })}
      </div>

      {/* --- 하단 경고 배너 (추적률 높을 때) --- */}
      {traceRate > 40 && (
          <div className="fixed bottom-24 left-0 w-full flex justify-center pointer-events-none z-20">
              <span className="text-[10px] font-bold text-red-500 bg-black/80 border border-red-900 px-3 py-1 rounded-full animate-bounce">
                  ⚠ WARNING: EXTERNAL SIGNAL DETECTED
              </span>
          </div>
      )}

      {/* --- 하단 고정 버튼 (구매 확정) --- */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent z-30">
        <button
          onClick={handleCommit}
          disabled={!selectedId || isConfirming}
          className={`
            w-full py-4 rounded-none font-black tracking-[0.2em] text-sm transition-all duration-300 relative overflow-hidden group
            ${!selectedId 
                ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed border border-neutral-700' 
                : isConfirming
                    ? 'bg-red-600 text-white scale-95 border border-red-500'
                    : 'bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]'}
          `}
        >
          {isConfirming ? (
              <span className="animate-pulse">UPLOADING CRIME DATA...</span>
          ) : (
              <span className="flex items-center justify-center gap-2">
                  CONFIRM SELECTION
              </span>
          )}
          
          {/* 버튼 호버 효과 */}
          {!isConfirming && selectedId && (
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-200"></div>
          )}
        </button>
      </div>

    </div>
  );
};

export default WeaponSelector;