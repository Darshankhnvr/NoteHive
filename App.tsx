
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { NoteCard } from './components/NoteCard';
import { UploadModal } from './components/UploadModal';
import { StudyAssistant } from './components/StudyAssistant';
import { Note, UserRole, Subject } from './types';
import { INITIAL_NOTES } from './constants';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activeAnalysisNote, setActiveAnalysisNote] = useState<Note | null>(null);

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            note.facultyName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject = selectedSubject === 'All' || note.subject === selectedSubject;
      return matchesSearch && matchesSubject;
    });
  }, [notes, searchQuery, selectedSubject]);

  const handleUpload = (newNoteData: Omit<Note, 'id' | 'uploadDate'>) => {
    const newNote: Note = {
      ...newNoteData,
      id: Math.random().toString(36).substr(2, 9),
      uploadDate: new Date().toISOString().split('T')[0]
    };
    setNotes(prev => [newNote, ...prev]);
  };

  return (
    <div className="min-h-screen pb-20">
      <Header role={role} onToggleRole={() => setRole(prev => prev === 'STUDENT' ? 'FACULTY' : 'STUDENT')} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Hero / Action Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Unlock Academic <span className="text-indigo-600">Excellence</span>
            </h1>
            <p className="text-lg text-slate-600">
              Access premium lecture notes shared by top faculty members. Use AI to summarize content and generate study questions instantly.
            </p>
          </div>
          
          {role === 'FACULTY' && (
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200 shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Upload Material
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <input 
              type="text" 
              placeholder="Search by title, faculty, or keywords..." 
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {['All', ...Object.values(Subject)].map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${selectedSubject === sub ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'}`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Notes Grid */}
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map(note => (
              <NoteCard 
                key={note.id} 
                note={note} 
                onViewDetails={(n) => setActiveAnalysisNote(n)} 
              />
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="bg-slate-100 p-6 rounded-full mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No matching notes found</h3>
            <p className="text-slate-500 max-w-sm">Try adjusting your filters or search criteria to find what you're looking for.</p>
          </div>
        )}
      </main>

      {/* Overlays */}
      {isUploadModalOpen && (
        <UploadModal 
          onClose={() => setIsUploadModalOpen(false)} 
          onUpload={handleUpload}
        />
      )}
      
      <StudyAssistant 
        note={activeAnalysisNote} 
        onClose={() => setActiveAnalysisNote(null)} 
      />

      {/* Mobile Nav Overlay (Student context focus) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md px-6 py-4 rounded-full border border-slate-700 shadow-2xl flex items-center gap-8 md:hidden">
         <button className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
         </button>
         <button className="text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
         </button>
         <button className="text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
         </button>
      </div>
    </div>
  );
};

export default App;
