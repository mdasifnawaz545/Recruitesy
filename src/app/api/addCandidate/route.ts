import DBConnection from "@/lib/database";
import { candidateModel } from "@/models/candidate";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const resolved = await request.json();
    const { data } = resolved;
    
    let candidate: candidate = data;

    try {
        await DBConnection();
        let response;
        try {
            const user = await new candidateModel(candidate);
            response = await user.save();
        } catch (error) {
            console.log(error)
        }
        if (response) {
            return NextResponse.json({
                message: "Candidate Data Saved Successfully",
                status: true
            })

        }
        else {
            return NextResponse.json({
                message: "Candidate Data Not Saved",
                status: false
            })
        }
    } catch (error) {
        return NextResponse.json({
            message: "Candidate Data Not Saved",
            status: false
        })
    }


}