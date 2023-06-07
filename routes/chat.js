const express = require("express");
const {
    sendMessage
} = require("../handlers/chat");
const chatRouter = express.Router();

chatRouter.post('/send-message', sendMessage);

module.exports = chatRouter;