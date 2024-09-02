import { NextResponse } from 'next/server';
import database from "@/lib/connect";

export async function GET() {
  try {
    const response = await database.query("SELECT NOW()");
    
    return NextResponse.json({ time: response.rows[0].now });
  }
  catch(err) {
    return NextResponse.json({ error: 'Erro ao obter o tempo' }, { status: 500 })
  }
}