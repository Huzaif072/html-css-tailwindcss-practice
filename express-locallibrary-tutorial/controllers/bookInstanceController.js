import BookInstance from "../models/bookinstance.js";
import Book from "../models/book.js";
import { body, validationResult } from "express-validator";

// Display list of all BookInstances.
export const bookinstance_list = async (req, res, next) => {
    const allBookInstances = await BookInstance.find().populate("book").exec();

    res.render("bookinstance_list", {
        title: "Book Instance List",
        bookinstance_list: allBookInstances,
    });
};

// Display detail page for a specific BookInstance.
export const bookinstance_detail = async (req, res, next) => {
    const bookInstance = await BookInstance.findById(req.params.id).populate("book").exec();

    if (bookInstance === null) {
        const err = new Error("Book copy not found");
        err.status = 404;
        return next(err);
    }

    res.render("bookinstance_detail", {
        title: "Book:",
        bookinstance: bookInstance,
    });
};

// Display BookInstance create form on GET.
export const bookinstance_create_get = async (req, res, next) => {
    const allBooks = await Book.find({}, "title").sort({ title: 1 }).exec();

    res.render("bookinstance_form", {
        title: "Create BookInstance",
        book_list: allBooks,
    });
};

// Handle BookInstance create on POST.
export const bookinstance_create_post = [
    body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
    body("imprint", "Imprint must be specified").trim().isLength({ min: 1 }).escape(),
    body("status").escape(),
    body("due_back", "Invalid date").optional({ values: "falsy" }).isISO8601().toDate(),

    async (req, res, next) => {
        const errors = validationResult(req);

        const bookInstance = new BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back,
        });

        if (!errors.isEmpty()) {
            const allBooks = await Book.find({}, "title").sort({ title: 1 }).exec();

            res.render("bookinstance_form", {
                title: "Create BookInstance",
                book_list: allBooks,
                selected_book: bookInstance.book._id,
                errors: errors.array(),
                bookinstance: bookInstance,
            });
            return;
        }

        await bookInstance.save();
        res.redirect(bookInstance.url);
    },
];

// Display BookInstance delete form on GET.
export const bookinstance_delete_get = async (req, res, next) => {
    const bookInstance = await BookInstance.findById(req.params.id).populate("book").exec();

    if (bookInstance === null) {
        res.redirect("/catalog/bookinstances");
    }

    res.render("bookinstance_delete", {
        title: "Delete BookInstance",
        bookinstance: bookInstance,
    });
};

// Handle BookInstance delete on POST.
export const bookinstance_delete_post = async (req, res, next) => {
    await BookInstance.findByIdAndDelete(req.body.id);
    res.redirect("/catalog/bookinstances");
};

// Display BookInstance update form on GET.
export const bookinstance_update_get = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: BookInstance update GET");
};

// Handle BookInstance update on POST.
export const bookinstance_update_post = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: BookInstance update POST");
};