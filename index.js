import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
import bookRouter from './routes/bookRoutes.js';
import morgan from 'morgan';
import helmet from 'helmet';
import { _logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(_logger);

//routes
app.use('/auth', authRoute);
app.use('/books', bookRouter);

//error middleware
app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
})

