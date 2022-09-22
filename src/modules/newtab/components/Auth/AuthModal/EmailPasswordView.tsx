import React from 'react';
import { Form } from 'react-daisyui';
import Input from '@components/Shared/Input';
import { clsx } from 'clsx';
import { AuthModalErrorState } from './AuthModal';


export interface EmailPasswordViewProps {
  setEmailAddress: (emailAddress: string) => void;
  setPassword: (password: string) => void;
  error: AuthModalErrorState | null;
}

export function EmailPasswordView(props: EmailPasswordViewProps): JSX.Element {
  const { setEmailAddress, setPassword, error } = props;

  return (
    <Form>
      <div className='flex justify-start text-lg text-white'>
        email
      </div>
      <Input
        className={clsx({ 'border-red-500': error === AuthModalErrorState.BadEmailPassword })}
        onChange={e => {
          setEmailAddress(e.target.value);
        }} />
      <div className='flex justify-start text-lg text-white'>
        password
      </div>
      <Input
        className={clsx({ 'border-red-500': error === AuthModalErrorState.BadEmailPassword })}
        type="password"
        onChange={e => {
          setPassword(e.target.value);
        }} />
    </Form>
  );
}