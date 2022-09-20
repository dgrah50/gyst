import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Nub from './components/Nub';
import Content from './components/Content';

import styles from './companion.module.css';

export default function Companion(): React.ReactElement {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((expanded) => !expanded);
  };

  return (
    <div className={styles.nubWrapper}>
      <div className={styles.nub}>
        <AnimatePresence initial>
          <Nub
            expanded={expanded}
            toggleExpanded={toggleExpanded} />
          {expanded && <Content key="content" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
