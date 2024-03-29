import React, { useCallback, useState } from 'react';
import { Editor } from 'react-split-mde';
import { parser } from 'react-split-mde/lib/parser';
import Modal from '@components/Modal';

import { DayRating } from './DayRating';

export interface JournalEntryModalProps {
  value: string;
  rating: number | null;
  isVisible: boolean;
  setModalContentValue: (newValue: string) => void;
  setModalRatingValue: (newValue: number) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export default function JournalEntryModal(props: JournalEntryModalProps): JSX.Element {
  const { value, rating, setModalContentValue, setModalRatingValue, isVisible, onSubmit, onClose } =
    props;

  // TODO: Should this not be a state of JournalEntry?
  // TODO: Could be a usecase of the partial entry type
  const [editorValue, setEditorValue] = useState(value);
  const [ratingValue, setRatingValue] = useState<number>(rating ?? 0);

  const handleModalSubmit = useCallback(() => {
    setModalContentValue(editorValue);
    setModalRatingValue(ratingValue);
    onSubmit();
  }, [setModalContentValue, editorValue, setModalRatingValue, ratingValue, onSubmit]);

  // TODO: Do not submit id no rating is selected
  return (
    <Modal
      isVisible={isVisible}
      onSubmit={handleModalSubmit}
      onClickBackdrop={onClose}
      headerText="journal"
      className="flex flex-col w-11/12 max-w-5xl text-white bg-black h-11/12 backdrop-blur-xl"
      submitButtonText="save">
      <div className='flex flex-col overflow-y-scroll '>
        <div className='flex flex-col overflow-y-scroll '>

          <Editor
            value={editorValue}
            parser={parser}
            onChange={setEditorValue}
            textareaClassName="text-white bg-black" />
        </div>
        <div className="sticky bottom-0 flex-col justify-center w-full p-2 text-center">
          rate your day
          <DayRating
            rating={ratingValue}
            setModalRatingValue={setRatingValue} />
        </div>
      </div>
    </Modal>
  );
}
