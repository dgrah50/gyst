import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Theme } from 'react-daisyui';

import Sidebar from '@components/Overview/Sidebar/Sidebar';
import Header from '@components/Shared/Header/Header';
import Footer from '@components/Shared/Footer/Footer';

import { initializeApp } from "@firebase/app";
import { getAuth, connectAuthEmulator, onAuthStateChanged } from "@firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "@firebase/firestore";

import AuthModal from '@components/Auth/AuthModal/AuthModal';
import Goals from './pages/Goals/Goals';
import Journal from './pages/Journal/Journal';
import Notes from './pages/Notes/Notes';
import Overview from './pages/Overview/Overview';
import TimeTracker from './pages/TimeTracker/TimeTracker';

import './styles/base.scss';
import { firebaseConfig } from '../../firebaseConfig';
import { useJournalSubscription } from './stores/journalStore';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099")
const db = getFirestore();
connectFirestoreEmulator(db, 'localhost', 9098);

const Newtab: React.FC = () => {
  const [isAuthModalVisible, setIsAuthModalVisible] = React.useState(false);
  useJournalSubscription()

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      setIsAuthModalVisible(true)
    }
  });

  return (
    <Router basename="src/modules/newtab/index.html">
      <Theme
        dataTheme="gyst"
        className="h-screen newtab">
        <Header />
        <Sidebar className="sidebar" />
        <div className=" main">
          <AuthModal
            isVisible={isAuthModalVisible}
            onClose={() => { setIsAuthModalVisible(false) }} />
          <Routes>
            <Route
              element={<Overview />}
              path="/" />
            <Route
              element={<Goals />}
              path="/goals" />
            <Route
              element={<Journal />}
              path="/journal" />
            <Route
              element={<Notes />}
              path="/notes" />
            <Route
              element={<TimeTracker />}
              path="/timetracker" />
          </Routes>
        </div>
        <Footer />
      </Theme>
    </Router>
  );
};

export default Newtab;
