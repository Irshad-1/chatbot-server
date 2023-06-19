const jwt = require('jsonwebtoken');
const { User } = require('../database/user');
const bcrypt = require('bcrypt');
const secret = process.env.SECRET;



// create a new user
const createUser = async (req, res) => {
    try {
        console.log("Hello");
        const { name, age, gender, role, email, password } = req.body;
        const check = await User.findOne({ email });
        if (check) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }
        else {

            let newPassword = await bcrypt.hash(password, 8);


            const newUser = await User.create({ name, age, gender, role, email, password: newPassword });

            let response = newUser.toJSON();
            delete response.password;
            return res.status(201).send(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error || 'Internal Server Error' });
    }
}

// login a user
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email }).populate('password');
        if (!user) {
            return res.status(400).send({
                message: 'User does not exist'
            });
        }
        else {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                let token = jwt.sign({ _id: user._id }, secret);
                return res.status(200).send({ token: token });
            }
            else {
                return res.status(400).send({ message: 'Invalid password' });
            }
        }
    } catch (error) {
        return res.status(500).send({ message: error || 'Internal Server Error' });
    }
}

// get user
const getUser = async (req, res) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).send({ message: 'No token provided' });
        }
        const decoded = jwt.verify(token, secret);
        const user = await User.findOne({ _id: decoded._id });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ message: error || 'Internal Server Error' });
    }
}

const getAllUser = async (req, res) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).send({ message: 'No token provided' });
        }
        const decoded = jwt.verify(token, secret);
        const user = await User.findOne({ _id: decoded._id });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (user.role == "project manager") {
            const users = await User.find();
            return res.send(users);
        }
        else {
            return res.status(404).send({ message: 'Unauthorized access' });
        }
    } catch (error) {
        return res.status(500).send({ message: error || 'Internal Server Error' });
    }
}

const uploadImage = async (req, res) => {
    // req.file can be used to access all file properties
    try {
        //check if the request has an image or not
        if (!req.file) {
            res.json({
                success: false,
                message: "You must provide at least 1 file"
            });
        } else {
            let imageUploadObject = {
                file: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                },
                fileName: req.body.fileName
            };
            const uploadObject = new Upload(imageUploadObject);
            // saving the object into the database
            const uploadProcess = await uploadObject.save();
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

module.exports = {
    createUser,
    loginUser, getUser, getAllUser

}