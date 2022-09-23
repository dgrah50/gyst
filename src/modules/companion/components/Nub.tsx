import React, { useCallback } from 'react';
import { ChevronLeft } from 'react-feather';
import { motion } from 'framer-motion';
import styles from './Nub.module.css';

export interface INubProps {
  expanded: boolean;
  toggleExpanded: () => void;
}

export default function Nub(props: INubProps): JSX.Element {
  const { expanded, toggleExpanded } = props;

  const handlePress = useCallback(
    () => {
      toggleExpanded();
    },
    [toggleExpanded],
  )

  return (
    <div className={styles.nubWrapper}>
      <div
        className={styles.nub}
        role="button"
        tabIndex={0}
        onClick={handlePress}
        onKeyDown={handlePress}>
        <motion.div
          variants={{
            rotate: {
              rotate: 180,
              transition: { duration: 0.1, delay: 0.1 },
            },
            stop: {
              rotate: 0,
              transition: { duration: 0.1, delay: 0.1 },
            },
          }}
          animate={expanded ? 'rotate' : 'stop'}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          id="ChevronWrapper">
          <ChevronLeft size={32} />
        </motion.div>
      </div>
    </div>
  );
}
