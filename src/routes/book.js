import express from "express";
import { BooksController } from "../controllers/booksController";
import { BOOLEAN } from "sequelize";

const router = express.Router();

router.post("/", BooksController.createBook);
router.get('/', BooksController.getBook)
router.get('/:id', BooksController.getBookById)
router.put('/:id', BooksController.updateBook)
router.delete('/:id',BooksController.deleteBook)

export default router;
