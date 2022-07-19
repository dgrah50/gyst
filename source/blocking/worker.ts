import { cleanDomain } from './util';
import { getStorage, setStorage, addToBlocked, addToWhitelist, removeFromBlocked } from './storage';
import { Intent } from './types';
import { setBadgeUpdate, cleanupBadge } from './badge';

function firstTimeSetup(): void {
  // defualt to on
  turnFilteringOn();

  // set whitelist
  const whitelist: { [key: string]: string } = {};
  const intentList: { [key: string]: Intent } = {};
  const blockedSites: string[] = ['facebook.com', 'twitter.com', 'instagram.com', 'youtube.com'];

  setStorage({
    whitelistedSites: whitelist,
    intentList,
    whitelistTime: 5,
    numIntentEntries: 20,
    predictionThreshold: 0.5,
    minIntentLength: 3,
    customMessage: '',
    enableBlobs: true,
    enable3D: true,
    blockedSites,
    isEnabled: true,
  }).then(() => {
    console.log('Default values have been set.');
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

    chrome.browserAction.setIcon({ path: 'res/off.png' }, () => {
      console.log('Filtering disabled');
    });
    reloadActive();
  });
}

function turnFilteringOn(): void {
  setStorage({ isEnabled: true }).then(() => {
    // start badge update counter
    setBadgeUpdate();

    chrome.browserAction.setIcon({ path: 'res/on.png' }, () => {
      console.log('Filtering enabled.');
    });
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
async function intentHandler(port: chrome.runtime.Port, msg: { intent: string }) {
  // extract intent and url from message
  const intent: string = msg.intent;

  // get whitelist period
  getStorage().then(async (storage) => {
    const WHITELIST_PERIOD: number = storage.whitelistTime ?? 0;
    const words: string[] = intent.split(' ');

    if (words.length <= (storage.minIntentLength ?? 3)) {
      // if too short, let content script know and early return
      port.postMessage({ status: 'too_short' });
      return;
    }

    // add whitelist period for site
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const urls: string[] = tabs.filter((x) => x.url !== undefined).map((x) => x.url as string);
      const domain: string = cleanDomain(urls);
      addToWhitelist(domain, WHITELIST_PERIOD);
    });

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
function blockFromPopupHandler(
  port: chrome.runtime.Port,
  msg: { siteURL: string; unblock: boolean },
) {
  const url: string = msg.siteURL;
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

export function startBlockingWorker() {
  console.log('Starting blocking worker');

  // On install script
  chrome.runtime.onInstalled.addListener((details) => {
    // on first time install
    if (details.reason === 'install') {
      firstTimeSetup();
    }

    // TODO:  set proper uninstall url
    chrome.runtime.setUninstallURL('https://dayangrah.am');
  });

  // TODO: figure out if this is needed

  // Catch menu clicks (page context and browser action context)
  // chrome.contextMenus.onClicked.addListener((info, tab) => {
  //   switch (info.menuItemId) {
  //     case 'baFilterListMenu':
  //       chrome.runtime.openOptionsPage();
  //       break;
  //     case 'baAddSiteToFilterList':
  //     case 'pgAddSiteToFilterList':
  //       chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //         const urls: string[] = tabs
  //           .filter((x) => x.url !== undefined)
  //           .map((x) => x.url as string);
  //         addToBlocked(urls[0]);
  //       });
  //       break;
  //     case 'baAddDomainToFilterList':
  //     case 'pgAddDomainToFilterList':
  //       chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //         const urls: string[] = tabs
  //           .filter((x) => x.url !== undefined)
  //           .map((x) => x.url as string);
  //         const domain: string = cleanDomain(urls);
  //         addToBlocked(domain);
  //       });
  //       break;
  //   }
  // });

  // Listen for new signals from non-background scripts
  chrome.runtime.onConnect.addListener((port) => {
    // check comm channel
    switch (port.name) {
      // listens for messages from content scripts
      case 'intentStatus': {
        port.onMessage.addListener((msg) => intentHandler(port, msg));
      }

      // listens for messages from popup
      case 'toggleState': {
        port.onMessage.addListener((msg) => toggleStateHandler(port, msg));
      }

      // listens for block from popup
      case 'blockFromPopup': {
        port.onMessage.addListener((msg) => blockFromPopupHandler(port, msg));
      }
    }
  });

  // On Chrome startup, setup extension icons
  chrome.runtime.onStartup.addListener(() => {
    getStorage().then((storage) => {
      let icon = 'res/icon.png';
      if (storage.isEnabled) {
        icon = 'res/on.png';
      } else if (!storage.isEnabled) {
        icon = 'res/off.png';
      }

      chrome.browserAction.setIcon({ path: { '16': icon } });
    });
  });
}
