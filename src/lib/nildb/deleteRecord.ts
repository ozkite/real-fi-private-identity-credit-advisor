import type {
  DeleteDataRequest,
  SecretVaultBuilderClient,
} from "@nillion/secretvaults";

export async function deleteRecord(
  builder: SecretVaultBuilderClient,
  collectionId: string | undefined,
  filter: Record<string, unknown>,
): Promise<{
  status: string;
  message: string;
  deletedCount: number;
  acknowledged: boolean;
}> {
  if (!collectionId) {
    throw new Error("Collection ID is required");
  }

  const deleteRequest: DeleteDataRequest = {
    collection: collectionId as any, // Cast to Uuid type
    filter,
  };

  const response = await builder.deleteData(deleteRequest);
  const firstNodeResponse = Object.values(response)[0];

  return {
    status: "success",
    message: "Record deleted successfully",
    deletedCount: firstNodeResponse.data.deletedCount,
    acknowledged: firstNodeResponse.data.acknowledged,
  };
}
