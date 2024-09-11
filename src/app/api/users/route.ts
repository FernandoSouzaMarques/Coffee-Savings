import { NextResponse } from "next/server";
import database from "@/lib/connect";

const rawQuery = 'SELECT id, name, nickname, avatar FROM public."User"';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("id");

  try {
    const response = await database.query(
      `${rawQuery} ${userId ? `WHERE id = ${userId}` : ""}`
    );
    return NextResponse.json(!!userId ? response.rows[0] : response.rows);
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao trazer os dados do(s) usuário(s)" },
      { status: 500 }
    );
  }
}
