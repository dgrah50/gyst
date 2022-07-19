import * as React from 'react';

export default function Footer(): JSX.Element {
  return (
    <div className="border border-white footer backdrop-blur">
      {`Made by dgrah50 on GitHub ${new Date().getFullYear()}`}
    </div>
  );
}
