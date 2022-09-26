import React from 'react';
import { Menu } from 'react-daisyui';
import { NavLink } from 'react-router-dom';
import MenuItem from '@components/Shared/Menu';
import clsx from 'clsx';

export interface ISidebarProps {
  className: string;
}

// TODO: Keyboard navigation, with shortcuts for each menu item
// Perhaps consider a slide out animation when out of focus?
// Could do a little > bounce animation when the menu item is selected
// Shimmer animation on focus would be pretty cool too

export default function Sidebar(props: ISidebarProps): JSX.Element {
  const { className } = props;

  return (
    <Menu className={clsx(className, 'bg-black')}>
      <NavLink to="/">
        {({ isActive }) => (
          <MenuItem
            label="home"
            className="active"
            iconName="Home"
            isActive={isActive} />
        )}
      </NavLink>
      <NavLink to="/journal">
        {({ isActive }) => <MenuItem
          label="journal"
          iconName="Edit3"
          isActive={isActive} />}
      </NavLink>
      <NavLink to="/timetracker">
        {({ isActive }) => <MenuItem
          label="time tracker"
          iconName="Clock"
          isActive={isActive} />}
      </NavLink>
      <NavLink to="/goals">
        {({ isActive }) => <MenuItem
          label="goals"
          iconName="Target"
          isActive={isActive} />}
      </NavLink>
      <NavLink to="/notes">
        {({ isActive }) => <MenuItem
          label="notes"
          iconName="Book"
          isActive={isActive} />}
      </NavLink>
    </Menu>
  );
}
