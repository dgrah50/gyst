import { useEffect, useState } from "react";
import { getStorage } from "../../../../../timetracker/storage";

// TODO: Properly type this
interface StorageChange {
  timeSpent?: {
    newValue?: string[];
  },
}

/**
 * It returns an array of sites that the user has chosen to block,
 *  and it updates the array whenever the chrome storage changes
 * @returns a string array of blocked sites
 */
export const useTimeSpentSubscription = () => {
  const [timeSpent, setTimeSpent] = useState({});

  useEffect(() => {
    getStorage().then((storage) => {
      setTimeSpent(storage?.timeSpent ?? []);
    });
  }, [timeSpent]);

  useEffect(() => {
    const onChange = (storage: StorageChange) => {
      if (storage?.timeSpent?.newValue) {
        setTimeSpent(storage.timeSpent.newValue);
      }
    }
    chrome.storage.onChanged.addListener(onChange);

    return () => {
      chrome.storage.onChanged.removeListener(onChange);
    }
  }, [])

  return timeSpent;
};