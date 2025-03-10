import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    publicationYear: {
        type: Number
    },
    ISBN: {
        type: String,
        unique: true,
        required: true
    },
    publisher: {
        type: String

    },
    language: {
        type: String

    },
    pages: {
        type: Number
    },
    format: {
        type: String,
        enum: ['Hardcover', 'Paperback', 'eBook']
    },
    summary: {
        type: String

    },
    coverImage: {
        type: String

    },
    price: {
        type: Number
    },
    stock: {
        type: Number,
        default: 0
    },
    ratings: {
        type: Number,
        default: 0
    },
    reviews: [{
        user: mongoose.Schema.Types.ObjectId,
        comment: String, rating: Number
    }],
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},
    { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
