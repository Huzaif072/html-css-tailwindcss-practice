import Genre from "../models/genre.js";
import Book from "../models/book.js";
import { body, validationResult } from "express-validator";

// Display list of all Genre.
export const genre_list = async (req, res, next) => {
    try {
        const allGenres = await Genre.find().sort({ name: 1 }).exec();
        res.json(allGenres);
    } catch (err) {
        next(err);
    }
};

// Display detail page for a specific Genre.
export const genre_detail = async (req, res, next) => {
    try {
        const [genre, booksInGenre] = await Promise.all([
            Genre.findById(req.params.id).exec(),
            Book.find({ genre: req.params.id }, "title summary").exec(),
        ]);
        if (!genre) {
            return res.status(404).json({ message: "Genre not found" });
        }
        res.json({ genre, books: booksInGenre });
    } catch (err) {
        next(err);
    }
};

// Handle Genre create on POST.
export const genre_create = [
    body("name", "Genre name must contain at least 3 characters").trim().isLength({ min: 3 }).escape(),

    async (req, res, next) => {
        const errors = validationResult(req);

        const genre = new Genre({ name: req.body.name });

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), genre });
        }

        try {
            const genreExists = await Genre.findOne({ name: req.body.name }).collation({ locale: "en", strength: 2 }).exec();
            if (genreExists) {
                return res.status(409).json({ message: "Genre already exists", genre: genreExists });
            }

            await genre.save();
            res.status(201).json(genre);
        } catch (err) {
            next(err);
        }
    },
];

// Handle Genre delete on POST.
export const genre_delete = async (req, res, next) => {
    try {
        const [genre, booksInGenre] = await Promise.all([
            Genre.findById(req.params.id).exec(),
            Book.find({ genre: req.params.id }, "title summary").exec(),
        ]);

        if (!genre) {
            return res.status(404).json({ message: "Genre not found" });
        }

        if (booksInGenre.length > 0) {
            return res.status(400).json({ message: "Cannot delete genre with books", genre, books: booksInGenre });
        }

        await Genre.findByIdAndDelete(req.params.id);
        res.json({ message: "Genre deleted" });
    } catch (err) {
        next(err);
    }
};

// Handle Genre update on POST.
export const genre_update = [
    body("name", "Genre name must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),

    async (req, res, next) => {
        const errors = validationResult(req);

        const genre = {
            name: req.body.name,
        };

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), genre });
        }

        try {
            const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, genre, { new: true });
            if (!updatedGenre) {
                return res.status(404).json({ message: "Genre not found" });
            }
            res.json(updatedGenre);
        } catch (err) {
            next(err);
        }
    },
];