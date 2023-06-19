const express = require('express');
const { getAllUser } = require('../handlers/user');
const { getUser } = require('../handlers/user');
const { createUser, loginUser } = require('../handlers/user');
const userRouter = express.Router();

userRouter.post('/createuser', createUser);
userRouter.post('/login', loginUser);
userRouter.get('/getuser', getUser);
userRouter.get('/getall', getAllUser);



module.exports = { userRouter };