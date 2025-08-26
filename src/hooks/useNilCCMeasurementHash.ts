import { useEffect, useState } from "react";
import API from "@/services/API";
import bytesToHex from "@/utils/bytesToHex";
import generateNonce from "@/utils/generateNonce";

const useNilCCMeasurementHash = () => {
  const [measurementHash, setMeasurementHash] = useState<string | null>(null);
  const [nonce, setNonce] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNonce(generateNonce());
  }, []);

  const getMeasurementHash = async () => {
    setIsLoading(true);
    const response = await API.generateNilCCReport(nonce);
    const measurement = response?.data?.report?.measurement ?? null;

    if (measurement) {
      setMeasurementHash(bytesToHex(measurement));
    }
    setIsLoading(false);
  };

  return { nonce, measurementHash, isLoading, getMeasurementHash };
};

export default useNilCCMeasurementHash;
