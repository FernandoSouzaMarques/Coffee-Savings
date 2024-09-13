import { NextRequest, NextResponse } from "next/server";
import { client, trx } from "@/lib/connect";
import { revalidateTag } from "next/cache";

export async function GET(request: Request) {
  const rawQuery =
    'SELECT id, value, "categoryId", "userId" FROM public."SpendingLimits"';
  const url = new URL(request.url);
  const spendingLimitsId = url.searchParams.get("id");

  try {
    const response = await client.query(
      `${rawQuery} ${spendingLimitsId ? `WHERE id = ${spendingLimitsId}` : ""}`
    );
    return NextResponse.json(!!spendingLimitsId ? response.rows[0] : response.rows);
  } catch (err) {
    return NextResponse.json(
      { error: "Error fetching spending limits", details: err },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = JSON.parse(await request.text());
  const tag = request.nextUrl.searchParams.get("tag");
  if (tag) revalidateTag(tag);

  const payload = {
    value: body.value,
    categoryId: body.categoryId,
    userId: body.userId,
  }

  try {
    await trx.query("BEGIN");
    const queryText = 'INSERT INTO public."SpendingLimits"(value, "categoryId", "userId") VALUES ($1, $2, $3)';
    const values = Object.values(payload);

    await trx.query(queryText, values);

    await trx.query("COMMIT");
    return NextResponse.json({ status: 201 });
  } catch (err) {
    await trx.query("ROLLBACK");
    return NextResponse.json(
      { error: "Spending limits registration error", details: err },
      { status: 500 }
    );
  }
}
