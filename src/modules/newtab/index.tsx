import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import App from './app';

const container = document.getElementById('app-container');
if (container) {
  const root = ReactDOMClient.createRoot(container);
  root.render(<App />);
}
