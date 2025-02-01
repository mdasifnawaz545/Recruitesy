import DBConnection from "@/lib/database";
import { candidateModel } from "@/models/candidate";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession, User } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!(session?.user as User)) {
        return NextResponse.json({ message: "User is not Authenticated", status: false });
    }
    const roll = request.url.substring(request.url.lastIndexOf('/') + 1);
    const urlAfterExtractingRoll = request.url.substring(0, request.url.lastIndexOf('/'));
    const domain = urlAfterExtractingRoll.substring(urlAfterExtractingRoll.lastIndexOf('/') + 1);
    

    try {
        await DBConnection();
        const response = await candidateModel.findOne({
            domain: domain,
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