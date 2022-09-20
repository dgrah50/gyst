import { useState, useEffect } from 'react';
import { getStorage } from '../../../timetracker/storage';

interface StorageChange {
  blockedSites?: {
    newValue?: string[];
  },
  whitelistedSites?: {
    newValue?: Record<string, string[]>;
  }

}


export const useChromeStorageBlockedSitesSubscription = (): string[] => {
  const [blockedSites, setBlockedSites] = useState<string[]>([]);

  useEffect(() => {
    getStorage().then((storage) => {
      setBlockedSites(storage?.blockedSites ?? []);
    });
  }, []);



  useEffect(() => {
    const onChange = (storage: StorageChange) => {
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
    const onChange = (storage: StorageChange) => {
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
