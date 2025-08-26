import { NextResponse } from "next/server";
import packageJson from "../../../../package.json";

export async function GET() {
  try {
    return NextResponse.json({
      version: packageJson.version,
    });
  } catch (error) {
    console.error("Failed to get version information", error);
    return NextResponse.json(
      { error: "Failed to get version information" },
      { status: 500 },
    );
  }
}
