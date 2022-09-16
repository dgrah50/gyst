let instantiated = false;
const port = chrome.runtime.connect();

class ChromePort {
  constructor() {
    /* Checking if the instance is already created. */
    if (instantiated) {
      throw new Error('You can only create one instance!');
    }
    instantiated = true;
  }

  getPort() {
    return port;
  }
}

const SingleChromePort = Object.freeze(new ChromePort());
export default SingleChromePort;
