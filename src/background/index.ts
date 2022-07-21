import { browser } from 'webextension-polyfill-ts';
import { startBlockingWorker } from '../timetracker/worker';

startBlockingWorker();

browser.browserAction.onClicked.addListener(() => {
  const url = browser.extension.getURL('index.html?source=button');
  browser.tabs.create({ url, active: true });
});
