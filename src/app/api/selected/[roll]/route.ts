import { NextRequest, NextResponse } from "next/server";
import { candidateModel } from "@/models/candidate";
import { Session } from "inspector/promises";
import { useSession } from "next-auth/react";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";


export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!(session?.user as User)) {
        return NextResponse.json({ message: "User is not Authenticated", status: false });
    }
    const roll = request.url.substring(request.url.lastIndexOf('/') + 1)

    const recruiterEmail = session?.user.email


    try {
        const response = await candidateModel.findOneAndUpdate({ roll: roll }, { $set: { selected: true, selectedBy: recruiterEmail, interviewedBy: recruiterEmail, interviewed: true }, });
        if (response) {
            return NextResponse.json({
                message: "Selected Successfully",
                status: true,
            })
        }
        else {
            return NextResponse.json({
                message: "Not Selected",
                status: false
            })
        }
    } catch (errror) {
        return NextResponse.json({
            message: "Not Selected",
            status: false
        })
    }

}