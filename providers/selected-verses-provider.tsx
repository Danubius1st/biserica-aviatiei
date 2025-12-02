'use client';

import React, { useState } from 'react';
import {
  SelectedVersesContext,
  SelectedVersesContextType
} from '@/context/selected-context';
import { refIdDbType } from '@/models/app/reference';

interface Props {
  children: React.ReactNode;
};

export const SelectedVersesProvider = ({ children }: Props) => {
  const [id, setId] = useState(0);
  const [initialVerseIds, setInitialVerseIds] = useState<refIdDbType[]>([]);
  const [verseIds, setVerseIds] = useState<refIdDbType[]>([]);
  const [stringRef, setStringRef] = useState('');
  const [text, setText] = useState('');
  const [abbrev, setAbbrev] = useState('');
  const [bookNo, setBookNo] = useState(0);
  const [showCheck, setShowCheck] = useState(true);

  const resetContext = () => {
    setId(0);
    setInitialVerseIds([]);
    setVerseIds([]);
    setStringRef('');
    setText('');
    setAbbrev('');
    setShowCheck(false);
  };

  const contextValue: SelectedVersesContextType = {
    id,
    initialVerseIds,
    verseIds,
    stringRef,
    text,
    abbrev,
    bookNo,
    showCheck,
    setId,
    setInitialVerseIds,
    setVerseIds,
    setStringRef,
    setText,
    setAbbrev,
    setBookNo,
    setShowCheck,
    resetContext
  };

  return (
    <SelectedVersesContext.Provider
      value={contextValue}
    >
      {children}
    </SelectedVersesContext.Provider>
  );
};
export { SelectedVersesContext };
