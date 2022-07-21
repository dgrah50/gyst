import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import Newtab from './Newtab';

const container = document.getElementById('app-container');
if (container) {
  const root = ReactDOMClient.createRoot(container);
  root.render(<Newtab />);
}
