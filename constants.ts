
import { Note, Subject } from './types';

export const INITIAL_NOTES: Note[] = [
  {
    id: '1',
    title: 'Introduction to Quantum Mechanics',
    description: 'A foundational lecture on wave-particle duality and the uncertainty principle.',
    subject: Subject.PHYSICS,
    facultyName: 'Dr. Sarah Smith',
    uploadDate: '2024-05-15',
    fileUrl: '#',
    fileName: 'quantum_basics.pdf',
    fileType: 'pdf',
    summary: 'This note covers the basic concepts of quantum mechanics including Schrodinger\'s equation.'
  },
  {
    id: '2',
    title: 'Macroeconomics 101: Market Trends',
    description: 'Detailed analysis of current global market trends and inflation impacts.',
    subject: Subject.ECONOMICS,
    facultyName: 'Prof. James Wilson',
    uploadDate: '2024-05-10',
    fileUrl: '#',
    fileName: 'macro_trends_2024.pdf',
    fileType: 'pdf'
  },
  {
    id: '3',
    title: 'React Design Patterns',
    description: 'Exploring HOCs, Render Props, and Custom Hooks in modern React applications.',
    subject: Subject.COMPUTER_SCIENCE,
    facultyName: 'Dr. Elena Rodriguez',
    uploadDate: '2024-05-12',
    fileUrl: '#',
    fileName: 'react_patterns.txt',
    fileType: 'text'
  }
];
