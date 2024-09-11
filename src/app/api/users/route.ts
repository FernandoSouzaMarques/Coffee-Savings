import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/connect";


export async function GET(request: NextRequest) {
  const rawQuery = 'SELECT id, name, nickname, avatar FROM public."User"';
  const url = new URL(request.url);
  const userId = url.searchParams.get("id");

  try {
    const response = await client.query(
      `${rawQuery} ${userId ? `WHERE id = ${userId}` : ""}`
    );
    return NextResponse.json(!!userId ? response.rows[0] : response.rows);
  } catch (err) {
    return NextResponse.json(
      { error: "Error retrieving user data", details: err },
      { status: 500 }
    );
  }
}
