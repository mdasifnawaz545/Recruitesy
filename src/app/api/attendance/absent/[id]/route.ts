import { NextRequest, NextResponse } from "next/server";
import { candidateModel } from "@/models/candidate";
import DBConnection from "@/lib/database";

//Attendance System Function to mark the candidate as present.

export async function GET(request: NextRequest) {
    const id = request.url.substring(request.url.lastIndexOf('/') + 1)
    try {
        await DBConnection();
        const response = await candidateModel.findByIdAndUpdate(id, { present: false })
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
        return NextResponse.json({
            message: "Not Marked as Absent",
            status: false
        })
    }

}