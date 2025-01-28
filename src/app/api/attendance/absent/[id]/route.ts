import { NextRequest, NextResponse } from "next/server";
import { candidateModel } from "@/models/candidate";
import DBConnection from "@/lib/database";

//Attendance System Function to mark the candidate as present.

export async function GET(request: NextRequest) {
    const id = request.url.substring(request.url.lastIndexOf('/') + 1)
    console.log("ID is : ", id)
    try {
        await DBConnection();
        try {
            const response = await candidateModel.findOneAndUpdate({ roll: id }, { $set: { present: false } })
            console.log(response)
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