require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDatabase = require("./database");
const chatRouter = require("./routes/chat");
const { userRouter } = require('./routes/user');

const app = express();
const port = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());
app.use(logger);
app.use(chatRouter);
app.use(userRouter);

function logger(req, res, next) {
    console.info(new Date(), req.method, req.path);
    next();
}
connectDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});