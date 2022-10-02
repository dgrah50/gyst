import {
  getStorage,
} from './storage';
import { getCurrentHost, shouldBlockSite } from './util';

export function checkIfCurrentPageIsBlocked(): void {
  getStorage().then((storage) => {
    const currentHost = getCurrentHost();
    if (currentHost == null) return;

    const blockedSites = storage.blockedSites ?? [];
    blockedSites.forEach((site: string) => {

      if (shouldBlockSite(site, currentHost)) {
        renderBlockPageUnlessWhitelisted();
      }
    });
  });
}

function renderBlockPageUnlessWhitelisted(): void {

  getStorage().then((storage) => {
    const currentUrl = getCurrentHost();
    if (currentUrl == null) return;

    const whitelist: { [key: string]: string } = storage.whitelistedSites ?? {};

    if (!whitelist.hasOwnProperty(currentUrl)) {
      renderBlockPage();

      return;
    }

    const parsedDate: Date = new Date(whitelist[currentUrl]);
    const currentDate: Date = new Date();
    const isWhitelistExpired: boolean = currentDate >= parsedDate;
    if (isWhitelistExpired) {
      renderBlockPage();

      return;
    }

    const timeDifference: number = parsedDate.getTime() - currentDate.getTime();
    setTimeout(() => {
      renderBlockPage();
    }, timeDifference);
  });
}

// TODO: Actually render a block page
function renderBlockPage(): void {
  document.body.innerHTML = 'blocked';
  // window.location.href = "https://dayangrah.am";
}