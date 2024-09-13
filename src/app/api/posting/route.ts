import { NextRequest, NextResponse } from "next/server";
import { client, trx } from "@/lib/connect";
import { revalidateTag } from "next/cache";

export async function GET(request: Request) {
  const rawQuery =
    'SELECT id, description, value, "categoryId", "accountId", date, observations, "isExpense", status FROM public."Posting"';
  const url = new URL(request.url);
  const postingId = url.searchParams.get("id");

  try {
    const response = await client.query(
      `${rawQuery} ${postingId ? `WHERE id = ${postingId}` : ""}`
    );
    return NextResponse.json(!!postingId ? response.rows[0] : response.rows);
  } catch (err) {
    return NextResponse.json(
      { error: "Error fetching posting(s)", details: err },
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
    value: body.value,
    categoryId: body.categoryId,
    accountId: body.accountId,
    date: body.date,
    observations: body.observations,
    isExpense: body.isExpense,
    status: body.status,
  }

  try {
    await trx.query("BEGIN");
    const queryText = 'INSERT INTO public."Posting"(description, value, "categoryId", "accountId", date, observations, "isExpense", status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = Object.values(payload);

    await trx.query(queryText, values);

    await trx.query("COMMIT");
    return NextResponse.json({ status: 201 });
  } catch (err) {
    await trx.query("ROLLBACK");
    return NextResponse.json(
      { error: "Posting registration error", details: err },
      { status: 500 }
    );
  }
}
