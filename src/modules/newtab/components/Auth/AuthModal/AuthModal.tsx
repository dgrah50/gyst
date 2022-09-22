import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
} from '@firebase/auth';

import Modal from '@components/Shared/Modal';
import Button from '@components/Shared/Button';
import { EmailPasswordView } from './EmailPasswordView';
import './AuthModal.scss'

export interface AuthModalProps {
  isVisible: boolean;
  onAuthComplete: () => void;
  onClose: () => void;
}

enum AuthModalState {
  SignInView,
  SignUpView
}

export enum AuthModalErrorState {
  BadEmailPassword,
}

export default function AuthModal(props: AuthModalProps): JSX.Element {
  const { isVisible, onAuthComplete, onClose } = props;

  const [emailAddress, setEmailAddress] = useState('');
  const [pageState, setPageState] = useState<AuthModalState>(AuthModalState.SignInView);
  const [password, setPassword] = useState('')
  const [error, setError] = useState<AuthModalErrorState | null>(null);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
  if (user) {
    onClose();
  }
  });

  // TODO - wrap in useCallback
  // TODO - Consider dropping this down into the EmailPasswordView component
  function handleCreateWithEmailAndPassword() {
  createUserWithEmailAndPassword(auth, emailAddress, password)
    .then(() => {
    setError(null);
    onAuthComplete();
    })
    .catch((error) => {
    console.error(error);
    setError(AuthModalErrorState.BadEmailPassword);
    });
  }
  const handleSignInWithEmailAndPassword = () => {
  signInWithEmailAndPassword(auth, emailAddress, password)
    .then(() => {
    setError(null)
    onAuthComplete()
    })
    .catch((error) => {
    console.error(error)
    setError(AuthModalErrorState.BadEmailPassword)
    });
  }
  // Implement Google Sign In with OAuth token
  const handleSignInWithGoogle = () => {
  chrome.identity.getAuthToken({ interactive: true }, token => {
    if (chrome.runtime.lastError || !token) {
    alert(`SSO ended with an error: ${JSON.stringify(chrome.runtime.lastError)}`)

    return
    }
    signInWithCredential(auth, GoogleAuthProvider.credential(null, token))
    .then(res => {
      console.log('signed in!', res)
    })
    .catch(err => {
      alert(`SSO ended with an error: ${err}`)
    })
  })
  }
  const handleFormSubmit = () => {
  if (pageState === AuthModalState.SignInView) {
    handleSignInWithEmailAndPassword()
  } else {
    handleCreateWithEmailAndPassword()
  }
  }

  const handleEmailChange = (e: string) => {
  setError(null)
  setEmailAddress(e)
  }

  const handlePasswordChange = (e: string) => {
  setError(null)
  setPassword(e)
  }
  const togglePageState = () => {
  if (pageState === AuthModalState.SignInView) {
    setPageState(AuthModalState.SignUpView)
  } else {
    setPageState(AuthModalState.SignInView)
  }
  }

  return (
    <Modal
    isVisible={isVisible}
    onSubmit={handleFormSubmit}
    onClickBackdrop={onClose}
    headerText={pageState === AuthModalState.SignInView ? 'sign in' : 'sign up'}
    className="flex flex-col w-full h-auto max-w-xl text-white bg-black border border-white max-w-1/2 backdrop-blur-xl">

      <Button
    className='mt-6 text-white'
    // TODO: Get google icon
    iconName='Bell'
    label={pageState === AuthModalState.SignInView ? 'sign in with google' : 'sign up with google'}
    onClick={handleSignInWithGoogle} />
      <div className='flex justify-center mt-6 text-white continue-divider--center'>
        <span>or continue with </span>
      </div>
      <EmailPasswordView
    setEmailAddress={handleEmailChange}
    setPassword={handlePasswordChange}
    error={error} />
      <Button
    className='mt-6'
    label={pageState === AuthModalState.SignInView ? 'sign in' : 'sign up'}
    isActive
    onClick={handleFormSubmit} />
      <Button
    className='mt-6 text-white border-none'
    label={pageState === AuthModalState.SignInView ? 'don\'t have an account? sign up' : 'do you have an account? sign in'}
    onClick={togglePageState} />

    </Modal>
  );
}



