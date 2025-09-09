import { type NextRequest, NextResponse } from "next/server";
import { deleteRecord } from "@/lib/nildb/deleteRecord";
import { setupClient } from "@/lib/nildb/setupClient";

export async function DELETE(request: NextRequest) {
  try {
    const { chatId } = await request.json();

    if (!chatId) {
      return NextResponse.json(
        { success: false, error: "Chat ID is required" },
        { status: 400 },
      );
    }

    const builder = await setupClient();
    const result = await deleteRecord(
      builder,
      process.env.CHATS_COLLECTION_ID,
      { _id: chatId },
    );

    return NextResponse.json({
      success: true,
      message: result.message,
      deletedCount: result.deletedCount,
      acknowledged: result.acknowledged,
    });
  } catch (error) {
    console.error("Failed to delete chat:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete chat" },
      { status: 500 },
    );
  }
}
