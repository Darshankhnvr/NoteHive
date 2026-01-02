
import React from 'react';
import { UserRole } from '../types';

interface HeaderProps {
  role: UserRole;
  onToggleRole: () => void;
}

export const Header: React.FC<HeaderProps> = ({ role, onToggleRole }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">EduStream</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex bg-slate-100 p-1 rounded-full border border-slate-200">
            <button 
              onClick={() => role !== 'STUDENT' && onToggleRole()}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${role === 'STUDENT' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Student View
            </button>
            <button 
              onClick={() => role !== 'FACULTY' && onToggleRole()}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${role === 'FACULTY' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Faculty Portal
            </button>
          </div>
          
          <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
            <img src="https://picsum.photos/seed/user/32/32" className="w-8 h-8 rounded-full border border-slate-300" alt="Profile" />
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-slate-900 leading-tight">Alex Carter</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
