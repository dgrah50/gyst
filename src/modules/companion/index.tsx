import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { fromUrl, parseDomain, ParseResultType } from "parse-domain";
import Companion from './Companion';


// Add a container for the Gyst Companion to the body of whatever page the user is on.
const appContainer = document.createElement('gyst-companion-app');
appContainer.style.position = 'sticky';
appContainer.style.zIndex = '999999';
document.body.appendChild(appContainer);

const gca = document.querySelector<HTMLElement>('gyst-companion-app') as HTMLElement | null;
const port = chrome.runtime.connect();
console.log(port)

let interval: number | null = null;
let timeSpent = 0;

const getDomain = (url: string): string => {
  let parseResult = parseDomain(url);
  if (parseResult.type === 'INVALID') {
    parseResult = parseDomain(fromUrl(url))
  }

  if (parseResult.type === ParseResultType.Listed) {
    return `${parseResult.domain}.${parseResult.topLevelDomains.join('.')}`;
  }

  return ''
}

const currentHost = getDomain(window.location.hostname);

if (document.hasFocus()) {
  console.log('document has focus')
  interval = window.setInterval(() => {
    console.log('hello from starter', currentHost)
    timeSpent += 1000;
    console.log(timeSpent)
    port.postMessage({ action: 'incrementTime', url: currentHost });
  }, 1000)
}


document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'visible') {
    console.log('is entering focus')
    interval = window.setInterval(() => {
      console.log('hello', currentHost)
      port.postMessage({ action: 'incrementTime', url: currentHost });
      timeSpent += 1000;
      console.log(timeSpent)
    }, 1000)
  } else {
    console.log('is leaving focus')
    if (interval) {
      clearInterval(interval)
    }
  }
})

if (gca !== null) {
  const root = ReactDOMClient.createRoot(gca);
  root.render(<Companion />);
}
