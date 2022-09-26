import React from 'react';
import { Modal as DaisyModal } from 'react-daisyui';
import clsx from 'clsx';
import Button from '../Button';

import "react-split-mde/css/index.css"

export interface IConfirmationProps {
  isVisible: boolean;
  onSubmit: () => void;
  onClickBackdrop: () => void;
  onClose?: () => void;
  headerText: string;
  className?: string;
  children?: React.ReactNode;
  submitButtonText: string;
  cancelButtonText: string;
}



export default function ConfirmationModal(props: IConfirmationProps): JSX.Element {
  const { isVisible, onSubmit, onClose, onClickBackdrop, headerText, className, children, submitButtonText, cancelButtonText } = props;

  return (

    <DaisyModal
      open={isVisible}
      onClickBackdrop={onClickBackdrop}
      className={clsx(className, `flex flex-col max-w-5xl w-64 text-white bg-black border border-white backdrop-blur-xl`)}>
      <DaisyModal.Header className="font-bold text-center">
        {headerText}
      </DaisyModal.Header>
      <DaisyModal.Body className="flex flex-col flex-1">
        {children}
      </DaisyModal.Body>
      <DaisyModal.Actions className='flex justify-between'>
        <Button
          className='text-white'
          onClick={onClose}>{cancelButtonText}
        </Button>
        <Button
          className='text-white'
          onClick={onSubmit}>{submitButtonText}
        </Button>
      </DaisyModal.Actions>
    </DaisyModal>

  );
}
