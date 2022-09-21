import React, { useCallback, useState } from 'react';
import { Editor } from 'react-split-mde';
import { parser } from 'react-split-mde/lib/parser';
import Modal from '@components/Shared/Modal';

import { DayRating } from './DayRating';

export interface IJournalEntryModalProps {
  value: string;
  rating: number | null;
  isVisible: boolean;
  setModalContentValue: (newValue: string) => void;
  setModalRatingValue: (newValue: number) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export default function JournalEntryModal(props: IJournalEntryModalProps): JSX.Element {
  const { value, rating, setModalContentValue, setModalRatingValue, isVisible, onSubmit, onClose } =
    props;

  const [editorValue, setEditorValue] = useState(value);
  const [ratingValue, setRatingValue] = useState<number>(rating ?? 0);

  const handleModalSubmit = useCallback(() => {
    setModalContentValue(editorValue);
    setModalRatingValue(ratingValue);
    onSubmit();
  }, [setModalContentValue, editorValue, setModalRatingValue, ratingValue, onSubmit]);

  return (
    <Modal
      isVisible={isVisible}
      onSubmit={handleModalSubmit}
      onClickBackdrop={onClose}
      headerText="journal"
      className="flex flex-col w-11/12 max-w-5xl text-white bg-black border border-white h-11/12 h-1/2 backdrop-blur-xl"
      submitButtonText="save">
      <Editor
        value={editorValue}
        parser={parser}
        onChange={setEditorValue}
        textareaClassName="text-white bg-black" />
      <div className="flex-col justify-center w-full p-2 text-center">
        rate your day
        <DayRating
          rating={ratingValue}
          setModalRatingValue={setRatingValue} />
      </div>
    </Modal>
  );
}
