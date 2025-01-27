import { NextRequest, NextResponse } from "next/server";
import { candidateModel } from "@/models/candidate";
import exp from "constants";
import DBConnection from "@/lib/database";


export async function GET(request: NextRequest) {
    const domain = request.url.substring(request.url.lastIndexOf('/') + 1)
    try {
        await DBConnection();
        console.log("Random Backend Route")
        const response = await candidateModel.findOne({ $and: [{ domain: domain }, { interviewed: false }, { present: true }, { isinterviewRunning: false }] });
        if (response) {
           
            return NextResponse.json(response)
        }
        else {
            return NextResponse.json({
                message: "Not Get",
                status: false
            })
        }
    } catch (errror) {
        return NextResponse.json({
            message: "Not Get",
            status: false
        })
    }

}