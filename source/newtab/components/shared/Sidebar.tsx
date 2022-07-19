import * as React from 'react';
import { Menu } from 'react-daisyui';
import { Link, useLocation } from 'react-router-dom';

export interface ISidebarProps {
  className: string;
}

export interface IMenuItemProps {
  label: string;
  className?: string;
}

export function MenuItem(props: IMenuItemProps) {
  const { label, className } = props;
  return (
    <Menu.Item className={`text-white border border-white ${className}`}>
      <button className="btn btn-outline btn-white">{label}</button>
    </Menu.Item>
  );
}

export function Sidebar(props: ISidebarProps) {
  const { className } = props;
  const location = useLocation();
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
