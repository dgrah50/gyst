import Button from '@components/Shared/Button';
import React from 'react';
import { Modal as DaisyModal } from 'react-daisyui';

import "react-split-mde/css/index.css"

export interface IModalProps {
  isVisible: boolean;
  onSubmit: () => void;
  onClickBackdrop: () => void;
  onClose?: () => void;
  headerText: string;
  className?: string;
  children?: React.ReactNode;
  submitButtonText?: string;
}



export default function Modal(props: IModalProps): JSX.Element {
  const { isVisible, onSubmit, onClose, onClickBackdrop, headerText, className, children, submitButtonText } = props;

  // TODO: add confirmation dialog

  return (

    <DaisyModal
      open={isVisible}
      onClickBackdrop={onClickBackdrop}
      className={`flex flex-col max-w-5xl text-white bg-black border border-white backdrop-blur-xl ${className}`}>
      <DaisyModal.Header className="font-bold text-center">
        {headerText}
        {
          onClose && (
            <Button
              className="absolute top-0 right-0 text-white border border-white"
              onClick={onClose}>
              X
            </Button>
          )
        }
      </DaisyModal.Header>
      <DaisyModal.Body className="flex flex-col flex-1">
        {children}
      </DaisyModal.Body>
      <DaisyModal.Actions>
        <Button
          className='text-white'
          onClick={onSubmit}>{submitButtonText}
        </Button>
      </DaisyModal.Actions>
    </DaisyModal>

  );
}
