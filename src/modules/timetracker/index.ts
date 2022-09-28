// TODO: Consider the folder structure in this module and making index.ts a thinner entry point
import {
  getStorage,
} from './storage';
import { cleanDomain } from './util';

// re-check page everytime this page gets focus again
window.addEventListener('focus', checkIfBlocked);

// check to see if the current website needs to be blocked
export function checkIfBlocked(): void {
  console.log('Checking if blocked');
  getStorage().then((storage) => {
    const strippedURL: string = getStrippedUrl();
    const exactURL: string = cleanDomain([window.location.href], true);

    // match current url against stored blocklist
    const blockedSites = storage.blockedSites ?? [];
    blockedSites.forEach((site: string) => {
      // if google.com is blocked, meet.google.com includes .google.com --> meet.google.com is not blocked
      // conversely if meet.google.com is blocked, google.com does not include meet.google.com --> google.com is not blocked
      if (
        ((!strippedURL.includes(`.${site}`) && strippedURL.includes(site)) || exactURL === site) &&
        !isWhitelistedWrapper()
      ) {
        // found a match, check if currently on whitelist
        // TODO: Remove these console logs?
        console.log(`blocked - ${strippedURL} now render block page`);
        iterWhitelist();
      } else {
        console.log(`not blocked - ${strippedURL}`);
      }
    });
    console.log('end of checkIfBlocked');
  });
}

// TODO: Consider moving this to util.ts?
// check to see if domain is whitelisted
function isWhitelistedWrapper(): boolean {
  const WHITELISTED_WRAPPERS: string[] = ['facebook.com/flx', 'l.facebook.com'];

  return WHITELISTED_WRAPPERS.some((wrapper) => window.location.href.includes(wrapper));
}

// TODO: Consider moving this to util.ts?
// thin wrapper around util.ts/cleanDomain
function getStrippedUrl(): string {
  return cleanDomain([window.location.href]);
}

function iterWhitelist(): void {
  // iterate whitelisted sites
  getStorage().then((storage) => {
    const strippedURL: string = getStrippedUrl();
    if (strippedURL === '') {
      return;
    }

    // get dictionary of whitelisted sites
    const whitelist: { [key: string]: string } = storage.whitelistedSites ?? {};

    // is current url whitelisted?
    if (!whitelist.hasOwnProperty(strippedURL)) {
      loadBlockPage();

      return;
    }

    // check if whitelist period is expired
    const parsedDate: Date = new Date(whitelist[strippedURL]);
    const currentDate: Date = new Date();
    const expired: boolean = currentDate >= parsedDate;
    if (expired) {
      loadBlockPage();

      return;
    }

    const timeDifference: number = parsedDate.getTime() - currentDate.getTime();
    // set timer to re-block page after whitelist period expires
    setTimeout(() => {
      loadBlockPage();
    }, timeDifference);
  });
}

// replace current page with reflect block page
function loadBlockPage(): void {
  const strippedURL: string = getStrippedUrl();

  // TODO: Consider wrapping this storage in a class?
  getStorage().then((storage) => {
    console.log('%cindex.ts line:87 storage', 'color: #007acc;', storage);
    console.log(`blocked - ${strippedURL} now render block page`);
  });
}

checkIfBlocked();
