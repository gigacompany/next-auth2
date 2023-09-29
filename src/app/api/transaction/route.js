import { transactions } from "@/database/transactions";
import { NextResponse } from "next/server";

export function GET(request){
    const data=transactions
    return NextResponse.json(data,{status:200})
}