import { NextRequest, NextResponse } from "next/server";
import { client, trx } from "@/lib/connect";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const rawQuery =
    'SELECT id, name, icon, "closingDate", "expirationDate", "currentInvoice", "accountId", "limit" FROM public."CreditCard"';
  const url = new URL(request.url);
  const creditCardId = url.searchParams.get("id");

  try {
    const response = await client.query(
      `${rawQuery} ${creditCardId ? `WHERE id = ${creditCardId}` : ""}`
    );
    return NextResponse.json(!!creditCardId ? response.rows[0] : response.rows);
  } catch (err) {
    return NextResponse.json(
      { error: "Error retrieving credit card data", details: err },
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
    icon: body.icon,
    limit: body.limit,
    closingDate: body.closingDate,
    expirationDate: body.expirationDate,
    currentInvoice: body.currentInvoice,
    userId: body.userId,
    accountId: body.accountId
  };

  try {
    await trx.query("BEGIN");
    const queryText =
      'INSERT INTO public."CreditCard"(name, icon, "limit", "closingDate", "expirationDate", "currentInvoice", "userId", "accountId") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = Object.values(payload);

    await trx.query(queryText, values);

    await trx.query("COMMIT");
    return NextResponse.json({ status: 201 });
  } catch (err) {
    console.log(err)
    await trx.query("ROLLBACK");
    return NextResponse.json(
      { error: "Credit card registration error", details: err },
      { status: 500 }
    );
  }
}
