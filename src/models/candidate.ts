import { mongo, Schema } from "mongoose";
import mongoose from "mongoose";

//also include a field with name emialSent so that in the email sending page the candidate whose email is already sent, it is not going to be appear again.

const candidatesSchema: Schema<candidate> = new Schema({
    name: {
        type: String,
        required: true,
        min: [3, "Enter Valid Name"],
    },
    domain: {
        type: String,
        required: true,
    },
    kiitemail: {
        type: String,
        required: true,
        min: [18, "Enter Valid Email Address"],
        max: [19, "Enter Valid Email Address"],
        unique: true
    },
    email: {
        type: String,
        required: true,
        min: [10, "Enter Valid Email Address"],
        unique: true

    },
    roll: {
        type: String,
        required: true,
        min: [7, "Enter Valid Roll Number"],
        max: [8, "Enter Valid Roll Number"],
        unique: true

    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    contactNumber: {
        type: String,
        required: true,
        // min: [10, "Enter Valid Contact Number"],
        // max: [12, "Enter Valid Contact Number"],
    },
    yearOfStudy: {
        type: String,
        required: true,
        enum: ["1st", "2nd", "3rd", "4th"],
    },
    branch: {
        type: String,
        required: true,

    },
    links: {
        resume: {
            type: String,
            required: true,
        },
        github: {
            type: String,
            // required: true,
        },
        linkedin: {
            type: String,
            required: true,
        }
    },
    existSocieties: {
        type: String,

    },
    whyElabs: {
        type: String,

    },
    fromWhereYouGotKnow: {
        type: String,

    },
    anythingElse: {
        type: String,
    },

    // Backend Stuff
    present: {
        type: Boolean,
        default: false,
    },
    interviewed: {
        type: Boolean,
        default: false,
    },
    interviewedBy: {
        type: String,
        default: ""
    },
    isinterviewRunning: {
        type: Boolean,
        default: false,
    },
    selected: {
        type: Boolean,
        default: false
    },
    selectedBy: {
        type: String,
        default: ""
    },
    message: {
        type: String,
        default: ""
    },
})

export const candidateModel = (mongoose.models.Candidates as mongoose.Model<candidate>) || (mongoose.model<candidate>("Candidates", candidatesSchema))