import { NextRequest, NextResponse } from "next/server";
import { candidateModel } from "@/models/candidate";
import DBConnection from "@/lib/database";
import { getServerSession, User } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

//Attendance System Function to mark the candidate as present.

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!(session?.user as User)) {
        return NextResponse.json({ message: "User is not Authenticated", status: false });
    }
    const roll = request.url.substring(request.url.lastIndexOf('/') + 1)
    
    try {
        await DBConnection();
        const response = await candidateModel.findOneAndUpdate({ roll: roll }, { present: true });
        if (response)
            return NextResponse.json({
                message: "Marked as Present",
                status: true
            })
        else {
        return NextResponse.json({
            message: "Not Marked as Present",
            status: false
        })
    }
    }catch (error) {
        return NextResponse.json({
            message: "Not Marked as Present",
            status: false
        })
    }
}

