// badge.ts is a module responsible for controlling the badge that displays whitelist time left
// TODO: Reimplement this badge functionality
import { getActiveTabURLAndID, getUrlHost, TabUrlAndId } from './util';
import { getStorage } from './storage';

// TODO: reimplement this with chrome.alarms
// let badgeUpdateCounter: number = window.setInterval(badgeCountDown, 1000);

export function startBadgeUpdateTick(): void {
  // badgeUpdateCounter = window.setInterval(badgeCountDown, 1000);
}

export function cleanupBadge(): void {
  // window.clearInterval(badgeUpdateCounter);
  chrome.browserAction.setBadgeText({
    text: '',
  });
}

export function badgeCountDown(): void {
  getActiveTabURLAndID().then((TabUrlAndId: TabUrlAndId) => {
    const { url } = TabUrlAndId;

    const domain = getUrlHost(url);
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
  }).catch((error) => {
    console.log(error);
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
