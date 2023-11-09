import { dbPool } from "../utils/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
    const { email, password} = req.body;

    try {
        const response = await dbPool.query('SELECT * FROM userx WHERE email = $1', [email]);
        if (response.rows.length < 1) return res.status(404).json({ message: 'User was not found on db'});

        const isValidPassword = await bcrypt.compare(password, response.rows[0].password);
        if (!isValidPassword) return res.status(400).json({ message: 'Password is incorrect for this user'});

        // Generate JWT Token
        const token = jwt.sign({
            id: response.rows[0].id,
            name: response.rows[0].name,
            email: response.rows[0].email
        }, process.env.JWT_TOKEN_SECRET)

        res.status(200).header('auth-token', token).json({ message: 'Login Successful', data: {token}});

    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: 'Error: User login was not possible',
            description: err.message
        });
    }
}