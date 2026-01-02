
export interface Note {
  id: string;
  title: string;
  description: string;
  subject: string;
  facultyName: string;
  uploadDate: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
  summary?: string;
  studyQuestions?: string[];
}

export type UserRole = 'STUDENT' | 'FACULTY';

export enum Subject {
  COMPUTER_SCIENCE = 'Computer Science',
  MATHEMATICS = 'Mathematics',
  PHYSICS = 'Physics',
  LITERATURE = 'Literature',
  ECONOMICS = 'Economics',
  BIOLOGY = 'Biology'
}
