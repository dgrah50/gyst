import Button from '@components/Shared/Button';
import React, { useState } from 'react';
import { Editor } from "react-split-mde"
import { parser } from 'react-split-mde/lib/parser';
import { Modal as DaisyModal } from 'react-daisyui';

import "react-split-mde/css/index.css"

export interface IModalProps {
  value: string;
  isVisible: boolean;
  setValue: (newValue: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}



export default function Modal(props: IModalProps): JSX.Element {
  const { value, setValue, isVisible, onSubmit, onClose } = props;
  console.log(props)
  const [selectedRating, setRating] = useState<string | null>(null)

  return (

    <DaisyModal open={isVisible} className="flex flex-col w-11/12 max-w-5xl text-white bg-black border border-white h-11/12 h-1/2 backdrop-blur-xl" >
      <DaisyModal.Header className="font-bold text-center">
        enter journal
        <Button className='absolute text-white right-2 top-2' onClick={onClose}>x</Button>
      </DaisyModal.Header>

      <DaisyModal.Body className="flex flex-col flex-1">
        <Editor
          value={value}
          parser={parser}
          onChange={setValue}
          textareaClassName="text-white bg-black"
        />
        <div className='flex-col justify-center w-full p-2 text-center'>
          rate your day
          <div className="justify-center w-full btn-group">

            {
              ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                <Button className='text-white' key={num} onClick={() => setRating(num)} isActive={selectedRating === num}>{num}</Button>
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
