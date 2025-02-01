import DBConnection from "@/lib/database";
import { candidateModel } from "@/models/candidate";
import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!(session?.user as User)) {
        return NextResponse.json({ message: "User is not Authenticated", status: false });
    }
    try {
        //MongoDB do not have any relation with the schema, we are only going to create the schema to create a model upon this, there is no any schema used to save in the db only the models which is created using these schema are creted in the db. 

        //Now always remember that for each and every request coming from the fronted side to the backend and authentication is implemented there then at each reaquest we have to check for the user whether the user is there or not in session, so for that we are fetching session data from the internal sessionServer that stores the session data for the entire project, that give me the session that was there stored from authOptions. 
        const session = await getServerSession(authOptions);
        const user = session?.user as User

        // if (!session || !user) {
        //     return NextResponse.json({
        //         message: "User is not authenticated",
        //         status: false
        //     })
        // }

        await DBConnection();
        const allCandidate: candidate[] = await candidateModel.find();
        if (allCandidate) {
            
            return NextResponse.json( allCandidate )
        }
    } catch (error) {
        return NextResponse.json({
            message: "Messages Found for the user",
            status: false
        })
    }
}

