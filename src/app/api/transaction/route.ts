import { NextRequest, NextResponse } from "next/server";
import { client, trx } from "@/lib/connect";
import { revalidateTag } from "next/cache";

export async function GET(request: Request) {
  const rawQuery =
    'SELECT id, "tagId", "postingId", "transferId" FROM public."Transaction"';
  const url = new URL(request.url);
  const transactionId = url.searchParams.get("id");

  try {
    const response = await client.query(
      `${rawQuery} ${transactionId ? `WHERE id = ${transactionId}` : ""}`
    );
    return NextResponse.json(!!transactionId ? response.rows[0] : response.rows);
  } catch (err) {
    return NextResponse.json(
      { error: "Error fetching transaction(s)", details: err },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = JSON.parse(await request.text());
  const tag = request.nextUrl.searchParams.get("tag");
  if (tag) revalidateTag(tag);

  const payload = {
    tagId: body.tagId,
    postingId: body.postingId,
    transferId: body.transferId,
  }

  try {
    await trx.query("BEGIN");
    const queryText = 'INSERT INTO public."Transaction"("tagId", "postingId", "transferId") VALUES ($1, $2, $3)';
    const values = Object.values(payload);

    await trx.query(queryText, values);

    await trx.query("COMMIT");
    return NextResponse.json({ status: 201 });
  } catch (err) {
    await trx.query("ROLLBACK");
    return NextResponse.json(
      { error: "Transaction registration error", details: err },
      { status: 500 }
    );
  }
}
