import * as React from 'react';
import { ChevronLeft } from 'react-feather';
import { motion } from 'framer-motion';

export interface INubProps {
  expanded: boolean;
  toggleExpanded: () => void;
}

export default function Nub(props: INubProps) {
  const { expanded, toggleExpanded } = props;
  return (
    <div className="flex h-64 align-top">
      <div
        className="flex content-center justify-center w-16 h-16 bg-green-900 rounded-l-lg"
        onClick={() => {
          toggleExpanded();
        }}
      >
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
          id="ChevronWrapper"
        >
          <ChevronLeft size={32} />
        </motion.div>
      </div>
    </div>
  );
}
