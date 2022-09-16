import { useState, useEffect } from 'react';
import { getStorage } from '../../modules/timetracker/storage';

export const useChromeStorageBlockedSitesSubscription = (): string[] => {
  const [blockedSites, setBlockedSites] = useState<string[]>([]);

  useEffect(() => {
    getStorage().then((storage) => {
      setBlockedSites(storage?.blockedSites ?? []);
    });
  }, []);



  useEffect(() => {
    // TODO: Remove any
    const onChange = (storage: any) => {
      console.log('storage changed, listener triggered ', storage);
      if (storage?.blockedSites?.newValue) {
        setBlockedSites(storage.blockedSites.newValue);
      }
    }
    chrome.storage.onChanged.addListener(onChange);

    return () => {
      chrome.storage.onChanged.removeListener(onChange);
    }
  }, [])


  return blockedSites;
};

export const useChromeStorageWhitelistedSitesSubscription = (): string[] => {
  const [whitelistedSites, setWhitelistedSites] = useState<string[]>([]);

  useEffect(() => {
    getStorage().then((storage) => {
      setWhitelistedSites(storage?.whitelistedSites ? Object.keys(storage.whitelistedSites) : []);
    });
  }, []);


  useEffect(() => {
    // TODO: Remove any
    const onChange = (storage: any) => {
      if (storage?.whitelistedSites?.newValue) {
        setWhitelistedSites(Object.keys(storage.whitelistedSites.newValue));
      }
    }
    chrome.storage.onChanged.addListener(onChange);

    return () => {
      chrome.storage.onChanged.removeListener(onChange);
    }
  }, [])

  return whitelistedSites;
};
