import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import Companion from './Companion';

// Add a container for the Gyst Companion to the body of whatever page the user is on.
const appContainer = document.createElement('gyst-companion-app');
appContainer.style.position = 'absolute';
document.body.appendChild(appContainer);

const gca = document.querySelector<HTMLElement>('gyst-companion-app') as HTMLElement | null;

if (gca !== null) {
  const root = ReactDOMClient.createRoot(gca);
  root.render(<Companion />);
}
