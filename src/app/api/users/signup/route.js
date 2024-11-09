import { NextRequest, NextResponse } from "next/server";

export async function POST(NextRequest) {
  const signupreq = await NextRequest.json();
  console.log("signupreq", signupreq);
  return NextResponse.json({
    status: 200,
    message: "successfull",
    data: signupreq,
  });
}
