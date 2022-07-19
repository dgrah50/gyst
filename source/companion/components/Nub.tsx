import * as React from 'react';
import { ChevronLeft } from 'react-feather';
import { motion } from 'framer-motion';

export interface INubProps {
  expanded: boolean;
}

export default function Nub(props: INubProps) {
  const { expanded } = props;
  return (
    <div className="flex content-center justify-center w-16 h-16 border-l-5">
      <motion.div
        variants={{
          rotate: {
            rotate: 180,
            transition: { duration: 0.2, delay: 0.2 },
          },
          stop: {
            rotate: 0,
            transition: { duration: 0.2, delay: 0.2 },
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
  );
}
