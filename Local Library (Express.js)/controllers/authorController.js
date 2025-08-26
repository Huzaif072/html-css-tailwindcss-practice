import Author from "../models/author.js";
import Book from "../models/book.js";
import { body, validationResult } from "express-validator";

// List all authors
export const author_list = async (req, res, next) => {
  try {
    const allAuthors = await Author.find().sort({ family_name: 1 }).exec();
    res.json(allAuthors);
  } catch (err) {
    next(err);
  }
};

// Author detail
export const author_detail = async (req, res, next) => {
  try {
    const [author, allBooksByAuthor] = await Promise.all([
      Author.findById(req.params.id).exec(),
      Book.find({ author: req.params.id }, "title summary").exec(),
    ]);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.json({ author, books: allBooksByAuthor });
  } catch (err) {
    next(err);
  }
};

// Create author (POST /api/authors)
export const author_create = [
  body("first_name")
    .trim()
    .isLength({ min: 1 }).withMessage("First name must be specified.")
    .isAlphanumeric().withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({ min: 1 }).withMessage("Family name must be specified.")
    .isAlphanumeric().withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "Invalid date of birth")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  async (req, res, next) => {
    const errors = validationResult(req);
    const author = new Author(req.body);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), author });
    }
    try {
      await author.save();
      res.status(201).json(author);
    } catch (err) {
      next(err);
    }
  },
];

// Delete author (DELETE /api/authors/:id)
export const author_delete = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.json({ message: "Author deleted", author });
  } catch (err) {
    next(err);
  }
};

// Update author (PUT /api/authors/:id)
export const author_update = [
  body("first_name")
    .trim()
    .isLength({ min: 1 }).withMessage("First name must be specified.")
    .isAlphanumeric().withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({ min: 1 }).withMessage("Family name must be specified.")
    .isAlphanumeric().withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "Invalid date of birth")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  async (req, res, next) => {
    const errors = validationResult(req);
    const authorData = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), author: authorData });
    }
    try {
      const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, authorData, { new: true });
      if (!updatedAuthor) {
        return res.status(404).json({ message: "Author not found" });
      }
      res.json(updatedAuthor);
    } catch (err) {
      next(err);
    }
  },
];