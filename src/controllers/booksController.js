import db from "../models";
import { validateBook } from "../validators/book.validator";

export class BooksController {
  static async createBook(req, res) {
    try {
      const bookData = req.body;

      const { error } = validateBook(bookData);

      if (error) {
        return res
          .status(400)
          .json({ message: "Invalid input", error: error.details });
      }
      const check = await db.Category.findOne({
        where: { id: bookData.category_id },
      });
      if (!check) {
        return res
          .status(404)
          .json({ message: `Category ${bookData.category_id} not found!` });
      }
      const existingBook = await db.Book.findOne({
        where: { title: bookData.title },
      });
      if (existingBook) {
        return res.status(400).json({ message: "Book already exists" });
      }

      const newBook = await db.Book.create(bookData);

      return res
        .status(200)
        .json({ message: "Book registered successfully", book: newBook });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  static async getBook(req, res) {
    try {
      const books = await db.Book.findAll();
      return res.status(200).json({ message: "get book success", books });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
  static async getBookById(req, res) {
    try {
      const { id } = req.params;
      const book = await db.Book.findByPk(id);

      if (!book) {
        return res
          .status(404)
          .json({ message: `Book with ID ${id} not found` });
      }

      return res
        .status(200)
        .json({ message: `Get book by ${id} success`, book });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
  static async updateBook(req, res) {
    try {
      const { id } = req.params;
      const bookData = req.body;

      const { error } = validateBook(bookData);

      if (error) {
        return res
          .status(400)
          .json({ message: "Invalid input", error: error.details });
      }
      await db.Book.update(bookData, { where: { id } });

      const updatedBook = await db.Book.findByPk(id);
      return res
        .status(200)
        .json({ message: "Book updated success", book: updatedBook });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
  static async deleteBook(req, res) {
    try {
      const {id} = req.params

      const existingBook = await db.Book.findByPk(id);
      if (!existingBook) {
        return res.status(404).json({ message: `Book with ID ${id} not found` });
      }
      await db.Book.destroy({ where: { id } });

      return res.status(200).json({ message: "Book deleted success", data: existingBook});
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}
