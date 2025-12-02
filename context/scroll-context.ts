import {
  Dispatch,
  SetStateAction,
  createContext,
} from 'react';

export interface ScrollContextType {
  scrollPosition: number;
  setScrollPosition: Dispatch<SetStateAction<number>>;
};

export const ScrollContext = createContext<ScrollContextType | undefined>(undefined);
