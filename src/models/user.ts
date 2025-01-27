import mongoose, { Schema } from "mongoose";

const userSchema: Schema<recruitUser> = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },

    }
)


export const recruitUserModel = (mongoose.models.recruituser as mongoose.Model<recruitUser>) || (mongoose.model<recruitUser>("recruituser", userSchema))