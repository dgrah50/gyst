import * as React from 'react';
import { Menu } from 'react-daisyui';
import { Link, useLocation } from 'react-router-dom';
import { MenuItem } from '../MenuItem';

export interface ISidebarProps {
  className: string;
}

export function Sidebar(props: ISidebarProps): JSX.Element {
  const { className } = props;
  const location = useLocation();
  console.log(location);
  // TODO: use location to set active menu item
  return (
    <Menu className={`${className} border border-white`}>
      <Link to="/index.html">
        <MenuItem label="home" className="active" iconName="Home" />
      </Link>
      <Link to="/journal">
        <MenuItem label="journal" iconName="Edit3" />
      </Link>

      <Link to="/timetracker">
        <MenuItem label="time tracker" iconName="Clock" />
      </Link>

      <Link to="/goals">
        <MenuItem label="goals" iconName="Target" />
      </Link>
      <Link to="/notes">
        <MenuItem label="notes" iconName="Book" />
      </Link>
    </Menu>
  );
}
