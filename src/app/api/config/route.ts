import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const configPath = path.resolve(process.cwd(), "data/config.json");
const adminPassword = process.env.ADMIN_PASSWORD || "supersecret";

export async function GET() {
  const file = await fs.readFile(configPath, "utf-8");
  const json = JSON.parse(file);
  return NextResponse.json(json);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { contractAddress, clientId, password } = body;

  if (password !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (
    typeof contractAddress !== "string" ||
    !contractAddress.startsWith("0x") ||
    contractAddress.length !== 42
  ) {
    return NextResponse.json(
      { error: "Invalid contract address" },
      { status: 400 },
    );
  }

  const newData = { contractAddress, clientId };
  await fs.writeFile(configPath, JSON.stringify(newData, null, 2), "utf-8");
  return NextResponse.json({ success: true });
}
