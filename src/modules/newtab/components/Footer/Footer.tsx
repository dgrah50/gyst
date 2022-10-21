import React from 'react';

export default function Footer(): JSX.Element {
  return (
    <div className="items-start justify-start p-4 bg-black text-white/10 footer backdrop-blur">
      {`dgrah50 (GitHub) (${new Date().getFullYear()})`}
    </div>
  );
}
