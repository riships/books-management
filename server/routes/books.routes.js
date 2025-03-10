import { Router } from "express";
import { getAllBooks, addBook } from "../controller/book.controller.js";
import { validateBook } from '../middlewares/bookValidation.js';
import verifyJwt from "../middlewares/jwtVerify.js";

const router = Router();

router
    .route('/')
    .get(verifyJwt, getAllBooks) // Get all books (authentication required)
    .post(verifyJwt, validateBook, addBook); // Validate & add a new book

export default router;  //export the router to use it in other files