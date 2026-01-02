
import React, { useState, useEffect } from 'react';
import { Note } from '../types';
import { generateNoteSummary } from '../services/geminiService';

interface StudyAssistantProps {
  note: Note | null;
  onClose: () => void;
}

export const StudyAssistant: React.FC<StudyAssistantProps> = ({ note, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [aiData, setAiData] = useState<{ summary: string; studyQuestions: string[] } | null>(null);

  useEffect(() => {
    if (note) {
      const fetchAI = async () => {
        setLoading(true);
        // Simulate a small delay for better UX
        const result = await generateNoteSummary(note.title, note.description);
        setAiData(result);
        setLoading(false);
      };
      fetchAI();
    } else {
      setAiData(null);
    }
  }, [note]);

  if (!note) return null;

  return (
    <div className={`fixed inset-y-0 right-0 w-full md:w-[450px] bg-white shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out ${note ? 'translate-x-0' : 'translate-x-full'} border-l border-slate-200 overflow-y-auto`}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900">EduStream AI Assistant</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="space-y-8">
          <section>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Currently Analyzing</h3>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-1">{note.title}</h4>
              <p className="text-xs text-slate-500">{note.subject} • {note.facultyName}</p>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              AI Summary
              {loading && <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />}
            </h3>
            {loading ? (
              <div className="space-y-3">
                <div className="h-4 bg-slate-100 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-slate-100 rounded animate-pulse w-5/6"></div>
                <div className="h-4 bg-slate-100 rounded animate-pulse w-4/6"></div>
              </div>
            ) : (
              <p className="text-slate-700 leading-relaxed italic text-sm">
                "{aiData?.summary}"
              </p>
            )}
          </section>

          <section>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Study Checkpoints</h3>
            <div className="space-y-3">
              {loading ? (
                [1, 2, 3].map(i => <div key={i} className="h-12 bg-slate-50 border border-slate-100 rounded-lg animate-pulse"></div>)
              ) : (
                aiData?.studyQuestions.map((q, idx) => (
                  <div key={idx} className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex gap-3 group hover:border-indigo-300 transition-colors">
                    <span className="text-indigo-600 font-bold">Q{idx + 1}</span>
                    <p className="text-sm text-slate-800 font-medium">{q}</p>
                  </div>
                ))
              )}
            </div>
          </section>
          
          <div className="pt-6 border-t border-slate-100">
            <button 
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg"
              onClick={() => alert('Generating full PDF study guide...')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export Study Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
