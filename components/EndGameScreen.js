import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, FileText, User, UserX, AlertTriangle } from 'lucide-react';

const EndGameScreen = ({ winner, roles, truthLogs = [], onRestart }) => {
  const [step, setStep] = useState(0); // 현재 보여줄 로그의 인덱스
  const [showFinalMessage, setShowFinalMessage] = useState(false); // 마지막 문구 표시 여부
  const scrollRef = useRef(null);

  const isDetectiveWin = winner === 'Detective';

  // 1. 순차적 로그 재생 (Replay Trauma)
  useEffect(() => {
    // 로그가 하나씩 순서대로 뜸
    if (step < truthLogs.length) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1);
        
        // 햅틱: 로그 하나 뜰 때마다 심장 박동처럼 툭. (약한 진동)
        if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
        
        // 스크롤 자동 이동 (로그가 많을 경우)
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 1500); // 1.5초 간격으로 재생
      return () => clearTimeout(timer);
    } 
    // 모든 로그 재생 후 -> 마지막 문구 출력
    else if (!showFinalMessage) {
      const finalTimer = setTimeout(() => {
        setShowFinalMessage(true);
        // 묵직한 진동 (엔딩 임팩트)
        if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(500);
      }, 2000);
      return () => clearTimeout(finalTimer);
    }
  }, [step, truthLogs.length, showFinalMessage]);

  return (
    <div className="min-h-screen bg-black text-gray-300 font-mono flex flex-col items-center p-6 relative overflow-hidden select-none">
      
      {/* 배경 효과: 노이즈 & 펄스 (오래된 필름 느낌) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-pulse"></div>
      
      {/* 배경 그라데이션 (승리 팀 색상 은은하게) */}
      <div className={`absolute inset-0 opacity-20 bg-gradient-to-b from-transparent 
        ${isDetectiveWin ? 'to-blue-900' : 'to-red-900'} pointer-events-none`}></div>

      <div className="max-w-md w-full z-10 flex flex-col h-full">
        
        {/* --- 1. 결과 타이틀 --- */}
        <div className={`text-center py-8 transition-opacity duration-1000 ${step > 0 ? 'opacity-60 scale-90' : 'opacity-100 scale-100'}`}>
            <h1 className={`text-5xl font-black tracking-tighter mb-2 drop-shadow-lg
                ${isDetectiveWin ? 'text-blue-500' : 'text-red-600'}`}>
                {isDetectiveWin ? "CASE CLOSED" : "KILLER WON"}
            </h1>
            <p className="text-xs text-gray-500 uppercase tracking-[0.3em]">
                {isDetectiveWin ? "Justice Served" : "Investigation Failed"}
            </p>
        </div>

        {/* --- 2. 역할 공개 (빠르게 훑어보기) --- */}
        <div className="grid grid-cols-2 gap-2 mb-8 opacity-80">
            {Object.entries(roles).map(([uid, r]) => (
                <div key={uid} className={`flex items-center gap-2 px-3 py-2 rounded border
                    ${r.role === 'Killer' ? 'border-red-900 bg-red-900/10 text-red-400' : 'border-blue-900 bg-blue-900/10 text-blue-400'}`}>
                    {r.role === 'Killer' ? <UserX size={12}/> : <User size={12}/>}
                    <div className="flex flex-col">
                        <span className="text-xs font-bold">{r.displayName}</span>
                        <span className="text-[9px] uppercase">{r.role}</span>
                    </div>
                </div>
            ))}
        </div>

        {/* --- 3. 진실의 타임라인 (The Replay) --- */}
        <div className="flex-1 overflow-y-auto mb-4 pr-2 scrollbar-hide relative" ref={scrollRef}>
          {/* 타임라인 줄 */}
          <div className="absolute left-[7px] top-2 bottom-0 w-[2px] bg-gray-800"></div>

          <div className="space-y-6 pb-20">
            {truthLogs.map((log, index) => (
              <div 
                key={index} 
                className={`relative pl-6 transition-all duration-700 ease-out
                  ${index < step ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                `}
              >
                {/* 타임라인 점 */}
                <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-black z-10
                    ${log.type === 'lie' || log.type === 'crime' ? 'bg-red-600' : 'bg-blue-500'}
                `}></div>
                
                {/* 시간 및 태그 */}
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] opacity-40 font-mono">{log.time}</span>
                    {log.type === 'lie' && <span className="text-[8px] bg-red-900 text-red-200 px-1 rounded">LIE DETECTED</span>}
                    {log.type === 'truth' && <span className="text-[8px] bg-blue-900 text-blue-200 px-1 rounded">FACT</span>}
                </div>

                {/* 로그 내용 */}
                <div className={`text-sm font-bold leading-relaxed
                    ${log.type === 'lie' ? 'text-red-300' : log.type === 'crime' ? 'text-red-500' : 'text-blue-200'}
                `}>
                  {log.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 4. 마지막 문장 (The Final Sentence) --- */}
        <div className={`absolute bottom-24 left-0 right-0 text-center transition-all duration-2000 transform z-20 px-6
            ${showFinalMessage ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-4 blur-sm'}`}>
            
            <div className="bg-black/80 backdrop-blur-md p-6 rounded-xl border border-gray-800 shadow-2xl">
                <p className="text-white text-lg font-black tracking-widest mb-3 leading-relaxed">
                    " YOUR DOUBT WAS <br/>
                    <span className="text-red-500 inline-block transform hover:scale-105 transition-transform duration-300">
                        THEIR SHARPEST WEAPON.
                    </span> "
                </p>
                <div className="w-10 h-0.5 bg-gray-600 mx-auto my-3"></div>
                <p className="text-xs text-gray-500 font-serif italic">
                    당신의 의심이, 그들의 가장 날카로운 흉기였습니다.
                </p>
            </div>
        </div>

        {/* --- 5. 재시작 버튼 --- */}
        <div className={`fixed bottom-6 left-6 right-6 transition-all duration-1000 ${showFinalMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button 
                onClick={onRestart}
                className="group w-full py-4 bg-white text-black font-black tracking-[0.2em] rounded hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3"
            >
                <RefreshCw size={18} className="group-hover:-rotate-180 transition-transform duration-500"/>
                <span>RECONSTRUCT CASE</span>
            </button>
        </div>

      </div>
    </div>
  );
};

export default EndGameScreen;