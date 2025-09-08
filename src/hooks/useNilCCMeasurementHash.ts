import { useState } from "react";
import API from "@/services/API";
import bytesToHex from "@/utils/bytesToHex";

const useNilCCMeasurementHash = () => {
  const [measurementHash, setMeasurementHash] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getMeasurementHash = async () => {
    setIsLoading(true);
    const response = await API.generateNilCCReport();
    const measurement = response?.data?.report?.measurement ?? null;

    if (measurement) {
      setMeasurementHash(bytesToHex(measurement));
    }
    setIsLoading(false);
  };

  return { measurementHash, isLoading, getMeasurementHash };
};

export default useNilCCMeasurementHash;
