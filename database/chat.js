const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: ["Accounts/Finance", "HR", "Systems"],
        }
    },
    {
        timestamps: true,
    }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = { Chat };