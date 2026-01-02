
import React, { useState } from 'react';
import { Note, Subject } from '../types';

interface UploadModalProps {
  onClose: () => void;
  onUpload: (newNote: Omit<Note, 'id' | 'uploadDate'>) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUpload }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: Subject.COMPUTER_SCIENCE,
    facultyName: 'Dr. Alex Carter', // Mocked user
    fileName: '',
    fileType: 'pdf'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    
    onUpload({
      ...formData,
      fileUrl: '#'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl w-full max-w-xl relative z-10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-900">Upload Lecture Material</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Note Title</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. Advanced Algorithms and Data Structures"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subject</label>
            <select 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all appearance-none"
              value={formData.subject}
              onChange={e => setFormData({...formData, subject: e.target.value as Subject})}
            >
              {Object.values(Subject).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description / Context</label>
            <textarea 
              required
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="Provide a brief overview of the topics covered..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 flex flex-col items-center justify-center gap-3 group hover:border-indigo-400 hover:bg-indigo-50 transition-all cursor-pointer relative">
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  setFormData({...formData, fileName: file.name, fileType: file.name.split('.').pop() || 'pdf'});
                }
              }}
            />
            <div className="bg-white p-3 rounded-full shadow-sm border border-slate-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-900">{formData.fileName || 'Drop files here or click to upload'}</p>
              <p className="text-xs text-slate-500">PDF, PPTX, TXT up to 20MB</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-[2] px-4 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200"
            >
              Publish Notes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
