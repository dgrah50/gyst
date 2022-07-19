import * as React from 'react';
import { Menu } from 'react-daisyui';
import { Link, useLocation } from 'react-router-dom';
import { MenuItem } from '../shared/MenuItem';

export interface ISidebarProps {
  className: string;
}

export function Sidebar(props: ISidebarProps) {
  const { className } = props;
  const location = useLocation();
  console.log(location);
  // TODO: use location to set active menu item
  return (
    <Menu className={`${className} border border-white`}>
      <Link to="/index.html">
        <MenuItem label="home" className="active" />
      </Link>
      <Link to="/journal">
        <MenuItem label="journal" />
      </Link>

      <Link to="/timetracker">
        <MenuItem label="time tracker" />
      </Link>

      <Link to="/goals">
        <MenuItem label="goals" />
      </Link>
      <Link to="/notes">
        <MenuItem label="notes" />
      </Link>
    </Menu>
  );
}
