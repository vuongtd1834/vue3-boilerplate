// Cookie storage adapter for Pinia persistence
// Compatible with pinia-plugin-persistedstate

interface StorageLike {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

/**
 * Cookie storage adapter that mimics localStorage API
 * for use with pinia-plugin-persistedstate
 */
export const cookieStorage: StorageLike = {
  getItem(key: string): string | null {
    if (typeof document === "undefined") {
      return null;
    }

    const name = `${key}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie?.charAt(0) === " ") {
        cookie = cookie?.substring(1);
      }
      if (cookie?.indexOf(name) === 0) {
        return cookie?.substring(name.length, cookie?.length);
      }
    }

    return null;
  },

  setItem(key: string, value: string): void {
    if (typeof document === "undefined") {
      return;
    }

    // Set cookie with 1 year expiration
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);

    document.cookie = `${key}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  },

  removeItem(key: string): void {
    if (typeof document === "undefined") {
      return;
    }

    document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  },
};
