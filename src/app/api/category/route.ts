import { NextRequest, NextResponse } from "next/server";
import { client, trx } from "@/lib/connect";
import { revalidateTag } from "next/cache";

interface ISubCategory {
  id: string,
  name: string,
}

interface ICategory {
  id: string,
  name: string,
  icon: string,
  color: string,
  isExpense: boolean,
  subCategories: ISubCategory[]
}

interface IQueryCategory {
  id: string,
  name: string,
  icon: string,
  color: string,
  isExpense: boolean,
  subCategoryId: string,
  subCategoryName: string,
}

export async function GET(request: NextRequest) {
  const rawQuery =
    'SELECT c.id, c.name, c.icon, c.color, c."isExpense", s.id as "subCategoryId", s.name as "subCategoryName" FROM public."Category" c LEFT JOIN public."SubCategory" s ON c.id = s."categoryId"';
  const url = new URL(request.url);
  const categoryId = url.searchParams.get("id");

  try {
    const response = await client.query(
      `${rawQuery} ${categoryId ? `WHERE id = ${categoryId}` : ""}`
    );

    const results: IQueryCategory[] = !!categoryId ? response.rows[0] : response.rows;

    const formatted = results.reduce<ICategory[]>((acc, curr) => {
      let category = acc.find((cat) => cat.id === curr.id);

      if (!category) {
        category = {
          id: curr.id,
          name: curr.name,
          icon: curr.icon,
          color: curr.color,
          isExpense: curr.isExpense,
          subCategories: [],
        };
        acc.push(category);
      }

      if (curr.subCategoryId) {
        category.subCategories.push({
          id: curr.subCategoryId,
          name: curr.subCategoryName,
        });
      }

      return acc;
    }, []);

    return NextResponse.json(formatted);
  } catch (err) {
    return NextResponse.json(
      { error: "Error retrieving category data", details: err },
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
    const queryText =
      'INSERT INTO public."Category"(name, icon, "isExpense", color) VALUES ($1, $2, $3, $4)';
    const values = [body.name, body.icon, body.isExpense, body.color];

    await trx.query(queryText, values);

    await trx.query("COMMIT");
    return NextResponse.json({ status: 201 });
  } catch (err) {
    await trx.query("ROLLBACK");
    return NextResponse.json(
      { error: "Category registration error", details: err },
      { status: 500 }
    );
  }
}
