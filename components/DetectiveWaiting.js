import React, { useState, useEffect, useRef } from 'react';
import { Wifi, Radio, RefreshCw, Lock, AlertTriangle, Activity } from 'lucide-react';

// 일반 로그 메시지 (기술적인 척하는 헛소리들)
const LOG_MESSAGES = [
  "Handshake established.",
  "Decryption key: [ ********** ]",
  "Scanning ambient frequencies...",
  "Biometric data mismatch.",
  "Analyzing background noise...",
  "Ping: 24ms... 102ms... 999ms...",
  "Accessing public records...",
  "Triangulating device position...",
  "Filtering static interference...",
  "Downloading forensic packets...",
  "Syncing with local towers...",
  "Verifying user integrity...",
];

// 에러 메시지 (불안감 조성용)
const ERROR_MESSAGES = [
  "PACKET LOSS DETECTED",
  "REMOTE ACCESS DENIED",
  "DATA STREAM INTERRUPTED",
  "UNKNOWN ENCRYPTION FOUND",
  "WARNING: SIGNAL JAMMING DETECTED",
  "CORRUPTED FILE SEGMENT",
];

const DetectiveWaiting = () => {
  const [logs, setLogs] = useState([{ id: 0, text: "Initializing forensic tools...", type: 'info', time: "00:00:00" }]);
  const [progress, setProgress] = useState(0);
  const [isBoosting, setIsBoosting] = useState(false); // 버튼 누름 효과 상태
  const logContainerRef = useRef(null);

  // 1. 자동 로그 생성기 & 진행률 조작 (The Rollercoaster)
  useEffect(() => {
    const interval = setInterval(() => {
      // 20% 확률로 에러 발생 (빨간 로그 + 진행률 하락)
      const isError = Math.random() < 0.2; 
      
      const baseMsg = isError 
        ? ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)]
        : LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      
      const newLog = {
        id: Date.now(),
        text: baseMsg,
        type: isError ? 'error' : 'info',
        time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' })
      };

      // 로그 추가 (최대 15개까지만 유지)
      setLogs(prev => [...prev.slice(-14), newLog]);
      
      // 진행률 로직: 99%에서 절대 100%로 안 넘어감 (살인자가 완료해야 넘어감)
      setProgress(prev => {
        if (isError) {
            // 에러 시 뚝 떨어짐 (좌절감)
            return Math.max(10, prev - Math.random() * 20); 
        } else {
            // 평소엔 조금씩 오름
            const increase = Math.random() * 8;
            return Math.min(99, prev + increase); 
        }
      });

    }, 1200 + Math.random() * 1000); // 1.2초 ~ 2.2초 간격 (읽을 수 있는 속도)

    return () => clearInterval(interval);
  }, []);

  // 2. 로그 자동 스크롤
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // 3. 신호 증폭 버튼 핸들러 (The Placebo Button)
  const handleBoost = () => {
    setIsBoosting(true);
    
    // 짧은 햅틱 피드백
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
    
    // "노력 중"이라는 흔적 남기기 (가짜 성취감)
    setLogs(prev => [...prev.slice(-14), {
        id: Date.now(),
        text: ">> BOOSTING SIGNAL STRENGTH...",
        type: 'action',
        time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' })
    }]);

    // 진행률 살짝 올려줌 (보상 심리)
    setProgress(prev => Math.min(99, prev + 3));

    // 버튼 애니메이션 복귀
    setTimeout(() => setIsBoosting(false), 150);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-blue-400 font-mono overflow-hidden relative select-none">
      
      {/* 배경 패턴 (카본 파이버 느낌) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}>
      </div>

      {/* --- 상단 헤더 --- */}
      <div className="p-3 border-b border-blue-900/50 flex justify-between items-center bg-slate-900/90 backdrop-blur z-10 shadow-lg">
        <div className="flex items-center gap-2">
            <Radio className="animate-pulse text-blue-500" size={16} />
            <span className="text-xs font-bold tracking-widest text-blue-200">FORENSIC_LINK_v4.2</span>
        </div>
        <div className="text-[10px] text-blue-500/70 flex items-center gap-1 border border-blue-900/50 px-2 py-0.5 rounded">
            <Lock size={10} /> ENCRYPTED
        </div>
      </div>

      {/* --- 메인 컨텐츠 --- */}
      <div className="flex-1 p-6 flex flex-col justify-between overflow-hidden relative">
        
        {/* 1. 중앙 진행률 원형 UI (불안정하게 흔들림) */}
        <div className="flex-1 flex flex-col items-center justify-center mb-4">
             <div className="relative w-40 h-40 flex items-center justify-center">
                {/* 바깥쪽 도는 링 */}
                <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                
                {/* 안쪽 펄스 */}
                <div className={`absolute inset-4 rounded-full bg-blue-500/10 animate-pulse transition-all duration-300 ${progress < 30 ? 'bg-red-500/10' : ''}`}></div>

                {/* 숫자 */}
                <div className="flex flex-col items-center z-10">
                    <span className={`text-4xl font-black tabular-nums transition-colors duration-300 
                        ${progress < 30 ? 'text-red-400' : 'text-blue-300'}`}>
                        {Math.floor(progress)}%
                    </span>
                    <span className="text-[9px] text-blue-500/70 tracking-widest mt-1">DECRYPTING</span>
                </div>
             </div>
             
             {/* 상태 텍스트 */}
             <p className="text-xs text-blue-400/50 animate-pulse mt-6 text-center max-w-[200px]">
                Waiting for crime scene data synchronization...
             </p>
        </div>

        {/* 2. 터미널 로그 창 */}
        <div 
            ref={logContainerRef}
            className="h-40 overflow-y-auto font-mono text-[10px] space-y-1 p-3 border-l-2 border-blue-900/50 bg-black/40 rounded-r-lg mask-image-gradient shadow-inner"
        >
            {logs.map((log) => (
                <div key={log.id} className={`flex gap-2 animate-fade-in-left ${
                    log.type === 'error' ? 'text-red-400 font-bold' : 
                    log.type === 'action' ? 'text-green-400' : 'text-blue-300/80'
                }`}>
                    <span className="opacity-40 min-w-[50px]">[{log.time}]</span>
                    <span>{log.text}</span>
                </div>
            ))}
            {/* 스크롤 하단 여백 */}
            <div className="h-2"></div> 
        </div>
      </div>

      {/* --- 하단 버튼 (The Placebo) --- */}
      <div className="p-4 bg-slate-900 border-t border-blue-900/30 z-20">
        <button
            onClick={handleBoost}
            className={`
                w-full py-4 rounded bg-slate-800 border border-slate-700 text-blue-300 font-bold tracking-[0.2em] text-sm
                transition-all duration-75 flex items-center justify-center gap-2 overflow-hidden relative group
                ${isBoosting ? 'scale-95 border-blue-500 text-white bg-blue-900/30 shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'hover:bg-slate-700'}
            `}
        >
            {/* 아이콘 회전 효과 */}
            <div className={`${isBoosting ? 'animate-spin' : ''}`}>
                {isBoosting ? <RefreshCw size={18}/> : <Activity size={18} />}
            </div>
            
            <span>{isBoosting ? "BOOSTING..." : "BOOST SIGNAL"}</span>

            {/* 버튼 내부 광택 효과 */}
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"></div>
        </button>
        
        <p className="text-[9px] text-center text-slate-600 mt-3 font-mono">
            * Tap repeatedly to stabilize connection packet loss
        </p>
      </div>
    </div>
  );
};

export default DetectiveWaiting;