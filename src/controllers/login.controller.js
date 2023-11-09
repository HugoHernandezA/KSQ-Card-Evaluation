import { dbPool } from "../utils/index.js";
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
    const { email, password} = req.body;

    try {
        const response = await dbPool.query('SELECT * FROM userx WHERE email = $1', [email]);
        if (response.rows.length < 1) return res.status(404).json({ message: 'User was not found on db'});

        const isValidPassword = await bcrypt.compare(password, response.rows[0].password);
        if (!isValidPassword) return res.status(400).json({ message: 'Password is incorrect for this user'});

        res.status(200).json({ message: 'Login Succesful'});

    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: 'Error: User login was not possible',
            description: err.message
        });
    }
}