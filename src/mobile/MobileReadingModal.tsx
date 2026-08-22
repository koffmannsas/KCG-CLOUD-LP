import React from 'react';
import { useMobileOSStore } from './mobileOSStore';
import { LETTERS, Letter } from '../data/letters';
import LetterModal from '../components/LetterModal';

export default function MobileReadingModal() {
  const { selectedLetterId, setSelectedLetterId } = useMobileOSStore();

  if (!selectedLetterId) return null;

  const letter = LETTERS.find((l) => l.id === selectedLetterId) || null;

  return (
    <LetterModal
      letter={letter}
      isOpen={!!selectedLetterId}
      onClose={() => setSelectedLetterId(null)}
      onSelectLetter={(newLetter) => setSelectedLetterId(newLetter.id)}
    />
  );
}
