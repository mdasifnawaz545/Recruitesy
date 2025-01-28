import { NextRequest, NextResponse } from "next/server";
import { candidateModel } from "@/models/candidate";
import DBConnection from "@/lib/database";
import { getSession, useSession } from "next-auth/react";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
    const roll = request.url.substring(request.url.lastIndexOf('/') + 1);
    const requestJson = await request.json();
    const { message } = requestJson;
    console.log("The Message is - ", message);

    const session = await getServerSession(authOptions);
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

