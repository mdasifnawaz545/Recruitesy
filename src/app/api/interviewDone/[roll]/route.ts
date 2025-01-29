import { NextRequest, NextResponse } from "next/server";
import { candidateModel } from "@/models/candidate";
import DBConnection from "@/lib/database";
import { getSession, useSession } from "next-auth/react";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession, User } from "next-auth";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!(session?.user as User)) {
        return NextResponse.json({ message: "User is not Authenticated", status: false });
    }
    const roll = request.url.substring(request.url.lastIndexOf('/') + 1);
    const requestJson = await request.json();
    const { message } = requestJson;
    console.log("The Message is - ", message);

    const recruiterEmail = session?.user.email


    try {
        await DBConnection();
        const response = await candidateModel.findOneAndUpdate({ roll: roll }, {
            $set: {
                interviewed: true,
                isinterviewRunning: false,
                message: message,
                interviewedBy: recruiterEmail
            }
        }); //, 
        if (response) {
            return NextResponse.json({
                message: "Interviewed Successfully",
                status: true,
            })
        }
        else {
            return NextResponse.json({
                message: "Not Interviewed",
                status: false
            })
        }
    } catch (errror) {
        return NextResponse.json({
            message: "Not Interviewed",
            status: false
        })
    }

}

