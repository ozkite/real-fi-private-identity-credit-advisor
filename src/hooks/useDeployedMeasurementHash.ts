import measurementHashIndex from "../../measurement-hash-index.json";
import packageJson from "../../package.json";

const useDeployedMeasurementHash = () => {
  const version = packageJson.version;
  const deployedMeasurementHash =
    measurementHashIndex[version as keyof typeof measurementHashIndex];

  return { deployedMeasurementHash, version };
};

export default useDeployedMeasurementHash;
