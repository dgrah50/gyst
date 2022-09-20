// badge.ts is a module responsible for controlling the badge that displays whitelist time left
import { cleanDomain } from './util';
import { getStorage } from './storage';

// let badgeUpdateCounter: number = window.setInterval(badgeCountDown, 1000);

export function setBadgeUpdate(): void {
  // badgeUpdateCounter = window.setInterval(badgeCountDown, 1000);
}

export function cleanupBadge(): void {
  // window.clearInterval(badgeUpdateCounter);
  chrome.browserAction.setBadgeText({
    text: '',
  });
}

export function badgeCountDown(): void {
  // get current active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const urls: string[] = tabs.filter((x) => x.url !== undefined).map((x) => x.url as string);
    const domain: string = cleanDomain(urls);

    if (domain === '') {
      cleanupBadge();
      
return;
    }

    // get whitelisted sites
    getStorage().then((storage) => {
      if (
        storage.whitelistedSites !== undefined &&
        storage.whitelistedSites.hasOwnProperty(domain)
      ) {
        const expiry: Date = new Date(storage.whitelistedSites[domain]);
        const currentDate: Date = new Date();
        const timeDifference: number = expiry.getTime() - currentDate.getTime();

        setBadge(timeDifference);
      } else {
        cleanupBadge();
      }
    });
  });
}

function setBadge(time: number) {
  const roundedTime = Math.round(time / 1000);
  if (roundedTime <= 0) {
    cleanupBadge();
  } else if (roundedTime > 60) {
    const min: number = Math.round(roundedTime / 60);
    chrome.browserAction.setBadgeText({
      text: `${min.toString()}m`,
    });
  } else {
    chrome.browserAction.setBadgeText({
      text: `${roundedTime.toString()}s`,
    });
  }
}
