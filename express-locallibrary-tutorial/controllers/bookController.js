import Book from "../models/book.js";
import Author from "../models/author.js";
import Genre from "../models/genre.js";
import BookInstance from "../models/bookinstance.js";
import { body, validationResult } from "express-validator";

// Home page summary
export const index = async (req, res, next) => {
  try {
    const [
      book_count,
      book_instance_count,
      book_instance_available_count,
      author_count,
      genre_count
    ] = await Promise.all([
      Book.countDocuments({}).exec(),
      BookInstance.countDocuments({}).exec(),
      BookInstance.countDocuments({ status: "Available" }).exec(),
      Author.countDocuments({}).exec(),
      Genre.countDocuments({}).exec()
    ]);
    res.json({
      books: book_count,
      bookInstances: book_instance_count,
      availableInstances: book_instance_available_count,
      authors: author_count,
      genres: genre_count
    });
  } catch (err) {
    next(err);
  }
};

// List all books
export const book_list = async (req, res, next) => {
  try {
    const books = await Book.find({}, "title author").populate("author").exec();
    res.json(books);
  } catch (err) {
    next(err);
  }
};

// Book detail
export const book_detail = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate("author genre").exec();
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    const book_instances = await BookInstance.find({ book: req.params.id }).exec();
    res.json({ book, book_instances });
  } catch (err) {
    next(err);
  }
};

// Create book (POST)
export const book_create = [
  body("title", "Title must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("author", "Author must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("summary", "Summary must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("isbn", "ISBN must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),

  async (req, res, next) => {
    const errors = validationResult(req);
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), book });
    }
    try {
      await book.save();
      res.status(201).json(book);
    } catch (err) {
      next(err);
    }
  }
];

// Delete book (POST)
export const book_delete = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted", book });
  } catch (err) {
    next(err);
  }
};

// Update book (POST)
export const book_update = [
  body("title", "Title must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("author", "Author must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("summary", "Summary must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("isbn", "ISBN must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),

  async (req, res, next) => {
    const errors = validationResult(req);
    const book = {
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre
    };

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), book });
    }
    try {
      const updatedBook = await Book.findByIdAndUpdate(req.params.id, book, { new: true });
      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.json(updatedBook);
    } catch (err) {
      next(err);
    }
  }
];