import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Menu } from 'react-daisyui';
import { NavLink } from 'react-router-dom';

import MenuItem from '@components/Menu';
import clsx from 'clsx';

export interface SidebarProps {
  className: string;
}

// TODO: Keyboard navigation, with shortcuts for each menu item
// Perhaps consider a slide out animation when out of focus?
// Could do a little > bounce animation when the menu item is selected
// Shimmer animation on focus would be pretty cool too

type KeyOfMap<M extends Map<unknown, unknown>> = M extends Map<infer K, unknown> ? K : never

export default function Sidebar(props: SidebarProps): JSX.Element {
  const { className } = props;
  const homeRef = useRef<HTMLAnchorElement>(null);
  const journalRef = useRef<HTMLAnchorElement>(null);
  const timetrackerRef = useRef<HTMLAnchorElement>(null);
  const goalsRef = useRef<HTMLAnchorElement>(null);
  const notesRef = useRef<HTMLAnchorElement>(null);

  const refMap = useMemo(() => new Map<number, React.RefObject<HTMLAnchorElement>>([
    [1, homeRef],
    [2, journalRef],
    [3, timetrackerRef],
    [4, goalsRef],
    [5, notesRef],
  ]), []);

  const [index, setIndex] = useState<KeyOfMap<typeof refMap>>(1)

  const keyhandler = useMemo(() => (e: KeyboardEvent) => {

    if (e.key === 'ArrowUp') {
      setIndex(index => Math.max(1, index - 1))
      console.log('up');
    }

    if (e.key === 'ArrowDown') {
      setIndex(index => Math.min(5, index + 1))
      console.log('down');
    }

  }, []);


  // TODO, checkout https://github.com/danilowoz/spatial-keyboard-navigation
  console.log(index)
  refMap.get(index)!.current?.focus();
  refMap.get(index)!.current?.click();

  useEffect(() => {

    window.addEventListener('keydown', keyhandler);


    () => window.removeEventListener('keydown', keyhandler)
  }, [keyhandler]);

  return (
    <Menu className={clsx(className, 'bg-black')}>
      <div className="flex items-center h-16 pl-3">
        <span className='ml-4 text-xl text-white'>
          gyst
        </span>
      </div>
      <NavLink
        to="/"
        ref={homeRef}>
        {({ isActive }) => (
          <MenuItem
            label="home"
            className="active"
            iconName="Home"
            isActive={isActive} />
        )}
      </NavLink>
      <NavLink
        to="/journal"
        ref={journalRef}>
        {({ isActive }) => <MenuItem
          label="journal"
          iconName="Edit3"
          isActive={isActive} />}
      </NavLink>
      <NavLink
        to="/timetracker"
        ref={timetrackerRef}>
        {({ isActive }) => <MenuItem
          label="time tracker"
          iconName="Clock"
          isActive={isActive} />}
      </NavLink>
      <NavLink
        to="/goals"
        ref={goalsRef}>
        {({ isActive }) => <MenuItem
          label="goals"
          iconName="Target"
          isActive={isActive} />}
      </NavLink>
      <NavLink
        to="/notes"
        ref={notesRef}>
        {({ isActive }) => <MenuItem
          label="notes"
          iconName="Book"
          isActive={isActive} />}
      </NavLink>
    </Menu>
  );
}