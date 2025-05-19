import { treaty } from "@elysiajs/eden";
import type { App } from "@repo/api";
import { useAuth } from "@clerk/react-router";

// Base URL for API requests
const API_BASE_URL = "http://localhost:3500";

// Create a non-authenticated client for public endpoints
export const eden = treaty<App>(API_BASE_URL, {
  keepDomain: !!import.meta.env.PROD,
});

/**
 * Custom hook to get an authenticated API client
 * @returns A function that returns a Promise resolving to the authenticated API client
 */
export const useEden = () => {
  // Get the auth session
  const auth = useAuth();

  // Return a function that creates an authenticated API client
  return treaty<App>(API_BASE_URL, {
    keepDomain: !!import.meta.env.PROD,
    onRequest: async (_, options) => {
      options.headers = {
        Authorization: `Bearer ${await auth.getToken()}`,
        ...(options.headers as Record<string, string>),
      };
    },
  });
};

export type EdenType = typeof eden;