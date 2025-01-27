import mongoose from "mongoose";

const connection: { isConnected: number } = {
    isConnected: 0,
}

async function DBConnection() {
    if (!connection.isConnected) {

        try {
            const response = await mongoose.connect(process.env.MONGODB_ATLAS_URL as string);
            connection.isConnected = response.connections[0].readyState
            console.log("Connected with the Database")
        } catch (error) {
            console.log(error)
            console.log("Database is not Connected");
            process.exit(1);
        }
    }
    else console.log("Connected with the Database")

}

export default DBConnection;