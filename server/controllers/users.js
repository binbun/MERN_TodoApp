import express from 'express';
import User from '../models/User.js';
import Todo from '../models/Todo.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const route = express.Router();

// get admin route
export const getAllUserProfiles = (req, res) => {
    try {
        jwt.verify(req.headers.token, 'secretkey', async (err) => {
            if (err) return res.status(401).json({
                title: 'not authorized'
            });

            const users = await User.find();

            return res.status(200).json({
                title: 'success',
                users: users
            })
        })
    } catch (error) {
        throw error
    }
}

// get user route
export const signup = (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        });

        const adminCode = req.body.adminCode;
        if (adminCode === 'bindz') newUser.isAdmin = true;

        newUser.save(err => {
            if (err) {
                return res.status(400).json({
                    title: 'error',
                    error: 'Email already in use'
                })
            }
            return res.status(200).json({
                title: 'user successfully added'
            })
        })
    } catch (error) {
        throw error;
    }
};

export const login = (req, res) => {
    try {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) return res.status(500).json({
                title: 'server error',
                error: err
            });
            if (!user) {
                return res.status(400).json({
                    title: 'user is not found',
                    error: 'invalid username or password'
                })
            }
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(401).json({
                    title: 'login failed',
                    error: 'invalid username or password'
                })
            }

            // authentication is done, give them a token
            let token = jwt.sign({ userId: user._id }, 'secretkey');
            return res.status(200).json({
                title: 'login successful',
                token: token,
                user: user
            });
        })
    } catch (error) {
        throw error
    }
};

export const getUserProfile = (req, res) => {
    try {
        jwt.verify(req.headers.token, 'secretkey', async (err, decoded) => {
            if (err) return res.status(401).json({
                title: 'not authorized'
            });

            const user = await User.findOne({ email: req.headers.email });
            const todos = await Todo.find({ author: decoded.userId }).populate('author', 'username').exec();

            return res.status(200).json({
                title: 'success',
                user: user,
                todos: todos
            })
        })
    } catch (error) {
        throw error;
    }
}

export default route;