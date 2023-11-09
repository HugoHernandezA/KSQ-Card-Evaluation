import express from 'express';
import 'dotenv/config'
import { cardsRouter } from './routes/cards.routes.js';
import { ratingsRouter } from './routes/ratings.routes.js';
import { usersRouter } from './routes/users.routes.js';
import { loginRouter } from './routes/login.routes.js';
import { verifyToken } from './routes/utils/tokenVerification.js';

const app = express();
const port = process.env.PORT;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use(usersRouter);
app.use(loginRouter);
app.use(verifyToken, cardsRouter);
app.use(verifyToken, ratingsRouter);

app.listen(port, () => {
    console.log('Server listening on port 3000');
});