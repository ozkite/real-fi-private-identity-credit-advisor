import { useState } from "react";
import API from "@/services/API";

const useNilCCMeasurementHash = () => {
  const [measurementHash, setMeasurementHash] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getMeasurementHash = async () => {
    setIsLoading(true);
    const response = await API.generateNilCCReport();
    const measurementHash = response?.data?.report?.measurement ?? null;

    if (measurementHash) {
      setMeasurementHash(measurementHash);
    }
    setIsLoading(false);
  };

  return { measurementHash, isLoading, getMeasurementHash };
};

export default useNilCCMeasurementHash;
