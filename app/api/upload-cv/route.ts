import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("cv") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save path: public/joshuas-resume.pdf
    const publicDir = path.join(process.cwd(), "public");
    const filePath = path.join(publicDir, "joshuas-resume.pdf");

    // Ensure public folder exists
    await fs.mkdir(publicDir, { recursive: true });

    // Write file
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      message: "CV uploaded successfully!",
      filename: "joshuas-resume.pdf",
    });
  } catch (error) {
    console.error("Failed to save uploaded CV:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
