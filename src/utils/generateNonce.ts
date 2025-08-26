export default function generateNonce() {
  if (typeof window === "undefined") {
    return null;
  }

  const array = new Uint8Array(64);
  window.crypto.getRandomValues(array);
  return Array.from(array)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
