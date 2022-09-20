import Button from '@components/Shared/Button';
import React from 'react';
import { Editor } from "react-split-mde"
import { parser } from 'react-split-mde/lib/parser';
import { Modal as DaisyModal } from 'react-daisyui';

import "react-split-mde/css/index.css"

export interface IModalProps {
  value: string;
  rating: number | null;
  isVisible: boolean;
  setModalContentValue: (newValue: string) => void;
  setModalRatingValue: (newValue: number) => void;
  onSubmit: () => void;
  onClose: () => void;
}



export default function Modal(props: IModalProps): JSX.Element {
  const { value, rating, setModalContentValue, setModalRatingValue, isVisible, onSubmit, onClose } = props;


  // TODO: add confirmation dialog


  return (

    <DaisyModal open={isVisible} onClickBackdrop={onClose} className="flex flex-col w-11/12 max-w-5xl text-white bg-black border border-white h-11/12 h-1/2 backdrop-blur-xl">
      <DaisyModal.Header className="font-bold text-center">
        enter journal
      </DaisyModal.Header>

      <DaisyModal.Body className="flex flex-col flex-1">
        <Editor
          value={value}
          parser={parser}
          onChange={setModalContentValue}
          textareaClassName="text-white bg-black"
        />
        <div className='flex-col justify-center w-full p-2 text-center'>
          rate your day
          <div className="justify-center w-full btn-group">

            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <Button className='text-white' key={num} onClick={() => setModalRatingValue(num)} isActive={rating === num}>{num}</Button>
              ))
            }
          </div>
        </div>
      </DaisyModal.Body>

      <DaisyModal.Actions>
        <Button className='text-white' onClick={onSubmit}>save</Button>
      </DaisyModal.Actions>
    </DaisyModal>

  );
}
