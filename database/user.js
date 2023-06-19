const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        age: { type: Number },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        role: {
            type: String,
            enum: ["developer", "team lead", "project manager"],
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            data: Buffer,
            contentType: String
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };