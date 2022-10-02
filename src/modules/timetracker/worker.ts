import { getActiveTabURLAndID, getUrlHost, TabUrlAndId } from './util';
import {
  getStorage,
  setStorage,
  addUrlToBlocklist,
  addUrlToWhitelist,
  removeUrlFromBlocklist,
  removeUrlFromWhitelist,
} from './storage';
import { startBadgeUpdateTick, cleanupBadge } from './badge';

startBlockingWorker();

function firstTimeSetup(): void {
  const whitelist: { [key: string]: string } = {};
  const blockedSites: string[] = ['facebook.com', 'twitter.com', 'instagram.com', 'youtube.com'];
  const DEFAULT_WHITELIST_TIME = 5;

  setStorage({
    whitelistedSites: whitelist,
    whitelistTime: DEFAULT_WHITELIST_TIME,
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

    reloadActiveTab();
  });
}

function turnFilteringOn(): void {
  setStorage({ isEnabled: true }).then(() => {
    startBadgeUpdateTick();
    reloadActiveTab();
  });
}

/**
 * Get the current tab's URL, get the current tab's ID, get the current tab's host, if the current
 * tab's host is in the list of blocked sites, reload the current tab
 */
function reloadActiveTab(): void {
  getStorage().then((storage) => {
    getActiveTabURLAndID().then((tabUrlAndId: TabUrlAndId) => {
      const { url, tabId } = tabUrlAndId;
      const currentHost = getUrlHost(url);
      if (storage.blockedSites !== undefined && storage.blockedSites.includes(currentHost)) {
        chrome.tabs.reload(tabId);
      }
    }).catch((err) => {
      console.error(err);
    });
  });
}

async function whitelistHandler(port: chrome.runtime.Port, msg: { url: string; unblock: boolean }) {
  getStorage().then(async (storage) => {
    const WHITELIST_PERIOD: number = storage.whitelistTime ?? 0;

    if (msg.unblock) {
      removeUrlFromWhitelist(msg.url);
    } else {
      addUrlToWhitelist(msg.url, WHITELIST_PERIOD);
    }

    // send status to tab
    port.postMessage({ status: 'ok' });
    console.log(`Success! Redirecting`);
  });
}

/**
 * It turns filtering on or off depending on if the extension is set to enabled or not.
 * @param port - chrome.runtime.Port - This is the port that the message was sent on.
 * @param msg - { state: boolean }
 */
function toggleStateHandler(port: chrome.runtime.Port, msg: { state: boolean }) {
  const on: boolean = msg.state;
  if (on) {
    turnFilteringOn();
  } else if (on === false) {
    turnFilteringOff();
  }
}

/**
 * It receives a message from the popup, and if the message contains a URL and a boolean, it either
 * adds or removes the URL from the blocklist, and then reloads the active tab
 * @param port - chrome.runtime.Port - This is the port that the message was sent from.
 * @param msg - { url: string; unblock: boolean }
 */
function blockFromPopupHandler(port: chrome.runtime.Port, msg: { url: string; unblock: boolean }) {
  const url: string = msg.url;
  const unblock: boolean = msg.unblock;
  if (url !== undefined && url !== '' && unblock !== undefined) {
    if (unblock) {
      removeUrlFromBlocklist(url);
    } else if (!unblock) {
      addUrlToBlocklist(url);
    }
    reloadActiveTab();
  }
}

export function startBlockingWorker(): void {
  console.log('Starting blocking worker');

  chrome.runtime.onInstalled.addListener((details) => {
    // on first time install
    if (details.reason === 'install') {
      console.log('First time install');
      firstTimeSetup();
    }

    // TODO:  set proper uninstall url
    chrome.runtime.setUninstallURL('https://dayangrah.am');
  });

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
