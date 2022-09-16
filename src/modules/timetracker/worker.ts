import { cleanDomain } from './util';
import {
  getStorage,
  setStorage,
  addToBlocked,
  addToWhitelist,
  removeFromBlocked,
  removeFromWhitelist,
} from './storage';
import { setBadgeUpdate, cleanupBadge } from './badge';

startBlockingWorker();

function firstTimeSetup(): void {
  // set whitelist
  const whitelist: { [key: string]: string } = {};
  const blockedSites: string[] = ['facebook.com', 'twitter.com', 'instagram.com', 'youtube.com'];

  setStorage({
    whitelistedSites: whitelist,
    whitelistTime: 5,
    blockedSites,
  }).then(() => {
    console.log('Default values have been set.');
    // default to on
    turnFilteringOn();
  });

  // set default badge background colour
  chrome.browserAction.setBadgeBackgroundColor({
    color: '#576ca8',
  });
}

function turnFilteringOff(): void {
  setStorage({ isEnabled: false }).then(() => {
    // stop checking for badge updates
    cleanupBadge();

    reloadActive();
  });
}

function turnFilteringOn(): void {
  setStorage({ isEnabled: true }).then(() => {
    // start badge update counter
    setBadgeUpdate();
    reloadActive();
  });
}

// reloads tab that is currently in focus
function reloadActive(): void {
  getStorage().then((storage) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentUrl = cleanDomain(tabs.map((tab) => tab.url));
      if (storage.blockedSites !== undefined && storage.blockedSites.includes(currentUrl)) {
        const tabId = tabs[0].id;
        if (tabId) {
          chrome.tabs.reload(tabId);
        }
      }
    });
  });
}

// handle content script intent submission
async function whitelistHandler(port: chrome.runtime.Port, msg: { url: string; unblock: boolean }) {
  // get whitelist period
  getStorage().then(async (storage) => {
    const WHITELIST_PERIOD: number = storage.whitelistTime ?? 0;

    if (msg.unblock) {
      removeFromWhitelist(msg.url);
    } else {
      addToWhitelist(msg.url, WHITELIST_PERIOD);
    }

    // send status to tab
    port.postMessage({ status: 'ok' });
    console.log(`Success! Redirecting`);
  });
}

// handle user toggling extension on/off
function toggleStateHandler(port: chrome.runtime.Port, msg: { state: boolean }) {
  const on: boolean = msg.state;
  if (on) {
    turnFilteringOn();
  } else if (on === false) {
    turnFilteringOff();
  }
}

// handle user blocking current site from popup
function blockFromPopupHandler(port: chrome.runtime.Port, msg: { url: string; unblock: boolean }) {
  const url: string = msg.url;
  const unblock: boolean = msg.unblock;
  if (url !== undefined && url !== '' && unblock !== undefined) {
    if (unblock) {
      removeFromBlocked(url);
    } else if (!unblock) {
      addToBlocked(url);
    }
    reloadActive();
  }
}

export function startBlockingWorker(): void {
  console.log('Starting blocking worker');
  // On install script
  chrome.runtime.onInstalled.addListener((details) => {
    // on first time install
    if (details.reason === 'install') {
      console.log('First time install');
      firstTimeSetup();
    }

    // TODO:  set proper uninstall url
    chrome.runtime.setUninstallURL('https://dayangrah.am');
  });

  console.log('%cworker.ts line:122 chrome.runtime.id', 'color: #007acc;', chrome.runtime.id);
  // Listen for new signals from non-background scripts
  chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener((msg) => {
      switch (msg.action) {
        case 'whitelistSite': {
          whitelistHandler(port, msg);
          break;
        }

        case 'toggleState': {
          toggleStateHandler(port, msg);
          break;
        }

        case 'blockFromPopup': {
          blockFromPopupHandler(port, msg);
          break;
        }

        default:
          null;
      }
    });
  });
}
