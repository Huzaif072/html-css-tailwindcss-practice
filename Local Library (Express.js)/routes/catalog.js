import express from 'express';
import * as book_controller from '../controllers/bookController.js';
import * as author_controller from '../controllers/authorController.js';
import * as genre_controller from '../controllers/genreController.js';
import * as book_instance_controller from '../controllers/bookInstanceController.js';

const router = express.Router();

// BOOK ROUTES
router.get("/", book_controller.index);
router.get("/books", book_controller.book_list);
router.get("/book/:id", book_controller.book_detail);
router.post("/book/create", book_controller.book_create);
router.put("/book/:id/update", book_controller.book_update);
router.delete("/book/:id/delete", book_controller.book_delete);

// AUTHOR ROUTES
router.get("/authors", author_controller.author_list);
router.get("/author/:id", author_controller.author_detail);
router.post("/author/create", author_controller.author_create);
router.put("/author/:id/update", author_controller.author_update);
router.delete("/author/:id/delete", author_controller.author_delete);

// GENRE ROUTES
router.get("/genres", genre_controller.genre_list);
router.get("/genre/:id", genre_controller.genre_detail);
router.post("/genre/create", genre_controller.genre_create);
router.put("/genre/:id/update", genre_controller.genre_update);
router.delete("/genre/:id/delete", genre_controller.genre_delete);

// BOOKINSTANCE ROUTES
router.get("/bookinstances", book_instance_controller.bookinstance_list);
router.get("/bookinstance/:id", book_instance_controller.bookinstance_detail);
router.post("/bookinstance/create", book_instance_controller.bookinstance_create);
router.put("/bookinstance/:id/update", book_instance_controller.bookinstance_update);
router.delete("/bookinstance/:id/delete", book_instance_controller.bookinstance_delete);

export default router;