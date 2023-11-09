import { dbPool } from "../utils/index.js";

export const getRatings = async (req, res) => {
    const response = await dbPool.query('SELECT * FROM rating ORDER BY id ASC');

    res.status(200).json(response.rows);
}

export const getRatingById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await dbPool.query('SELECT * FROM rating WHERE id = $1', [id]);

    res.json(response.rows);
};

export const createRating = async (req, res) => {
    const { cardId, comment, value } = req.body;
    const userId = '222';
    await dbPool.query('INSERT INTO rating (card_id, user_id, comment, value) VALUES ($1, $2, $3, $4)', [cardId, userId, comment, value]);

    res.status(200).json({
        message: 'Rating Added successfully',
        body: {
            rating: { cardId, userId, comment, value }
        }
    });
};

export const updateRating = async (req, res) => {
    const id = parseInt(req.params.id);
    const { comment, value } = req.body;

    await dbPool.query('UPDATE rating SET comment = $1, value = $2 WHERE id = $3', [
        comment,
        value,
        id
    ]);

    res.status(200).json({
        message: 'Rating Updated Successfully',
        body: {
            rating: { comment, value }
        }
    });
};

export const deleteRating = async (req, res) => {
    const id = parseInt(req.params.id);
    await dbPool.query('DELETE FROM rating where id = $1', [
        id
    ]);

    res.status(200).json(`Rating with id: ${id} was deleted successfully`);
};