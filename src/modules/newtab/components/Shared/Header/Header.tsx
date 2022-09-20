import * as React from 'react';
import { Navbar } from 'react-daisyui';
import { Settings } from 'react-feather';

export default function Header(): JSX.Element {
  return (
    <Navbar className="bg-black header backdrop-blur">
      <Navbar.Start>
        {/* <Button className="text-xl text-white normal-case " label="gyst" /> */}
        <span className='ml-4 text-xl text-white'>
          gyst
        </span>
      </Navbar.Start>
      <Navbar.End className="navbar-end">
        {/* <Button className="text-xl text-white normal-case "> */}
        <span className='mr-4 text-xl text-white'>
          <Settings size={18} />
        </span>
        {/* </Button> */}
      </Navbar.End>
    </Navbar>
  );
}
