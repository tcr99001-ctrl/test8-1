import React, { useState } from 'react';
import { Terminal, ArrowRight } from 'lucide-react';

const EntryScreen = ({ onJoin }) => {
  const [inputCode, setInputCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    // 입력된 코드를 상위(page.js)로 전달 (대문자 자동 변환)
    onJoin(inputCode.trim().toUpperCase());
  };

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center p-6 font-mono text-white">
      {/* 타이틀 */}
      <div className="mb-12 text-center animate-fade-in-up">
        <h1 className="text-5xl font-black text-red-600 tracking-tighter mb-2 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
          MURDER TOOL
        </h1>
        <p className="text-xs text-gray-500 tracking-[0.5em] uppercase">
          Secure Connection Protocol
        </p>
      </div>

      {/* 입력 폼 */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4 animate-fade-in">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
            <Terminal size={18} />
          </div>
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="ENTER ROOM CODE"
            className="w-full bg-gray-900/50 border-2 border-gray-700 text-white pl-10 pr-4 py-4 rounded-lg focus:outline-none focus:border-red-600 focus:bg-black transition-all placeholder-gray-600 tracking-widest text-lg font-bold uppercase"
            autoFocus
          />
        </div>

        <button
          type="submit"
          disabled={!inputCode.trim()}
          className="w-full bg-white text-black font-black py-4 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed group"
        >
          <span>CONNECT</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      <p className="mt-8 text-[10px] text-gray-600 text-center max-w-xs leading-relaxed">
        WARNING: Accessing this network implies consent to surveillance. 
        <br/>All lies will be recorded.
      </p>
    </div>
  );
};

export default EntryScreen;
