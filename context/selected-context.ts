import { createContext } from 'react';
import { refIdDbType } from '@/models/app/reference';

export interface SelectedVersesContextType {
  id: number;
  initialVerseIds: refIdDbType[];
  verseIds: refIdDbType[];
  stringRef: string;
  text: string;
  abbrev: string;
  bookNo: number;
  showCheck: boolean;

  setId: (id: number) => void;
  setInitialVerseIds: (initialVerseIds: refIdDbType[]) => void;
  setVerseIds: (verseIds: refIdDbType[]) => void;
  setStringRef: (stringRef: string) => void;
  setText: (text: string) => void;
  setAbbrev: (text: string) => void;
  setBookNo: (bookNo: number) => void;
  setShowCheck: (showCheck: boolean) => void;

  resetContext: () => void;
}

export const SelectedVersesContext = createContext<SelectedVersesContextType | undefined>(undefined);
