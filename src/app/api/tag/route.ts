import { NextRequest, NextResponse } from "next/server";
import { client, trx } from "@/lib/connect";
import { revalidateTag } from "next/cache";

export async function GET(request: Request) {
  const rawQuery = 'SELECT id, name FROM public."Tag"';
  const url = new URL(request.url);
  const tagId = url.searchParams.get("id");

  try {
    const response = await client.query(
      `${rawQuery} ${tagId ? `WHERE id = ${tagId}` : ""}`
    );
    return NextResponse.json(!!tagId ? response.rows[0] : response.rows);
  } catch (err) {
    return NextResponse.json(
      { error: "Error fetching tag(s)", details: err },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = JSON.parse(await request.text());
  const tag = request.nextUrl.searchParams.get("tag");
  if (tag) revalidateTag(tag);

  try {
    await trx.query("BEGIN");
    const queryText = 'INSERT INTO public."Tag"(name) VALUES ($1)';
    const values = [body.name];

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
