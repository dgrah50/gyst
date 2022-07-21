import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import Companion from './Companion';

// Add a container for the Gyst Companion to the body of whatever page the user is on.
const appContainer = document.createElement('gyst-companion-app');
appContainer.style.position = 'absolute';
document.body.appendChild(appContainer);

const gca = document.querySelector<HTMLElement>('gyst-companion-app') as HTMLElement | null;

if (gca !== null) {
  // Create Shadow DOM
  const shadow = gca.attachShadow({ mode: 'open' });

  const wrapper = document.createElement('div');
  wrapper.id = 'gyst-companion-wrapper';
  shadow.appendChild(wrapper);

  if (gca.shadowRoot) {
    const companionWrapper = gca.shadowRoot.querySelector('#gyst-companion-wrapper');
    if (companionWrapper) {
      const root = ReactDOMClient.createRoot(companionWrapper);
      root.render(<Companion />);
    }
  }
}
