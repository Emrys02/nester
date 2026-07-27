/**
 * Canonical client-side token storage. This is the single place that reads
 * or writes auth tokens in localStorage — every API module should import
 * from here instead of touching localStorage directly.
 *
 * Historically the access token was written under "nester_auth_token" (by
 * auth-provider.tsx) while most API modules read from "nester_token" — a key
 * nothing ever wrote — so outgoing requests never actually carried a real
 * Authorization header. Consolidating on one module fixes that for good.
 */

const ACCESS_TOKEN_KEY = "nester_auth_token";
const REFRESH_TOKEN_KEY = "nester_refresh_token";
const USER_ID_KEY = "nester_user_id";
const DEVICE_FINGERPRINT_KEY = "nester_device_fingerprint";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getAccessToken(): string {
  if (!isBrowser()) return "";
  return window.localStorage.getItem(ACCESS_TOKEN_KEY) ?? "";
}

export function getRefreshToken(): string {
  if (!isBrowser()) return "";
  return window.localStorage.getItem(REFRESH_TOKEN_KEY) ?? "";
}

export function getUserId(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(USER_ID_KEY);
}

export function setUserId(id: string | null): void {
  if (!isBrowser()) return;
  if (id) {
    window.localStorage.setItem(USER_ID_KEY, id);
  } else {
    window.localStorage.removeItem(USER_ID_KEY);
  }
}

export function setTokens(accessToken: string, refreshToken: string): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearTokens(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.localStorage.removeItem(USER_ID_KEY);
}

/**
 * A random ID generated once per browser and persisted indefinitely — not a
 * hardware fingerprint, just a stable per-installation identifier. Bound to
 * the session at login and enforced on every refresh server-side, so a
 * refresh token stolen and replayed from a different browser is detectable.
 */
export function getOrCreateDeviceFingerprint(): string {
  if (!isBrowser()) return "";
  let fingerprint = window.localStorage.getItem(DEVICE_FINGERPRINT_KEY);
  if (!fingerprint) {
    fingerprint = generateFingerprint();
    window.localStorage.setItem(DEVICE_FINGERPRINT_KEY, fingerprint);
  }
  return fingerprint;
}

function generateFingerprint(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `fp-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Storage key exported for the cross-tab `storage` event listener. */
export const ACCESS_TOKEN_STORAGE_KEY = ACCESS_TOKEN_KEY;
export const USER_ID_STORAGE_KEY = USER_ID_KEY;
