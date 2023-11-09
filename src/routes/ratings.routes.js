import { Router } from "express";
import { getRatings, getRatingById, createRating, updateRating, deleteRating } from "../controllers/ratings.controller.js"; 

export const ratingsRouter = Router();

ratingsRouter.get('/api/ratings', getRatings)
ratingsRouter.get('/api/ratings/:id', getRatingById);
ratingsRouter.post('/api/ratings', createRating);
ratingsRouter.put('/api/ratings/:id', updateRating)
ratingsRouter.delete('/api/ratings/:id', deleteRating);

