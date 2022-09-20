import * as React from 'react';

export default function Footer(): JSX.Element {
  return (
    <div className="items-start justify-start p-4 text-white bg-black footer backdrop-blur">
      {`Made by dgrah50 on GitHub (${new Date().getFullYear()})`}
    </div>
  );
}
