// storage.ts provides a thin wrapper around the chrome storage api to make it easier to read/write from it
// you can also find helper functions that read/write to chrome storage

import { Storage } from './types';
import { addMinutes } from './util';

// helper function to retrive chrome storage object
export function getStorage(): Promise<Storage> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(null, (storage) => {
      console.log('%cstorage.ts line:16 storage', 'color: #007acc;', storage);
      if (chrome.runtime.lastError !== undefined) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(storage);
      }
    });
  });
}

// helper function to set fields in chrome storage
// usage:
//
// getStorage({enableBlobs: false}).then(storage => {
//     ...
// })
export function setStorage(key: Storage): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(key, () => {
      if (chrome.runtime.lastError !== undefined) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
}

// Add a single url to blocklist (does nothing if url is already in list)
export function addToBlocked(url: string, callback?: () => any): void {
  getStorage().then((storage) => {
    // url = cleanDomain([url]) === '' ? url : cleanDomain([url])
    if (storage.blockedSites === undefined) {
      console.error('storage.ts: addToBlocked: storage.blockedSites is undefined');
      storage.blockedSites = [];
    }
    if (!storage.blockedSites.includes(url)) {
      storage.blockedSites.push(url);
      setStorage({ blockedSites: storage.blockedSites }).then(() => {
        console.log(`${url} added to blocked sites`);
        callback ? callback() : () => {};
      });
    }
  });
}

// Remove single url from blocklist (does nothing if url is not in list)
export function removeFromBlocked(url: string): void {
  getStorage().then((storage) => {
    let blockedSites: string[] | undefined = storage.blockedSites;
    if (blockedSites === undefined) {
      console.error('storage.ts: removeFromBlocked: storage.blockedSites is undefined');
    } else {
      blockedSites = blockedSites.filter((e) => e !== url);
      setStorage({ blockedSites }).then(() => {
        console.log(`removed ${url} from blocked sites`);
      });
    }
  });
}

// Add a single url to whitelist with associated whitelist duration
// (replaces any existing entries)
export function addToWhitelist(url: string, minutes: number): void {
  getStorage().then((storage) => {
    const whitelistedSites: { [key: string]: string } | undefined = storage.whitelistedSites;
    const expiry: Date = addMinutes(new Date(), minutes);

    if (whitelistedSites === undefined) {
      console.error('storage.ts: addToWhitelist: storage.whitelistedSites is undefined');
    } else {
      whitelistedSites[url] = expiry.toJSON();
      setStorage({ whitelistedSites }).then(() => {
        console.log(`${url} added to whitelisted sites`);
      });
    }
  });
}
