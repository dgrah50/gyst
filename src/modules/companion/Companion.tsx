/* eslint-disable import/no-duplicates */
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// import { browser } from 'webextension-polyfill-ts';

import styles from './Companion.module.css';
import './Companion.module.css';

import Nub from './components/Nub';
import Content from './components/Content';

export default function Companion(): React.ReactElement {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((expanded) => !expanded);
  };

  // console.log(styles);
  return (
    <div className={styles.nubWrapper}>
      <div className={styles.nub}>
        <AnimatePresence initial>
          <Nub expanded={expanded} toggleExpanded={toggleExpanded} />
          {expanded && <Content key="content" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
