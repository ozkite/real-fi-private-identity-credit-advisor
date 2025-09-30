import type { SecretVaultBuilderClient } from "@nillion/secretvaults";

export async function updateRecord(
  builder: SecretVaultBuilderClient,
  collectionId: string | undefined,
  filter: Record<string, unknown>,
  updatedData: Record<string, unknown>,
  operator: string = "$set",
): Promise<{ status: string; message: string }> {
  if (!collectionId) {
    throw new Error("Collection ID is required");
  }

  await builder.updateData({
    collection: collectionId,
    filter: filter,
    update: {
      [operator]: updatedData,
    },
  });

  return {
    status: "success",
    message: "Updated record successfully",
  };
}
