
import React from 'react';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onViewDetails: (note: Note) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {note.subject}
          </span>
          <span className="text-[10px] font-medium text-slate-400 uppercase">
            {note.uploadDate}
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 line-clamp-2">
          {note.title}
        </h3>
        <p className="text-sm text-slate-600 line-clamp-3 mb-4">
          {note.description}
        </p>
        <div className="flex items-center gap-2 mb-4">
          <img src={`https://picsum.photos/seed/${note.facultyName}/32/32`} className="w-6 h-6 rounded-full border border-slate-200" alt={note.facultyName} />
          <span className="text-xs font-medium text-slate-700">{note.facultyName}</span>
        </div>
      </div>
      
      <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
          <span className="text-[10px] font-mono text-slate-500 uppercase">{note.fileType}</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onViewDetails(note)}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 px-3 py-1.5 rounded-md hover:bg-indigo-50 transition-colors"
          >
            AI Summary
          </button>
          <button 
            className="flex items-center gap-1.5 bg-indigo-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-indigo-700 transition-colors"
            onClick={() => alert(`Downloading ${note.fileName}...`)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};
