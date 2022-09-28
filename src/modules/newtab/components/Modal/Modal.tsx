import React, { useCallback, useState } from 'react';
import { Modal as DaisyModal } from 'react-daisyui';
import clsx from 'clsx';
import Button from '../Button';
import ConfirmationModal from './ConfirmationModal';

import "react-split-mde/css/index.css"

export interface ModalProps {
  isVisible: boolean;
  onSubmit: () => void;
  onClickBackdrop?: () => void;
  onClose?: () => void;
  headerText: string;
  className?: string;
  children?: React.ReactNode;
  submitButtonText?: string;
  showConfirmationModal?: boolean;
}

// TODO: Consider splitting this out into FormModal?
// TODO: If splitting this out into FormModal, should it take a context?

export default function Modal(props: ModalProps): JSX.Element {
  const { isVisible, onSubmit, onClose, onClickBackdrop, headerText, className, children, submitButtonText, showConfirmationModal } = props;

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false)

  const handleSubmitPress = useCallback(
    () => {
      if (showConfirmationModal) {
        setIsConfirmationModalVisible(true)
      } else {
        onSubmit()
      }
    },
    [onSubmit, showConfirmationModal],
  )

  const handleConfirmationModalClose = useCallback(
    () => {
      setIsConfirmationModalVisible(false)
    },
    [setIsConfirmationModalVisible],
  )
  const handleConfirmationModalSubmit = useCallback(
    () => {
      setIsConfirmationModalVisible(false)
      onSubmit()
    },
    [setIsConfirmationModalVisible, onSubmit],
  )

  return (
    <>
      <DaisyModal
        open={isVisible}
        onClickBackdrop={onClickBackdrop}
        className={clsx(className, "flex flex-col max-w-5xl text-white bg-black border border-white backdrop-blur-xl")}>
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
        <DaisyModal.Body className="flex flex-col flex-1 overflow-hidden ">
          {children}
        </DaisyModal.Body>
        {handleSubmitPress && submitButtonText &&
          <DaisyModal.Actions className="sticky bottom-0">
            <Button
              className='text-white'
              onClick={handleSubmitPress}>{submitButtonText}
            </Button>
          </DaisyModal.Actions>}
      </DaisyModal>
      {isConfirmationModalVisible && <ConfirmationModal
        cancelButtonText='cancel'
        submitButtonText='save'
        isVisible={isConfirmationModalVisible}
        headerText='confirm'
        onSubmit={handleConfirmationModalSubmit}
        onClose={handleConfirmationModalClose}
        onClickBackdrop={handleConfirmationModalClose} />}
    </>

  );
}
