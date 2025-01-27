import DBConnection from "@/lib/database";
import { candidateModel } from "@/models/candidate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const domain = request.url.substring(request.url.lastIndexOf('/') + 1)
    console.log(request)
    try {
        await DBConnection();
        const response: candidate[] = await candidateModel.find({ $and: [{ domain: domain }, { selected: true },{interviewed:true}] });
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