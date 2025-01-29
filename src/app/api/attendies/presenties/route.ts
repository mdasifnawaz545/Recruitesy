import { NextRequest, NextResponse } from "next/server";
import { candidateModel } from "@/models/candidate";
import DBConnection from "@/lib/database";
import { resolve } from "path";
import { getServerSession, User } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";


export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!(session?.user as User)) {
        return NextResponse.json({ message: "User is not Authenticated", status: false });
    }

    try {
        await DBConnection();
        const response: candidate[] | [] = await candidateModel.find({ present: true });
        if (response) {
            return NextResponse.json(response)
        }
        return NextResponse.json({
            message: "Not Present Candidate",
            status: false
        })
    } catch (error) {
        return NextResponse.json({
            message: "Not Present Candidate",
            status: false
        })
    }

}