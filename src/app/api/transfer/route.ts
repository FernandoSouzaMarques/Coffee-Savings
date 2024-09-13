import { NextRequest, NextResponse } from "next/server";
import { client, trx } from "@/lib/connect";
import { revalidateTag } from "next/cache";

export async function GET(request: Request) {
  const rawQuery =
    'SELECT id, description, "sourceAccountId", "targetAccountId", date, observations, status FROM public."Transfer"';
  const url = new URL(request.url);
  const transferId = url.searchParams.get("id");

  try {
    const response = await client.query(
      `${rawQuery} ${transferId ? `WHERE id = ${transferId}` : ""}`
    );
    return NextResponse.json(!!transferId ? response.rows[0] : response.rows);
  } catch (err) {
    return NextResponse.json(
      { error: "Error fetching transfer(s)", details: err },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = JSON.parse(await request.text());
  const tag = request.nextUrl.searchParams.get("tag");
  if (tag) revalidateTag(tag);

  const payload = {
    description: body.description,
    sourceAccountId: body.sourceAccountId,
    targetAccountId: body.targetAccountId,
    date: body.date,
    observations: body.observations,
    status: body.status
  }

  try {
    await trx.query("BEGIN");
    const queryText = 'INSERT INTO public."Transfer"(description, "sourceAccountId", "targetAccountId", date, observations, status) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = Object.values(payload);

    await trx.query(queryText, values);

    await trx.query("COMMIT");
    return NextResponse.json({ status: 201 });
  } catch (err) {
    await trx.query("ROLLBACK");
    return NextResponse.json(
      { error: "Transfer registration error", details: err },
      { status: 500 }
    );
  }
}
