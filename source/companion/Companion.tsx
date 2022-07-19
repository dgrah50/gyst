import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { browser } from 'webextension-polyfill-ts';

import '../styles/base.scss';
import Nub from './components/Nub';
import Content from './components/Content';

export interface ICompanionProps {}

export default function Companion(props: ICompanionProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((expanded) => !expanded);
  };

  return (
    <div>
      <style>@import &quot;{browser.runtime.getURL('css/companion.css')}&quot;;</style>
      <div
        className="fixed right-0 z-50 flex flex-row h-16 text-center text-white bg-blue-900 rounded-l-lg"
        style={{
          top: '50%',
        }}
        onClick={() => {
          toggleExpanded();
        }}
      >
        <AnimatePresence initial={true}>
          <Nub expanded={expanded} />
          {expanded && <Content key="content" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
