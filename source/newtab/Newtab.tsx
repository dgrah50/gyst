import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Theme, Button, Navbar } from 'react-daisyui';
import { Settings } from 'react-feather';
import { Sidebar } from './components/shared/Sidebar';

import '../styles/base.scss';
import Goals from './pages/Goals';
import Journal from './pages/Journal';
import Notes from './pages/Notes';
import Overview from './pages/Overview';
import TimeTracker from './pages/TimeTracker';

const Newtab: React.FC = () => {
  return (
    <Router>
      <Theme dataTheme="gyst" className="h-screen bg-black newtab">
        <Navbar className="border border-white header backdrop-blur">
          <Navbar.Start>
            <Button className="text-xl text-white normal-case " color="ghost">
              gyst
            </Button>
          </Navbar.Start>
          <Navbar.End className="navbar-end">
            <Button className="text-xl text-white normal-case " color="ghost">
              <Settings size={18} />
            </Button>
          </Navbar.End>
        </Navbar>

        <Sidebar className="sidebar " />
        <div className=" main">
          <Routes>
            <Route element={<Overview />} path="/index.html" />
            <Route element={<Goals />} path="/goals" />
            <Route element={<Journal />} path="/journal" />
            <Route element={<Notes />} path="/notes" />
            <Route element={<TimeTracker />} path="/timetracker" />
          </Routes>
        </div>
        <div className="footer" />
      </Theme>
    </Router>
  );
};

export default Newtab;
