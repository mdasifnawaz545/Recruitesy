import DBConnection from "@/lib/database";
import { candidateModel } from "@/models/candidate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const roll_no: number = Number.parseInt(request.url.substring(request.url.lastIndexOf('/') + 1));
    try {
        console.log("Database request")
        await DBConnection();
        const response = await candidateModel.findOne({ roll: roll_no })
        if (response) {
            return NextResponse.json(response)
        }
        else {
            return NextResponse.json({
                message: "Not Found",
                status: false
            })
        }
    } catch (error) {
        return NextResponse.json({
            message: "Not Found",
            status: false
        })
    }

}