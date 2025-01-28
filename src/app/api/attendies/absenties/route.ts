import { NextRequest, NextResponse } from "next/server";
import { candidateModel } from "@/models/candidate";
import DBConnection from "@/lib/database";



export async function GET(request: NextRequest) {

    try {
        await DBConnection();
        const response: candidate[] | [] = await candidateModel.find({ present: false });
        if (response) {
            return NextResponse.json(response)
        }
        return NextResponse.json({
            message: "Not Present Candidate",
            status: false
        })
    } catch (error) {
        return NextResponse.json({
            message: "Not Present Candidate",
            status: false
        })
    }

}