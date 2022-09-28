import React, { ChangeEvent, useState } from 'react';
import { Form } from 'react-daisyui';
import Input from '@components/Input';
import { clsx } from 'clsx';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import Button from '@components/Button';
import { AuthModalErrorState, AuthModalState } from './AuthModal';


interface EmailPasswordViewProps {
  pageState: AuthModalState;
  setPageState: (pageState: AuthModalState) => void;
}

export function EmailPasswordView({ pageState, setPageState }: EmailPasswordViewProps): JSX.Element {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('')

  const [error, setError] = useState<AuthModalErrorState | null>(null);

  const auth = getAuth();

  function handleCreateWithEmailAndPassword() {
    createUserWithEmailAndPassword(auth, emailAddress, password)
      .then(() => {
        setError(null);
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
      })
      .catch((error) => {
        console.error(error)
        setError(AuthModalErrorState.BadEmailPassword)
      });
  }


  const handleFormSubmit = () => {
    if (pageState === AuthModalState.SignInView) {
      handleSignInWithEmailAndPassword()
    } else {
      handleCreateWithEmailAndPassword()
    }
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setEmailAddress(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setPassword(e.target.value)
  }


  const togglePageState = () => {
    if (pageState === AuthModalState.SignInView) {
      setPageState(AuthModalState.SignUpView)
    } else {
      setPageState(AuthModalState.SignInView)
    }
  }

  return (
    <Form>
      <div className='flex justify-start text-lg text-white'>
        email
      </div>
      <Input
        className={clsx({ 'border-red-500': error === AuthModalErrorState.BadEmailPassword })}
        onChange={handleEmailChange} />
      <div className='flex justify-start text-lg text-white'>
        password
      </div>
      <Input
        className={clsx({ 'border-red-500': error === AuthModalErrorState.BadEmailPassword })}
        type="password"
        onChange={handlePasswordChange} />
      <Button
        className='mt-6'
        label={pageState === AuthModalState.SignInView ? 'sign in' : 'sign up'}
        isActive
        onClick={handleFormSubmit} />
      <Button
        className='mt-6 text-white border-none'
        label={pageState === AuthModalState.SignInView ? 'don\'t have an account? sign up' : 'do you have an account? sign in'}
        onClick={togglePageState} />
    </Form>
  );
}