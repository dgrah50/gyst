import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import Newtab from './Newtab';

const container = document.getElementById('newtab-root');
if (container) {
  const root = ReactDOMClient.createRoot(container);
  root.render(<Newtab />);
}
