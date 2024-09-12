import { NextRequest, NextResponse } from "next/server";
import { client, trx } from "@/lib/connect";
import { revalidateTag } from "next/cache";


export async function GET(request: NextRequest) {
  const rawQuery = 'SELECT id, name FROM public."SubCategory"';
  const url = new URL(request.url);
  const categoryId = url.searchParams.get("id");

  try {
    const response = await client.query(
      `${rawQuery} ${categoryId ? `WHERE id = ${categoryId}` : ""}`
    );
    return NextResponse.json(!!categoryId ? response.rows[0] : response.rows);
  } catch (err) {
    return NextResponse.json(
      { error: "Error retrieving sub category data", details: err },
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
    const queryText = 'INSERT INTO public."SubCategory"(name, "categoryId") VALUES ($1, $2)';
    const values = [body.name, body.categoryId];
    
    await trx.query(queryText, values);
    
    await trx.query("COMMIT");
    return NextResponse.json({ status: 201 });
  } catch (err) {
    await trx.query("ROLLBACK");
    return NextResponse.json(
      { error: "SubCategory registration error", details: err },
      { status: 500 }
    );
  }
}
