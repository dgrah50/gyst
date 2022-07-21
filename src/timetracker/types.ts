// types.ts defines interfaces for what valid storage looks like
// you shouldn't need to touch this unless you need to save something completely new to chrome storage!

export interface Storage {
  isEnabled?: boolean;
  // lists
  blockedSites?: string[];
  whitelistedSites?: { [key: string]: string };

  // misc config
  whitelistTime?: number;
}
