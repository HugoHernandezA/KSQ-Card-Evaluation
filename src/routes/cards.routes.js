import { Router } from "express";
import { getCards, getCardById, createCard, updateCard, deleteCard } from "../controllers/cards.controller.js"; 

export const cardsRouter = Router();

cardsRouter.get('/api/cards', getCards)
cardsRouter.get('/api/cards/:id', getCardById);
cardsRouter.post('/api/cards', createCard);
cardsRouter.put('/api/cards/:id', updateCard)
cardsRouter.delete('/api/cards/:id', deleteCard);

