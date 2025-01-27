import DBConnection from "@/lib/database";
import { candidateModel } from "@/models/candidate";
import { NextRequest, NextResponse } from "next/server";

interface mydata {
    domain: string,
    roll: string
}

export async function GET(request: NextRequest) {

    // const data: mydata = await request.json()
    // const { domain, roll } = data;
    const roll = request.url.substring(request.url.lastIndexOf('/') + 1)
    const myRoll: number = Number.parseInt(roll)

    try {
        await DBConnection();
        const response: candidate | null = await candidateModel.findOneAndUpdate({ $and: [{ roll: myRoll }, { isinterviewRunning: false }] }, { isinterviewRunning: true });
        if (response) {
            return NextResponse.json(response);
        }
        else {
            return NextResponse.json({
                message: "Some Problem Occured",
                status: false

            })
        }

    } catch (error) {
        return NextResponse.json({
            message: "There is some problem",
            status: false
        })
    }
}