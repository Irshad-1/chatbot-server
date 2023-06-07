require('dotenv').config();
const express = require("express");
const cors = require("cors");
const chatRouter = require("./routes/chat");

const app = express();
const port = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());
app.use(logger);
app.use(chatRouter);

function logger(req, res, next) {
    console.info(new Date(), req.method, req.path);
    next();
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
