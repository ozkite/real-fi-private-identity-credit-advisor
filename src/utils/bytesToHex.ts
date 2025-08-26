export default function bytesToHex(measurement: number[]) {
  if (measurement.length > 0) {
    const measurementBytes = new Uint8Array(measurement);
    return Array.from(measurementBytes)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }
  return null;
}
