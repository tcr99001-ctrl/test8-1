import React, { useState } from 'react';
import { Terminal, Lock, LogIn, Hash } from 'lucide-react';

const EntryScreen = ({ onJoin }) => {
  const [inputCode, setInputCode] = useState("");
  const [isEntering, setIsEntering] = useState(false);

  const handleEnter = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    
    setIsEntering(true);
    // 햅틱 피드백
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
    
    // 0.5초 딜레이 후 입장 (연출용)
    setTimeout(() => {
        onJoin(inputCode.trim());
    }, 500);
  };

  const generateRandomRoom = () => {
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    setInputCode(randomCode);
  };

  return (
    <div className="h-screen bg-black text-gray-300 font-mono flex flex-col items-center justify-center p-6 select-none overflow-hidden relative">
      
      {/* 배경 장식 (매트릭스 느낌) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(0,50,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,50,0,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>

      <div className="z-10 w-full max-w-sm flex flex-col gap-8">
        
        {/* --- 타이틀 --- */}
        <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
                <div className="p-4 bg-red-900/10 rounded-full border border-red-900/50 animate-pulse">
                    <Terminal size={48} className="text-red-600" />
                </div>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter" style={{ textShadow: '0 0 10px rgba(220,38,38,0.5)' }}>
                MURDER TOOL
            </h1>
            <p className="text-xs text-red-500 font-bold tracking-[0.3em]">SECURE CONNECTION REQUIRED</p>
        </div>

        {/* --- 입력 폼 --- */}
        <form onSubmit={handleEnter} className="space-y-4">
            
            {/* 방 코드 입력창 */}
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                    <Hash size={18} />
                </div>
                <input 
                    type="text" 
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                    placeholder="ENTER ROOM CODE"
                    className="w-full bg-gray-900/50 border-2 border-gray-800 text-white pl-10 pr-4 py-4 rounded text-center tracking-[0.2em] font-bold focus:outline-none focus:border-red-600 focus:bg-black transition-all placeholder:text-gray-700"
                    maxLength={10}
                />
            </div>

            {/* 입장 버튼 */}
            <button 
                type="submit"
                disabled={!inputCode || isEntering}
                className={`
                    w-full py-4 font-black tracking-widest text-sm rounded transition-all duration-200 flex items-center justify-center gap-2 group relative overflow-hidden
                    ${!inputCode 
                        ? 'bg-gray-900 text-gray-600 cursor-not-allowed border border-gray-800' 
                        : 'bg-white text-black hover:bg-red-600 hover:text-white hover:border-red-600 border border-white'}
                `}
            >
                {isEntering ? (
                    <span className="animate-pulse">CONNECTING...</span>
                ) : (
                    <>
                        <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
                        <span>ENTER SYSTEM</span>
                    </>
                )}
            </button>
        </form>

        {/* --- 랜덤 코드 생성 버튼 (편의 기능) --- */}
        <div className="text-center">
            <button 
                onClick={generateRandomRoom}
                className="text-[10px] text-gray-600 hover:text-red-400 underline decoration-dotted underline-offset-4 transition-colors"
            >
                GENERATE RANDOM ACCESS CODE
            </button>
        </div>

        {/* 하단 장식 텍스트 */}
        <div className="absolute bottom-6 left-0 w-full text-center">
            <p className="text-[9px] text-gray-800 font-mono">
                ENCRYPTED BY VERILOG_SECURE_V2.0
            </p>
        </div>

      </div>
    </div>
  );
};

export default EntryScreen;
