import DBConnection from "@/lib/database";
import { candidateModel } from "@/models/candidate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    let domainName = request.url.substring(request.url.lastIndexOf('/') + 1);

    try {
        await DBConnection();
        const responses: candidate[] | [] = await candidateModel.find({ $and: [{ domain: domainName }, { present: true }, { interviewed: false }, { isinterviewRunning: false }] });
        if (responses) {
            return NextResponse.json(responses)
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