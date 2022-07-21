import * as React from 'react';
import { Menu } from 'react-daisyui';
import { NavLink, useLocation } from 'react-router-dom';
import { MenuItem } from '../MenuItem';

export interface ISidebarProps {
  className: string;
}

export function Sidebar(props: ISidebarProps): JSX.Element {
  const { className } = props;
  const location = useLocation();
  console.log(location);
  // TODO: use location to set active menu item
  const activeStyle = {
    textDecoration: 'underline',
    color: 'green',
  };
  const inActiveStyle = {
    color: 'red',
  };

  return (
    <Menu className={`${className} border border-white`}>
      <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}>
        <MenuItem label="home" className="active" iconName="Home" />
      </NavLink>
      <NavLink to="/journal" style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}>
        <MenuItem label="journal" iconName="Edit3" />
      </NavLink>
      <NavLink to="/timetracker" style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}>
        <MenuItem label="time tracker" iconName="Clock" />
      </NavLink>

      <NavLink to="/goals" style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}>
        <MenuItem label="goals" iconName="Target" />
      </NavLink>
      <NavLink to="/notes" style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}>
        <MenuItem label="notes" iconName="Book" />
      </NavLink>
    </Menu>
  );
}
