import { NextResponse } from 'next/server';
import database from "@/lib/connect";
import User from '@/models/UserModel';

export async function GET() {
  try {
    const response = await database.query('SELECT id, name, nickname, avatar FROM public."User"');
    const _response = await User.query()
    
    return NextResponse.json(_response);
  }
  catch(err) {
    return NextResponse.json({ error: 'Erro ao listar usuários' }, { status: 500 })
  }
}