import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface IContentProps {}

export default function Content(props: IContentProps) {
  const [currentURL, setCurrentURL] = useState<string>();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setCurrentURL(window.location.hostname);
  }, [window.location.href]);

  const tick = () => {
    setTime(new Date());
  };
  useEffect(() => {
    setInterval(tick, 1000);
  }, []);

  return (
    <motion.div
      className="flex items-center justify-center h-16 text-white bg-secondary-900"
      key="content"
      initial="collapsed"
      animate="open"
      exit="collapsed"
      variants={{
        open: { opacity: 1 },
        collapsed: { opacity: 0 },
      }}
      transition={{ duration: 0.4 }}
    >
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
            width: 0,
            // margin: 0,
          },
        }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <motion.div style={{ padding: 10 }} transition={{ duration: 0.4, delay: 0.2 }}>
          <p>{currentURL}</p>
          <p>{time.toLocaleTimeString()}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
