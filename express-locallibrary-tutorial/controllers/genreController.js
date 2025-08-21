import Genre from "../models/genre.js";
import Book from "../models/book.js";
import { body, validationResult } from "express-validator";

// Display list of all Genre.
export const genre_list = async (req, res, next) => {
    const allGenres = await Genre.find().sort({ name: 1 }).exec();
    res.render("genre_list", {
        title: "Genre List",
        list_genres: allGenres,
    });
};

// Display detail page for a specific Genre.
export const genre_detail = async (req, res, next) => {
    const [genre, booksInGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Book.find({ genre: req.params.id }, "title summary").exec(),
    ]);
    if (genre === null) {
        const err = new Error("Genre not found");
        err.status = 404;
        return next(err);
    }

    res.render("genre_detail", {
        title: "Genre Detail",
        genre,
        genre_books: booksInGenre,
    });
};

// Display Genre create form on GET.
export const genre_create_get = async (req, res, next) => {
    res.render("genre_form", { title: "Create Genre" });
};

// Handle Genre create on POST.
export const genre_create_post = [
    body("name", "Genre name must contain at least 3 characters").trim().isLength({ min: 3 }).escape(),

    async (req, res, next) => {
        const errors = validationResult(req);

        const genre = new Genre({ name: req.body.name });

        if (!errors.isEmpty()) {
            res.render("genre_form", {
                title: "Create Genre",
                genre,
                errors: errors.array(),
            });
            return;
        }

        const genreExists = await Genre.findOne({ name: req.body.name }).collation({ locale: "en", strength: 2 }).exec();
        if (genreExists) {
            res.redirect(genreExists.url);
            return;
        }

        await genre.save();
        res.redirect(genre.url);
    },
];

// Display Genre delete form on GET.
export const genre_delete_get = async (req, res, next) => {
    const [genre, booksInGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Book.find({ genre: req.params.id }, "title summary").exec(),
    ]);
    if (genre === null) {
        res.redirect("/catalog/genres");
    }

    res.render("genre_delete", {
        title: "Delete Genre",
        genre,
        genre_books: booksInGenre,
    });
};

// Handle Genre delete on POST.
export const genre_delete_post = async (req, res, next) => {
    const [genre, booksInGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Book.find({ genre: req.params.id }, "title summary").exec(),
    ]);

    if (booksInGenre.length > 0) {
        res.render("genre_delete", {
            title: "Delete Genre",
            genre,
            genre_books: booksInGenre,
        });
        return;
    }

    await Genre.findByIdAndDelete(req.body.id);
    res.redirect("/catalog/genres");
};

// Dispay Grenre update form on GET.
export const genre_update_get = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Genre update GET");
};

// Handle Genre update on POST.
export const genre_update_post = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Genre update POST");
};