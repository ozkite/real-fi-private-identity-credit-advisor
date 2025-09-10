import { NextResponse } from "next/server";
import { getCollectionMetadata } from "@/lib/nildb/getCollectionMetadata";
import { setupClient } from "@/lib/nildb/setupClient";

export async function GET() {
  try {
    const builder = await setupClient();
    const result = await getCollectionMetadata(
      builder,
      process.env.MESSAGES_COLLECTION_ID,
    );

    return NextResponse.json({
      success: true,
      count: result.metadata.count,
    });
  } catch (error) {
    console.error("Failed to fetch message count:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch message count" },
      { status: 500 },
    );
  }
}
