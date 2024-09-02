import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({ status: "ok" });
  }
  catch(err) {
    return NextResponse.json({ status: "error"})
  }
}