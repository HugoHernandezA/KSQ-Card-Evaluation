import { dbPool } from "../utils/index.js";

export const getCards = async (req, res) => {
    const response = await dbPool.query('SELECT * FROM card ORDER BY id ASC');

    res.status(200).json(response.rows);
}

export const getCardById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await dbPool.query('SELECT * FROM card WHERE id = $1', [id]);

    res.json(response.rows);
};

export const createCard = async (req, res) => {
    const { title, description, rating } = req.body;
    await dbPool.query('INSERT INTO card (title, description, rating) VALUES ($1, $2, $3)', [title, description, rating]);

    res.status(200).json({
        message: 'Card Added successfully',
        body: {
            card: { title, description, rating }
        }
    });
};

export const updateCard = async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, rating } = req.body;

    await dbPool.query('UPDATE card SET title = $1, description = $2, rating = $3 WHERE id = $4', [
        title,
        description,
        rating,
        id
    ]);

    res.status(200).json({
        message: 'Card Updated Successfully',
        body: {
            card: { id, title, description, rating }
        }
    });
};

export const deleteCard = async (req, res) => {
    const id = parseInt(req.params.id);
    await dbPool.query('DELETE FROM card where id = $1', [
        id
    ]);

    res.status(200).json(`Card with id: ${id} was deleted successfully`);
};