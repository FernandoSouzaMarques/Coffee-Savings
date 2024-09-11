import { NextRequest, NextResponse } from "next/server";
import { client, trx } from "@/lib/connect";
import { revalidateTag } from "next/cache";


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

export async function POST(request: NextRequest) {
  const body = JSON.parse(await request.text());
  const tag = request.nextUrl.searchParams.get("tag");
  if (tag) revalidateTag(tag);
  
  const payload = {
    name: body.name,
    nickname: body.nickname,
    password: body.password,
    avatar: body.avatar,
  }
  
  try {
    await trx.query("BEGIN");
    const queryText = 'INSERT INTO public."User"(name, nickname, password, avatar) VALUES ($1, $2, $3, $4)';
    const values = Object.values(payload);
    
    await trx.query(queryText, values);
    
    await trx.query("COMMIT");
    return NextResponse.json({ status: 201 });
  } catch (err) {
    await trx.query("ROLLBACK");
    return NextResponse.json(
      { error: "Tag registration error", details: err },
      { status: 500 }
    );
  }
}
