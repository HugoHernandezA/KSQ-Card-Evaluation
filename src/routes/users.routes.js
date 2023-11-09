import { Router } from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/users.controller.js"; 

export const usersRouter = Router();

usersRouter.get('/api/users', getUsers)
usersRouter.get('/api/users/:id', getUserById);
usersRouter.post('/api/users', createUser);
usersRouter.put('/api/users/:id', updateUser)
usersRouter.delete('/api/users/:id', deleteUser);

