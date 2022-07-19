import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { browser } from 'webextension-polyfill-ts';

import '../styles/base.scss';
import Nub from './components/Nub';
import Content from './components/Content';

export default function Companion(): React.ReactElement {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((expanded) => !expanded);
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-end w-screen h-screen pointer-events-none ">
      <style>@import &quot;{browser.runtime.getURL('css/companion.css')}&quot;;</style>
      <div className="right-0 flex flex-row items-center text-center text-white rounded-l-lg pointer-events-auto top-1/2">
        <AnimatePresence initial>
          <Nub expanded={expanded} toggleExpanded={toggleExpanded} />
          {expanded && <Content key="content" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
