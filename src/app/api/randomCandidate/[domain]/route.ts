import { NextRequest, NextResponse } from "next/server";
import { candidateModel } from "@/models/candidate";
import exp from "constants";
import DBConnection from "@/lib/database";
import { getServerSession, User } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";


export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!(session?.user as User)) {
        return NextResponse.json({ message: "User is not Authenticated", status: false });
    }
    const domain = request.url.substring(request.url.lastIndexOf('/') + 1)
    try {
        await DBConnection();
    
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