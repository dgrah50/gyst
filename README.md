# 🚀 Gyst - Personal Life Dashboard

Proposed features:

- Hierarchical goal tracking
- Todoist integration for daily goals
- Journaling and tagging of journal entries with goals, with day ratings and streaks.
- Time tracking of websites and time rationales with tagged goals
- Progress bar on new page similar to [Eternity App](https://chrome.google.com/webstore/detail/progress-dashboard/hmejblemllciaklhffpinjgkbngcoopb)
- Brain dump section?
- TIL?
- Reading list?

## Dev

### Running Instructions

Then run the following:

- `yarn install` to install dependencies.
- `yarn run dev` to start the development server
- `yarn run build` builds and packs extensions all at once to extension/ directory

### Development

- `yarn install` to install dependencies.
- To watch file changes in development

  - Chrome
    - `yarn run dev`

- **Load extension in browser**

- ### Chrome

  - Go to the browser address bar and type `chrome://extensions`
  - Check the `Developer Mode` button to enable it.
  - Click on the `Load Unpacked Extension…` button.
  - Select your browsers folder in `extension/`.

- ### Firefox

  - Load the Add-on via `about:debugging` as temporary Add-on.
  - Choose the `manifest.json` file in the extracted directory

- ### Opera

  - Load the extension via `opera:extensions`
  - Check the `Developer Mode` and load as unpacked from extension’s extracted directory.

### Production

- `yarn run build`
