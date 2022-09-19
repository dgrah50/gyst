import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Theme } from 'react-daisyui';

import Sidebar from '@components/Overview/Sidebar/Sidebar';
import Header from '@components/Shared/Header/Header';
import Footer from '@components/Shared/Footer/Footer';

import Goals from './pages/Goals/Goals';
import Journal from './pages/Journal/Journal';
import Notes from './pages/Notes/Notes';
import Overview from './pages/Overview/Overview';
import TimeTracker from './pages/TimeTracker/TimeTracker';

import '../../styles/base.scss';

const Newtab: React.FC = () => {
  return (
    <Router basename="src/modules/newtab/index.html">
      <Theme dataTheme="gyst" className="h-screen bg-red newtab">
        <Header />
        <Sidebar className="sidebar" />
        <div className=" main">
          <Routes>
            <Route element={<Overview />} path="/" />
            <Route element={<Goals />} path="/goals" />
            <Route element={<Journal />} path="/journal" />
            <Route element={<Notes />} path="/notes" />
            <Route element={<TimeTracker />} path="/timetracker" />
          </Routes>
        </div>
        <Footer />
      </Theme>
    </Router>
  );
};

export default Newtab;
