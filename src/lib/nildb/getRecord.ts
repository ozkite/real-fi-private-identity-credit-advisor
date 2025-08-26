import type { SecretVaultBuilderClient } from "@nillion/secretvaults";

export async function getRecord(
  builder: SecretVaultBuilderClient,
  collectionId: string | undefined,
  // biome-ignore lint/suspicious/noExplicitAny: In some cases, we need to pass string as filter
  filter: any,
): Promise<{
  status: string;
  message: string;
  result: Record<string, unknown>[];
}> {
  if (!collectionId) {
    throw new Error("Collection ID is required");
  }

  const recordsData = await builder.findData({
    collection: collectionId,
    filter,
  });

  return {
    status: "success",
    message: "Record retrieved successfully",
    result: recordsData.data,
  };
}
