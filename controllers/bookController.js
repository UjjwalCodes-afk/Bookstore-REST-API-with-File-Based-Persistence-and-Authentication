import { readJSON, writeJSON } from "../services/fileStore.js";
import {v4 as uuid} from 'uuid';
const BOOKS_FILE = 'books.json'
export const getBooks = async (req, res,next) => {
    try {
        let books = await readJSON(BOOKS_FILE);
        if(req.query.genre){
            books = books.filter(b => b.genre.toLowerCase () === req.query.genre.toLowerCase());
        }
        const page = parseInt(req.query.page || '1', 10);
        const limit = parseInt(req.query.limit || '10', 10);
        const start = (page - 1) * limit;
        const end = start + limit;
        const paged = books.slice(start,end);

        res.json({page,limit,total : books.length, data : paged});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const getBookById = async(req, res,next) => {
    try {
        const books = await readJSON(BOOKS_FILE);
        const book = books.find(b => b.id === req.params.id);
        if(!book) return res.status(404).json({message : 'Book not found'});
        res.json({message : 'Book found', book});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const addBook = async(req, res, next) => {
    try {
        const {title,author,genre,publishedYear} = req.body;
        if(!title || !author || !genre || !publishedYear){
            return res.status(400).json({message : 'Missing fields'});
        }
        const books = await readJSON(BOOKS_FILE);
        const book = {
            id : uuid(),
            title,
            author,
            genre,
            publishedYear,
            userId : req.user.id
        }
        const exists = books.find(b => 
            b.title.toLowerCase() === title.toLowerCase() && b.author.toLowerCase() === author.toLowerCase() && b.genre.toLowerCase() === genre.toLowerCase() && b.publishedYear.toLowerCase() === publishedYear.toLowerCase()
        )
        if(exists){
            return res.status(400).json({message : 'Book already exists'});
        }
        books.push(book);
        await writeJSON(BOOKS_FILE, books);
        res.status(201).json({message : 'Book is Added', book});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const updateBookById = async(req,res,next) => {
    try {
        const books = await readJSON(BOOKS_FILE);
        const index = books.findIndex(b => b.id === req.params.id);
        if(index === -1) return res.status(404).json({ error: 'Book not found' });

        const book = books[index];
        if(book.userId !== req.user.id){
            return res.status(403).json({message : 'Forbidden'});
        }
        const updated = {...book, ...req.body};
        books[index] = updated;
        await writeJSON(BOOKS_FILE, books);
        return res.status(200).json({message : 'Book is updated successfully', updated});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const deleteBookById = async(req,res,next) => {
    try {
        const books = await readJSON(BOOKS_FILE);
        const index=  books.findIndex(b => b.id === req.params.id);
        if(index === -1) return res.status(404).json({ error: 'Book not found' });
        if(books[index].userId !== req.user.id){
            return res.status(403).json({message : 'Forbidden'});
        }
        const [removed] = books.splice(index,1);
        await writeJSON(BOOKS_FILE,books);
        return res.status(200).json({message : 'Deleted', removed});
    } catch (error) {
        console.log(error);
        next(error);
    }
}