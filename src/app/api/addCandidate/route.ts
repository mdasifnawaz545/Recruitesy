import candidates from "@/constants/randomData";
import DBConnection from "@/lib/database";
import { candidateModel } from "@/models/candidate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    // const data = await request.json();
    // let candidate:candidate[]=await candidates;

    try {
        await DBConnection();
        await candidateModel.insertMany(candidates);
        return NextResponse.json({
            message: "Candidate Data Saved Successfully",
        success: true
        })
    } catch (error) {
        return NextResponse.json({
            message: "Candidate Data Not Saved",
            success: false
        })
    }


}