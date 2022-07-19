import * as React from 'react';
import { Navbar } from 'react-daisyui';
import { Settings } from 'react-feather';
import { Button } from '../shared/Button';

export default function Header() {
  return (
    <Navbar className="border border-white header backdrop-blur">
      <Navbar.Start>
        <Button className="text-xl text-white normal-case " label="gyst" />
      </Navbar.Start>
      <Navbar.End className="navbar-end">
        <Button className="text-xl text-white normal-case ">
          <Settings size={18} />
        </Button>
      </Navbar.End>
    </Navbar>
  );
}
