import { NextRequest, NextResponse } from "next/server";
import { candidateModel } from "@/models/candidate";
import exp from "constants";
import DBConnection from "@/lib/database";


export async function GET(request: NextRequest) {
    const domain = request.url.substring(request.url.lastIndexOf('/') + 1)
    try {
        await DBConnection();
        console.log("Random Backend Route")
        const response = await candidateModel.findOne({ $and: [{ domain: domain }, { interviewed: false }, { present: true }, { isinterviewRunning: false }, { selected: false }] });
        const id = response?._id;
        const newResponse = await candidateModel.findByIdAndUpdate(id, { $set: { isinterviewRunning: true } });
        if (newResponse) {

            return NextResponse.json(newResponse)
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