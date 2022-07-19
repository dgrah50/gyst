import React from 'react';
import ReactDOM from 'react-dom';
import { checkIfBlocked } from '../blocking';
import Companion from '../companion';

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
    ReactDOM.render(<Companion />, companionWrapper);
  }
}

// As soon as page loads, check if blocked
checkIfBlocked();
