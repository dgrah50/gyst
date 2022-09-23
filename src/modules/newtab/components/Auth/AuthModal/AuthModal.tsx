import React, { useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
} from '@firebase/auth';

import Modal from '@components/Shared/Modal';
import { GoogleSignInView } from './GoogleSignInView';
import { EmailPasswordView } from './EmailPasswordView';
import './AuthModal.scss'

export interface AuthModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export enum AuthModalState {
  SignInView,
  SignUpView
}

export enum AuthModalErrorState {
  BadEmailPassword,
}

export default function AuthModal(props: AuthModalProps): JSX.Element {
  const { isVisible, onClose } = props;
  const [pageState, setPageState] = useState<AuthModalState>(AuthModalState.SignInView);



  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      onClose();
    }
  });

  return (
    <Modal
      isVisible={isVisible}
      // Submit action not required because there is a listener on the auth state
      onSubmit={() => { }}
      onClickBackdrop={onClose}
      headerText={pageState === AuthModalState.SignInView ? 'sign in' : 'sign up'}
      className="flex flex-col w-full h-auto max-w-xl text-white bg-black border border-white max-w-1/2 backdrop-blur-xl">

      <GoogleSignInView
        pageState={pageState} />
      <div className='flex justify-center mt-6 text-white continue-divider--center'>
        <span>or continue with </span>
      </div>
      <EmailPasswordView
        pageState={pageState}
        setPageState={setPageState} />


    </Modal>
  );
}
