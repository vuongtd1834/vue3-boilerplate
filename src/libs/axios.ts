import type { AxiosError, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

import { getAccessToken, getRefreshToken, useUserStore } from "@/stores/user";
import type { IAuthLoginResponse } from "@/types/auth";

// Feature flags configuration
const FEATURE_FLAGS = {
  ENABLE_REFRESH_TOKEN: true,
};

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshTokenPromise: Promise<string> | false = false;

const baseConfig: CreateAxiosDefaults = {
  baseURL: `${import.meta.env.VITE_API_URL}`,
};

export const instanceWithoutInterceptors = axios.create(baseConfig);

export const instance = axios.create(baseConfig);

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();
    if (accessToken && config && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // Only handle refresh token logic if feature flag is enabled
    if (!FEATURE_FLAGS.ENABLE_REFRESH_TOKEN) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as CustomAxiosRequestConfig | undefined;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshTokenPromise) {
        // Start a new refresh token request
        const refreshToken = getRefreshToken();

        if (refreshToken) {
          refreshTokenPromise = instanceWithoutInterceptors
            .post<IAuthLoginResponse>("/api/auth/refreshToken", {
              refreshToken,
            })
            .then((response: AxiosResponse<IAuthLoginResponse>) => {
              const store = useUserStore();
              store.setCredentials(response.data);
              return response.data.token?.value;
            })
            .catch((err: unknown) => {
              const store = useUserStore();
              store.removeCredentials();
              return Promise.reject(err);
            })
            .finally(() => {
              refreshTokenPromise = false; // Reset after completion
            });
        } else {
          const store = useUserStore();
          store.removeCredentials();
          return Promise.reject(error);
        }
      }

      // Wait for the refresh token request to complete
      const accessToken = await refreshTokenPromise;
      if (originalRequest && originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      }

      return instance(originalRequest);
    }

    return Promise.reject(error);
  }
);
