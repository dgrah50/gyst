import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Theme } from 'react-daisyui';
import { Sidebar } from '../../components/Sidebar/Sidebar';

import Goals from './pages/Goals';
import Journal from './pages/Journal';
import Notes from './pages/Notes';
import Overview from './pages/Overview';
import TimeTracker from './pages/TimeTracker';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import '../../styles/base.scss';

const Newtab: React.FC = () => {
  return (
    <Router basename="src/modules/newtab/index.html">
      <Theme dataTheme="gyst" className="h-screen bg-black newtab">
        <Header />
        <Sidebar className="sidebar " />
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
