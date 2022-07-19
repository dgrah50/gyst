import * as React from 'react';

export default function Footer() {
  return (
    <div className="border border-white footer backdrop-blur">
      {`Made by dgrah50 on GitHub ${new Date().getFullYear()}`}
    </div>
  );
}
