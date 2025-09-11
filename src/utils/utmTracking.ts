/**
 * UTM Tracking Utilities
 * Handles extraction and storage of UTM parameters for user registration tracking
 */

export interface UTMParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

const UTM_STORAGE_KEY = "nilgpt_utm_params";

/**
 * Extracts UTM parameters from the current URL
 */
export function extractUTMParameters(): UTMParameters {
  if (typeof window === "undefined") {
    return {};
  }

  const urlParams = new URLSearchParams(window.location.search);
  const utmParams: UTMParameters = {};

  // Standard UTM parameters
  const utmKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];

  utmKeys.forEach((key) => {
    const value = urlParams.get(key);
    if (value) {
      utmParams[key as keyof UTMParameters] = value;
    }
  });

  return utmParams;
}

/**
 * Stores UTM parameters in session storage
 */
export function storeUTMParameters(utmParams: UTMParameters): void {
  if (typeof window === "undefined") {
    return;
  }

  // Only store if there are actual UTM parameters
  const hasUTMParams = Object.values(utmParams).some(
    (value) => value !== undefined,
  );

  if (hasUTMParams) {
    try {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmParams));
    } catch (error) {
      console.warn("Failed to store UTM parameters in session storage:", error);
    }
  }
}

/**
 * Retrieves stored UTM parameters from session storage
 */
export function getStoredUTMParameters(): UTMParameters {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn(
      "Failed to retrieve UTM parameters from session storage:",
      error,
    );
  }

  return {};
}

/**
 * Clears stored UTM parameters from session storage
 */
export function clearStoredUTMParameters(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    sessionStorage.removeItem(UTM_STORAGE_KEY);
  } catch (error) {
    console.warn("Failed to clear UTM parameters from session storage:", error);
  }
}

/**
 * Captures and stores UTM parameters from the current URL
 * Call this on landing page load
 */
export function captureAndStoreUTMParameters(): UTMParameters {
  const utmParams = extractUTMParameters();
  storeUTMParameters(utmParams);
  return utmParams;
}

/**
 * Gets UTM parameters for user registration
 * First tries to get from current URL, then falls back to stored parameters
 * This handles the case where user comes from email confirmation with UTM params
 */
export function getUTMParametersForRegistration(): UTMParameters {
  // First, try to get UTM parameters from current URL (for email confirmation flow)
  const currentUrlParams = extractUTMParameters();

  // If we have UTM params in current URL, use those and store them
  if (Object.keys(currentUrlParams).length > 0) {
    storeUTMParameters(currentUrlParams);
    return currentUrlParams;
  }

  // Otherwise, fall back to stored parameters (for wallet signup flow)
  return getStoredUTMParameters();
}
