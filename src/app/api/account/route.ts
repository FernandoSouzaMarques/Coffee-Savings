import { NextRequest, NextResponse } from "next/server";
import { client, trx } from "@/lib/connect";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const rawQuery =
    `SELECT id, name, balance, icon, "hideValue" FROM public."Account" WHERE "userId" = ${userId}`;
  const url = new URL(request.url);
  const accountId = url.searchParams.get("id");

  try {
    const response = await client.query(
      `${rawQuery} ${accountId ? `WHERE id = ${accountId}` : ""}`
    );
    return NextResponse.json(!!accountId ? response.rows[0] : response.rows);
  } catch (err) {
    return NextResponse.json(
      { error: "Error retrieving account data", details: err },
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
    balance: body.balance,
    icon: body.icon,
    hideValue: body.hideValue,
    userId: body.userId,
  };

  try {
    await trx.query("BEGIN");
    const queryText =
      'INSERT INTO public."Account"(name, balance, icon, "hideValue", "userId") VALUES ($1, $2, $3, $4, $5)';
    const values = Object.values(payload);

    await trx.query(queryText, values);

    await trx.query("COMMIT");
    return NextResponse.json({ status: 201 });
  } catch (err) {
    await trx.query("ROLLBACK");
    return NextResponse.json(
      { error: "Account registration error", details: err },
      { status: 500 }
    );
  }
}
