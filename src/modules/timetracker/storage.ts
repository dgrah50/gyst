
import { addMinutes, getUrlHost } from './util';


export interface Storage {
  isEnabled?: boolean;
  blockedSites?: string[];
  whitelistedSites?: { [key: string]: string };
  whitelistTime?: number;
}

export function getStorage(): Promise<Storage> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(null, (storage) => {
      if (chrome.runtime.lastError !== undefined) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(storage);
      }
    });
  });
}

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

export function addUrlToBlocklist(url: string): void {
  getStorage().then((storage) => {
    const cleanedUrl = url.includes('http') ? getUrlHost(new URL(url)) : url

    if (storage.blockedSites === undefined) {
      console.error('storage.ts: addToBlocked: storage.blockedSites is undefined');
      storage.blockedSites = [];
    }
    if (!storage.blockedSites.includes(cleanedUrl)) {
      storage.blockedSites.push(cleanedUrl);
      setStorage({ blockedSites: storage.blockedSites }).then(() => {
        console.log(`${cleanedUrl} added to blocked sites`);
      });
    }
  });
}

export function removeUrlFromBlocklist(url: string): void {
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


export function addUrlToWhitelist(url: string, minutes: number): void {
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

export function removeUrlFromWhitelist(url: string): void {
  getStorage().then((storage) => {
    const whitelistedSites: { [key: string]: string } | undefined = storage.whitelistedSites;

    if (whitelistedSites === undefined) {
      console.error('storage.ts: addToWhitelist: storage.whitelistedSites is undefined');
    } else {
      delete whitelistedSites[url];
      setStorage({ whitelistedSites }).then(() => {
        console.log(`removed ${url} from whitelisted sites`);
      });
    }
  });
}
