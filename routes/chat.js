const express = require("express");
const {
    sendMessage, fetchAllTickets
} = require("../handlers/chat");
const chatRouter = express.Router();

chatRouter.post('/send-message', sendMessage);
chatRouter.get('/get-tickets', fetchAllTickets);

module.exports = chatRouter;