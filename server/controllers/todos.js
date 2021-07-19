import express from 'express';
import Todo from '../models/Todo.js';
import jwt from 'jsonwebtoken';

const route = express.Router();

export const getTodos = async (req, res) => {
    // verify
    jwt.verify(req.headers.token, 'secretkey', async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'not authorized'
        });

        const todos = await Todo.find({ author: decoded.userId }).populate('author', 'username').exec();

        if (!todos) {
            return res.status(400).json({ message: "Can not find any todos!" })
        } else {
            return res.status(200).json({
                title: 'success',
                todos: todos
            })
        }
    })
}

export const postTodo = (req, res) => {
    // verify
    jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'not authorized'
        });

        let newTodo = new Todo({
            title: req.body.title,
            isCompleted: false,
            author: decoded.userId
        });

        newTodo.save(error => {
            if (error) return console.log(error);
            return res.status(200).json({
                title: "successfully added",
                todo: newTodo
            })
        })
    })
};

export const updateTodo = (req, res) => {
    jwt.verify(req.headers.token, 'secretkey', async (err, decoded) => {
        try {
            if (err) return res.status(401).json({
                title: 'not authorized'
            });

            // now we know token is valid
            const updatedTodo = await Todo.findOneAndUpdate({ author: decoded.userId, _id: req.params.todoId }, req.body)

            const todos = await Todo.find({ author: decoded.userId });

            //saved
            return res.status(200).json({
                title: 'success',
                todo: updatedTodo,
                todos: todos
            });
        } catch (err) {
            throw err
        }
    });
}

export const deleteTodo = (req, res) => {
    jwt.verify(req.headers.token, 'secretkey', async (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'not authorized'
        });

        // now we know token is valid
        const todo = await Todo.findOneAndDelete({ author: decoded.userId, _id: req.params.todoId })

        if (!todo) return res.status(400).json({ message: "Can not deleted post cuz it does not exist" })
        return res.status(200).json({
            title: 'success',
            todo: todo
        });
    });
}

export default route;