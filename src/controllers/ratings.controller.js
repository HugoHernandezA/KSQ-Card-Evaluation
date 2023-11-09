import { dbPool } from "../utils/index.js";

// GET
export const getRatings = async (req, res) => {
    try {
        const response = await dbPool.query('SELECT * FROM rating ORDER BY id ASC');

        res.status(200).json(response.rows);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: 'Error: Rating was not able to be retrieved',
            description: err.message
        });
    }
}

// GET :ID
export const getRatingById = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const response = await dbPool.query('SELECT * FROM rating WHERE id = $1', [id]);

        res.json(response.rows);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: 'Error: Rating was not able to be retrieved',
            description: err.message
        });
    }
};

// POST
export const createRating = async (req, res) => {
    const { cardId, comment, value } = req.body;
    const userId = req.user.id;

    try {
        await dbPool.query('INSERT INTO rating (card_id, user_id, comment, value) VALUES ($1, $2, $3, $4)', [cardId, userId, comment, value]);
        
        res.status(200).json({
            message: 'Rating Added successfully',
            body: {
                rating: { cardId, userId, comment, value }
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: 'Error: Create rating was not possible',
            description: err.message
        });
    }
};

// PUT
export const updateRating = async (req, res) => {
    const id = parseInt(req.params.id);
    const { comment, value } = req.body;


    try {
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
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: 'Error: Rating was not able to be updated',
            description: err.message
        });
    }
};

// DELETE
export const deleteRating = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await dbPool.query('DELETE FROM rating where id = $1', [
            id
        ]);
    
        res.status(200).json(`Rating with id: ${id} was deleted successfully`);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: 'Error: Rating was not able to be deleted',
            description: err.message
        });
    }
};
