import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import styles from './Content.module.css';

export default function Content(): JSX.Element {
  const [currentURL, setCurrentURL] = useState<string>();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setCurrentURL(window.location.hostname);
  }, []);

  const tick = () => {
    setTime(new Date());
  };
  useEffect(() => {
    setInterval(tick, 1000);
  }, []);

  return (
    <motion.div
      className={styles.contentWrapper}
      key="content"
      initial="collapsed"
      animate="open"
      exit="collapsed"
      variants={
        {
          // open: { opacity: 1 },
          // collapsed: { opacity: 0 },
        }
      }
      transition={{ duration: 0.2 }}>
      <motion.div
        style={{ fontSize: '16px' }}
        initial="collapsed"
        animate="open"
        exit="collapsed"
        variants={{
          open: {
            opacity: 1,
            translateX: 0,
            width: '250px',
            // margin: 10,
          },
          collapsed: {
            opacity: 0,
            translateX: '100%',
            width: 1,
            // margin: 0,
          },
        }}
        transition={{ duration: 0.2, delay: 0.1 }}>
        <motion.div
          style={{}}
          transition={{ duration: 0.2, delay: 0.1 }}>
          {currentURL}
          <br />
          {time.toLocaleTimeString()}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
