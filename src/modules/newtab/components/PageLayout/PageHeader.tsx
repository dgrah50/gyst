import Button from '@components/Button';
import { getAuth, signOut } from '@firebase/auth';
import React from 'react';
import { Navbar } from 'react-daisyui';

export interface PageHeaderProps {
  label: string;
}

export default function PageHeader(props: PageHeaderProps): JSX.Element {
  const { label } = props;
    const auth = getAuth();

  const handleSignOut = () => {
    console.log('handleSignOut')
    signOut(auth).then(() => {
      console.log("Sign Out Successful")
    }).catch((error) => {
      console.error(error)
    });
  }
    
return (
  <Navbar className="bg-black header backdrop-blur">
    <Navbar.Start />
    <Navbar.Center className="navbar-center">
      <h1 className="text-xl text-white">{label}</h1>
    </Navbar.Center>
    <Navbar.End className="navbar-end">
      <Button
        iconName="Menu"
        className="text-xl text-white normal-case border-none"
        onClick={() => handleSignOut()} />
    </Navbar.End>
  </Navbar>
);
}




