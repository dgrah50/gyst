import Button from '@components/Shared/Button';
import React, { useCallback, useState } from 'react';
import { Modal as DaisyModal } from 'react-daisyui';
import ConfirmationModal from './ConfirmationModal';

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
  showConfirmationModal?: boolean;
}



export default function Modal(props: IModalProps): JSX.Element {
  const { isVisible, onSubmit, onClose, onClickBackdrop, headerText, className, children, submitButtonText } = props;

  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  const handleSubmitPress = useCallback(
    () => {
      setShowConfirmationModal(true)
    },
    [setShowConfirmationModal],
  )

  const handleConfirmationModalClose = useCallback(
    () => {
      setShowConfirmationModal(false)
    },
    [setShowConfirmationModal],
  )
  const handleConfirmationModalSubmit = useCallback(
    () => {
      setShowConfirmationModal(false)
      onSubmit()
    },
    [setShowConfirmationModal, onSubmit],
  )

  // TODO: add confirmation dialog

  return (
    <>
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
            onClick={handleSubmitPress}>{submitButtonText}
          </Button>
        </DaisyModal.Actions>
      </DaisyModal>
      {showConfirmationModal && <ConfirmationModal
        cancelButtonText='cancel'
        submitButtonText='save'
        isVisible={showConfirmationModal}
        headerText='confirm'
        onSubmit={handleConfirmationModalSubmit}
        onClose={handleConfirmationModalClose}
        onClickBackdrop={handleConfirmationModalClose} />}
    </>


  );
}
