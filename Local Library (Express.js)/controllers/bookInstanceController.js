import BookInstance from "../models/bookinstance.js";
import Book from "../models/book.js";
import { body, validationResult } from "express-validator";

// List all book instances
export const bookinstance_list = async (req, res, next) => {
  try {
    const bookinstances = await BookInstance.find().populate("book").exec();
    res.json(bookinstances);
  } catch (err) {
    next(err);
  }
};

// Book instance detail
export const bookinstance_detail = async (req, res, next) => {
  try {
    const bookinstance = await BookInstance.findById(req.params.id).populate("book").exec();
    if (!bookinstance) {
      return res.status(404).json({ message: "BookInstance not found" });
    }
    res.json(bookinstance);
  } catch (err) {
    next(err);
  }
};

// Create book instance (POST)
export const bookinstance_create = [
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified").trim().isLength({ min: 1 }).escape(),
  body("status").escape(),
  body("due_back", "Invalid date").optional({ values: "falsy" }).isISO8601().toDate(),

  async (req, res, next) => {
    const errors = validationResult(req);
    const bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), bookinstance });
    }
    try {
      await bookinstance.save();
      res.status(201).json(bookinstance);
    } catch (err) {
      next(err);
    }
  }
];

// Delete book instance (POST)
export const bookinstance_delete = async (req, res, next) => {
  try {
    const bookinstance = await BookInstance.findByIdAndDelete(req.params.id);
    if (!bookinstance) {
      return res.status(404).json({ message: "BookInstance not found" });
    }
    res.json({ message: "BookInstance deleted", bookinstance });
  } catch (err) {
    next(err);
  }
};

// Update book instance (POST)
export const bookinstance_update = [
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified").trim().isLength({ min: 1 }).escape(),
  body("status").escape(),
  body("due_back", "Invalid date").optional({ values: "falsy" }).isISO8601().toDate(),

  async (req, res, next) => {
    const errors = validationResult(req);
    const bookinstance = {
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    };

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), bookinstance });
    }
    try {
      const updatedBookInstance = await BookInstance.findByIdAndUpdate(req.params.id, bookinstance, { new: true });
      if (!updatedBookInstance) {
        return res.status(404).json({ message: "BookInstance not found" });
      }
      res.json(updatedBookInstance);
    } catch (err) {
      next(err);
    }
  }
];