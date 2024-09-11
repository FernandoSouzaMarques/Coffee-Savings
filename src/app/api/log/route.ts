import { NextResponse } from "next/server";
import { client } from "@/lib/connect";

export async function GET() {
  try {
    const response = await client.query("SELECT NOW()");

    return NextResponse.json({ time: response.rows[0].now });
  } catch (err) {
    return NextResponse.json(
      { error: "Error getting the time", details: err },
      { status: 500 }
    );
  }
}
