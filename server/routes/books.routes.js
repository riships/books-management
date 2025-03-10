import { Router } from "express";
import { getAllBooks, addBook } from "../controller/book.controller.js";
import { validateBook } from '../middlewares/bookValidation.js';

const router = Router();

router.route('/').get(getAllBooks).post(validateBook, addBook);

export default router;  //export the router to use it in other files