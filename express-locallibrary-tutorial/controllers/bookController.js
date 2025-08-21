import Book from "../models/book.js";
import Author from "../models/author.js";
import Genre from "../models/genre.js";
import BookInstance from "../models/bookinstance.js";
import { body, validationResult } from "express-validator";

export const index = async (req, res, next) => {
    const [
        numBooks,
        numBookInstances,
        numAvailableBookInstances,
        numAuthors,
        numGenres,
    ] = await Promise.all([
        Book.countDocuments({}).exec(),
        BookInstance.countDocuments({}).exec(),
        BookInstance.countDocuments({ status: "Available" }).exec(),
        Author.countDocuments({}).exec(),
        Genre.countDocuments({}).exec(),
    ]);

    res.render("index", {
        title: "Local Library Home",
        book_count: numBooks,
        book_instance_count: numBookInstances,
        book_instance_available_count: numAvailableBookInstances,
        author_count: numAuthors,
        genre_count: numGenres,
    });
};

// Display list of all books.
export const book_list = async (req, res, next) => {
    const allBooks = await Book.find({}, "title author").sort({ title: 1 }).populate("author").exec();

    res.render("book_list", { title: "Book List", book_list: allBooks });
};

// Display detail page for a specific book.
export const book_detail = async (req, res, next) => {
    const [book, bookInstances] = await Promise.all([
        Book.findById(req.params.id).populate("author").populate("genre").exec(),
        BookInstance.find({ book: req.params.id }).exec(),
    ]);

    if (book === null) {
        const err = new Error("Book not found");
        err.status = 404;
        return next(err);
    }

    res.render("book_detail", {
        title: book.title,
        book,
        book_instances: bookInstances,
    });
};

// Display book create form on GET.
export const book_create_get = async (req, res, next) => {
    const [allAuthors, allGenres] = await Promise.all([
        Author.find().sort({ family_name: 1 }).exec(),
        Genre.find().sort({ name: 1 }).exec(),
    ]);

    res.render("book_form", {
        title: "Create Book",
        authors: allAuthors,
        genres: allGenres,
    });
};

// Handle book create on POST.
export const book_create_post = [
    async (req, res, next) => {
        if (!Array.isArray(req.body.genre)) {
            req.body.genre = typeof req.body.genre === "undefined" ? [] : [req.body.genre];
        }
        next();
    },

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
            genre: req.body.genre,
        });

        if (!errors.isEmpty()) {
            const [allAuthors, allGenres] = await Promise.all([
                Author.find().sort({ family_name: 1 }).exec(),
                Genre.find().sort({ name: 1 }).exec(),
            ]);

            for (const genre of allGenres) {
                if (book.genre.includes(genre._id)) {
                    genre.checked = "true";
                }
            }
            res.render("book_form", {
                title: "Create Book",
                authors: allAuthors,
                genres: allGenres,
                book,
                errors: errors.array(),
            });
            return;
        }

        await book.save();
        res.redirect(book.url);
    }
];

// Display book delete form on GET.
export const book_delete_get = async (req, res, next) => {
    const [book, bookInstances] = await Promise.all([
        Book.findById(req.params.id).populate("author").populate("genre").exec(),
        BookInstance.find({ book: req.params.id }).exec(),
    ]);

    if (book === null) {
        res.redirect("/catalog/books");
    }

    res.render("book_delete", {
        title: "Delete Book",
        book,
        book_instances: bookInstances,
    });
};

// Handle book delete on POST.
export const book_delete_post = async (req, res, next) => {
    const [book, bookInstances] = await Promise.all([
        Book.findById(req.params.id).populate("author").populate("genre").exec(),
        BookInstance.find({ book: req.params.id }).exec(),
    ]);

    if (book === null) {
        res.redirect("/catalog/books");
    }

    if(bookInstances.length > 0) {
        res.render("book_delete", {
            title: "Delete Book",
            book,
            book_instances: bookInstances,
        });
        return;
    }

    await Book.findByIdAndDelete(req.body.id);
    res.redirect("/catalog/books");
};

// Display book update form on GET.
export const book_update_get = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book update GET");
};

// Handle book update on POST.
export const book_update_post = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book update POST");
};