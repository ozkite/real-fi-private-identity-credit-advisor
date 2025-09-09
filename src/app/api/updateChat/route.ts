//api/updateChat/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/unifiedAuth";
import { setupClient } from "@/lib/nildb/setupClient";
import { updateRecord } from "@/lib/nildb/updateRecord";
import type { CHAT_SCHEMA } from "@/types/schemas";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth(request);

    const body = await request.json();
    const { _id, title, message_count, noTitle } = body;

    const updateData: Partial<CHAT_SCHEMA> = {
      creator: auth.userId as string,
      updated_at: new Date().toISOString(),
      message_count,
    };

    if (!noTitle && title !== undefined) {
      // Sanitize the title input
      const sanitizedTitle = title
        .toString()
        .trim()
        .slice(0, 100) // Limit to 100 characters
        .replace(/[<>]/g, "") // Remove potential HTML tags
        .replace(/[\r\n\t]/g, " "); // Replace line breaks and tabs with spaces

      updateData.title = { "%allot": sanitizedTitle };
    }

    const filter = { _id: _id };

    const builder = await setupClient();
    await updateRecord(
      builder,
      process.env.CHATS_COLLECTION_ID,
      filter,
      updateData,
    );

    return NextResponse.json({
      success: true,
      message: "UPDATED CHATS via SecretVaults",
    });
  } catch (error) {
    console.error("updateChat error:", error);
    return NextResponse.json(
      { error: "Failed to process updateChat request" },
      { status: 500 },
    );
  }
}
