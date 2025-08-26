import { Keypair } from "@nillion/nuc";
import { SecretVaultBuilderClient } from "@nillion/secretvaults";

const config = {
  NILCHAIN_URL: process.env.NILCHAIN_URL,
  NILAUTH_URL: process.env.NILAUTH_URL,
  NILDB_NODES: process.env.NILDB_NODES?.split(","),
  NILLION_API_KEY: process.env.NILLION_API_KEY,
};

export async function setupClient(): Promise<SecretVaultBuilderClient> {
  if (!config.NILLION_API_KEY) {
    console.error("Please set NILLION_API_KEY in your .env file");
    process.exit(1);
  }

  const builderKeypair = Keypair.from(config.NILLION_API_KEY);

  if (!config.NILCHAIN_URL || !config.NILAUTH_URL || !config.NILDB_NODES) {
    console.error(
      "Please set NILCHAIN_URL, NILAUTH_URL, and NILDB_NODES in your .env file",
    );
    process.exit(1);
  }

  const builder = await SecretVaultBuilderClient.from({
    keypair: builderKeypair,
    urls: {
      chain: config.NILCHAIN_URL,
      auth: config.NILAUTH_URL,
      dbs: config.NILDB_NODES,
    },
    blindfold: {
      operation: "store",
    },
  });

  await builder.refreshRootToken();

  return builder;
}
