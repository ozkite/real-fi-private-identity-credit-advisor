import { useState } from "react";

interface GpuAttestationResponse {
  success: boolean;
  gpu_attestation?: string;
  error?: string;
}

export const useGpuAttestation = () => {
  const [gpuAttestation, setGpuAttestation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGpuAttestation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/gpu-attestation", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: GpuAttestationResponse = await response.json();

      if (data.success && data.gpu_attestation) {
        setGpuAttestation(data.gpu_attestation);
      } else {
        throw new Error(data.error || "No GPU attestation found in response");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Failed to fetch GPU attestation:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    gpuAttestation,
    isLoading,
    error,
    fetchGpuAttestation,
  };
};
