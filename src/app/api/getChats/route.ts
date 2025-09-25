// api/getChats/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/unifiedAuth";
import { getRecord } from "@/lib/nildb/getRecord";
import { setupClient } from "@/lib/nildb/setupClient";
import { initializeWebSearchFields } from "@/lib/rateLimiting/webSearchRateLimit";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth(request);

    const filter = { creator: auth.userId };

    const builder = await setupClient();

    // Initialize web search fields for the user
    if (auth.userId) {
      const userCollectionId = process.env.USER_COLLECTION_ID;
      if (userCollectionId) {
        await initializeWebSearchFields(builder, auth.userId, userCollectionId);
      }
    }

    const dataWritten = await getRecord(
      builder,
      process.env.CHATS_COLLECTION_ID,
      filter,
    );

    return NextResponse.json({
      success: true,
      message: "GETCHATS via SecretVaults",
      content: dataWritten,
    });
  } catch (error) {
    console.error("getChats error:", error);

    if (error instanceof Error && error.message.includes("Authentication")) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Failed to process getChats request" },
      { status: 500 },
    );
  }
}
