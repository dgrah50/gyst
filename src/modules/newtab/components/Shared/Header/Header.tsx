import * as React from 'react';
import { Navbar } from 'react-daisyui';
import { getAuth, signOut } from "@firebase/auth";
import Button from '@components/Shared/Button';

export default function Header(): JSX.Element {

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
      <Navbar.Start>
        {/* <Button className="text-xl text-white normal-case " label="gyst" /> */}
        <span className='ml-4 text-xl text-white'>
          gyst
        </span>
      </Navbar.Start>
      <Navbar.End className="navbar-end">
        <Button
          iconName='Settings'
          className="text-xl text-white normal-case "
          onClick={() => handleSignOut()} />
      </Navbar.End>
    </Navbar>
  );
}
