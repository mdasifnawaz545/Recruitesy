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
    const id = request.url.substring(request.url.lastIndexOf('/') + 1)

    try {
        await DBConnection();
        try {
            const response = await candidateModel.findOneAndUpdate({ roll: id }, { $set: { present: false } })
          
            if (response) {
                return NextResponse.json({
                    message: "Marked as Absent",
                    status: true
                })
            }
            return NextResponse.json({
                message: "Not Marked as Absent",
                status: false
            })
        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        return NextResponse.json({
            message: "Not Marked as Absent",
            status: false
        })
    }

}