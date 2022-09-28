// types.ts defines interfaces for what valid storage looks like
// you shouldn't need to touch this unless you need to save something completely new to chrome storage!

// TODO: Consider making blockedSites the same type as whitelistedSites??
// This would add the ability to block for a given period of time
export interface Storage {
  isEnabled?: boolean;
  blockedSites?: string[];
  whitelistedSites?: { [key: string]: string };
  whitelistTime?: number;
}
