import User from "../models/User.js";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new BadRequestError("Please fill all the fields.");
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
        throw new BadRequestError("Email already in use ");
    }

    const user = await User.create({ name, email, password });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
        user: {
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            name: user.name,
        },
        token,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("Please fill all the fields.");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new UnauthenticatedError("Invalid Credentials");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    user.password = undefined;
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid Credentials");
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const updateUser = async (req, res) => {
    const { email, name, lastName, location } = req.body;
    if (!email || !name || !lastName || !location) {
        throw new BadRequestError("Please provide all values");
    }
    const user = await User.findOne({ _id: req.user.userId });

    user.email = email;
    user.name = name;
    user.lastName = lastName;
    user.location = location;
    await user.save();

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const getUserInfo = async (req, res) => {
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(" ")[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, process.env.JWT_SECRET);
        } catch (e) {
            throw new UnauthenticatedError("Invalid Credentials");
        }
        var userId = decoded.userId;
        const { name, email, lastName, location, _id } = await User.findOne({
            _id: userId,
        });
        res.status(StatusCodes.OK).json({
            _id,
            name,
            email,
            lastName,
            location,
        });
    }
    return res.send(500);
};

export { register, login, updateUser, getUserInfo };
