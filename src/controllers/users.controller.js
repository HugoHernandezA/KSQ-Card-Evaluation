import { dbPool } from "../utils/index.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    const response = await dbPool.query('SELECT * FROM userx ORDER BY id ASC');

    res.status(200).json(response.rows);
}

export const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await dbPool.query('SELECT * FROM userx WHERE id = $1', [id]);

    res.json(response.rows);
};

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);

    try {
        const response = await dbPool.query('INSERT INTO userx (name, email, password) VALUES ($1, $2, $3)', [name, email, encryptedPassword]);
        const createdUser = await dbPool.query('SELECT * FROM userx WHERE email = $1', [email]);

        res.status(200).json({
            message: 'User Added successfully',
            body: {
                user: { id: createdUser.rows[0].id, name, email, encryptedPassword }
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: 'Error: User was not able to be created on database',
            description: err.message
        });
    }
};

export const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, password } = req.body;

    await dbPool.query('UPDATE userx SET name = $1, email = $2, password = $3 WHERE id = $4', [
        name,
        email,
        password,
        id
    ]);

    res.status(200).json({
        message: 'User Updated Successfully',
        body: {
            user: { id, name, email, password }
        }
    });
};

export const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await dbPool.query('DELETE FROM userx where id = $1', [
        id
    ]);

    res.status(200).json(`User with id: ${id} was deleted successfully`);
};