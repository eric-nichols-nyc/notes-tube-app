


import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, res: NextResponse){
    const { messages } = await request.json();
    console.log(messages);
}