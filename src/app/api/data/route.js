import { transactions } from "@/database/transaction2";
import { NextResponse } from "next/server";

export function GET(request){
    const data=transactions
    return NextResponse.json(data,{status:200})
}