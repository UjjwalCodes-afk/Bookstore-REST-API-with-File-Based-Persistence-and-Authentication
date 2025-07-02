import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { addBook, deleteBookById, getBookById, getBooks, updateBookById } from '../controllers/bookController.js';


const bookRouter = express.Router();

//protected route
bookRouter.use(authMiddleware);

bookRouter.get('/getBooks',getBooks);
bookRouter.get('/:id', getBookById);
bookRouter.post('/addBook', addBook);
bookRouter.put('/updateBook/:id', updateBookById);
bookRouter.delete('/deleteBook/:id', deleteBookById);

export default bookRouter;