import { defineStore } from "pinia";

import type { IAuthLoginResponse } from "@/types/auth";
import type { IUserItem } from "@/types/user";
import { cookieStorage } from "@/utils/storage";

interface UserState {
  credentials: Partial<IAuthLoginResponse> | null;
  userDetail: IUserItem | null;
  hasHydrated: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    credentials: null,
    userDetail: null,
    hasHydrated: false,
  }),

  actions: {
    setCredentials(credentials: IAuthLoginResponse) {
      this.credentials = credentials;
    },

    removeCredentials() {
      this.credentials = null;
    },

    setUserDetail(userDetail: IUserItem) {
      this.userDetail = userDetail;
    },

    removeUserDetail() {
      this.userDetail = null;
    },

    setHasHydrated(state: boolean) {
      this.hasHydrated = state;
    },
  },

  persist: {
    key: "credentials",
    storage: cookieStorage,
    afterHydrate: (context) => {
      context.store.setHasHydrated(true);
    },
  },
});

/**
 * use outside component
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!useUserStore().credentials?.token;
};

/**
 * use outside component
 * @returns {string}
 */
export const getAccessToken = () => {
  return useUserStore().credentials?.token?.value;
};

/**
 * use outside component
 * @returns {string}
 */
export const getRefreshToken = () => {
  return useUserStore().credentials?.refreshToken?.value;
};

/**
 * use outside component
 * @returns {string}
 */
export const getTenantId = () => {
  return useUserStore().credentials?.tenantCode;
};

/**
 * use outside component
 * @returns {boolean}
 */
export const isAdmin = (): boolean => {
  if (import.meta.env.MODE === "development") {
    return true;
  }
  return !!useUserStore().credentials?.roles?.some(
    (role) => role.name === "ADMIN"
  );
};
