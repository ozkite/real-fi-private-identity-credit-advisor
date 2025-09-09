import type { SecretVaultBuilderClient, Uuid } from "@nillion/secretvaults";

export async function getCollectionMetadata(
  builder: SecretVaultBuilderClient,
  collectionId: string | undefined,
): Promise<{
  status: string;
  message: string;
  metadata: {
    _id: string;
    count: number;
    size: number;
    first_write: string;
    last_write: string;
    indexes: Array<{
      v: number;
      key: Record<string, string | number>;
      name: string;
      unique: boolean;
    }>;
  };
}> {
  if (!collectionId) {
    throw new Error("Collection ID is required");
  }

  const response = await builder.readCollection(collectionId as Uuid);

  return {
    status: "success",
    message: "Collection metadata retrieved successfully",
    metadata: response.data,
  };
}
