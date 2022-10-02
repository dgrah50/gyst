export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}

export function getUrlHost(url: URL): string {
  return url.hostname;
}

export function getCurrentHost(): string | null {
  try {
    const currentHost = new URL(window.location.href);

    return getUrlHost(currentHost);
  } catch (error) {
    return null;
  }

}

export const shouldBlockSite = (site: string, hostname: string): boolean => {
  // if google.com is blocked, meet.google.com includes .google.com --> meet.google.com is not blocked
  // conversely if meet.google.com is blocked, google.com does not include meet.google.com --> google.com is not blocked
  return ((!isSubdomainOfBlockedSite(hostname, site) && hostname.includes(site)) || hostname === site)
    && !isRedirectionSite()
}

export function isSubdomainOfBlockedSite(hostname: string, site: string): boolean {
  return (!hostname.includes(`.${site}`))
}

export function isRedirectionSite(): boolean {
  const REDIRECTION_SITES: string[] = ['facebook.com/flx', 'l.facebook.com'];

  return REDIRECTION_SITES.some((wrapper) => window.location.href.includes(wrapper));
}

export interface TabUrlAndId {
  url: URL;
  tabId: number;
}

export function getActiveTabURLAndID(): Promise<TabUrlAndId> {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const url = tabs[0].url;
      const id = tabs[0].id;

      if (url && id) {
        resolve({ url: new URL(url), tabId: id });
      }

      reject(new Error('Unable to retrieve URL and ID'));
    });
  });
}

