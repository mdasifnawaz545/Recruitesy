import DBConnection from "@/lib/database";
import { candidateModel } from "@/models/candidate";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const roll = request.url.substring(request.url.lastIndexOf('/') + 1);
    const urlAfterExtractingRoll = request.url.substring(0, request.url.lastIndexOf('/') - 1);
    const domain = request.url.substring(request.url.lastIndexOf('/') + 1);
    console.log(roll)
    console.log(domain)

    try {
        await DBConnection();
        const response = await candidateModel.findOne({
            domain: domain,
            selected: false,
            interviewed: true,
            roll: { $ne: roll }
        });

        if (response) {
            return NextResponse.json(response);
        }
        else {
            return NextResponse.json({ message: "Not Found", status: false });
        }
    } catch (error) {
        return NextResponse.json({ message: "Not Found", status: false });
    }

}