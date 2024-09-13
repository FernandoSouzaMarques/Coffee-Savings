import { NextRequest, NextResponse } from "next/server";
import { client, trx } from "@/lib/connect";
import { revalidateTag } from "next/cache";

export async function GET(request: Request) {
  const rawQuery =
    'SELECT id, "spendingLimitsId", "postingId", "categoryId", "subCategoryId" FROM public."RelationshipCategory"';
  const url = new URL(request.url);
  const relationshipCategoryId = url.searchParams.get("id");

  try {
    const response = await client.query(
      `${rawQuery} ${
        relationshipCategoryId ? `WHERE id = ${relationshipCategoryId}` : ""
      }`
    );
    return NextResponse.json(
      !!relationshipCategoryId ? response.rows[0] : response.rows
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Error fetching relationship category(s)", details: err },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = JSON.parse(await request.text());
  const tag = request.nextUrl.searchParams.get("tag");
  if (tag) revalidateTag(tag);

  const payload = {
    spendingLimitsId: body.spendingLimitsId,
    postingId: body.postingId,
    categoryId: body.categoryId,
    subCategoryId: body.subCategoryId,
  };

  try {
    await trx.query("BEGIN");
    const queryText =
      'INSERT INTO public."RelationshipCategory"("spendingLimitsId", "postingId", "categoryId", "subCategoryId") VALUES ($1, $2, $3, $4)';
    const values = Object.values(payload);

    await trx.query(queryText, values);

    await trx.query("COMMIT");
    return NextResponse.json({ status: 201 });
  } catch (err) {
    await trx.query("ROLLBACK");
    return NextResponse.json(
      { error: "Relationship category registration error", details: err },
      { status: 500 }
    );
  }
}
