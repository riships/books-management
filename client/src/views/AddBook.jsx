import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddBook() {
    const [book, setBook] = useState({
        title: '',
        author: '',
        genre: [],
        publicationYear: '',
        ISBN: '',
        publisher: '',
        language: '',
        pages: '',
        format: '',
        summary: '',
        coverImage: '',
        price: '',
        stock: '',
        category: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            console.log(book);

            const response = await fetch(import.meta.env.VITE_API_URL + '/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'library-auth-token': sessionStorage.getItem('authToken')
                },
                body: JSON.stringify(book)
            });
            const data = await response.json();
            console.log(data);
            if (data.success) {
                alert('Book added successfully!');
                setBook({
                    title: '',
                    author: '',
                    genre: [],
                    publicationYear: '',
                    ISBN: '',
                    publisher: '',
                    language: '',
                    pages: '',
                    format: '',
                    summary: '',
                    coverImage: '',
                    price: '',
                    stock: '',
                    category: ''
                });
            }
            setLoading(false);
        } catch (error) {
            console.log(error);

            setError(error.message);
            alert('Error adding book');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-light py-5 min-vh-100 container-fluid">
            <div className="justify-content-center row">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="shadow card">
                        <div className="p-4 p-md-5 card-body">
                            <h2 className="mb-4 text-center">Add New Book</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        value={book.title}
                                        onChange={handleChange}
                                        placeholder="Enter title"
                                        required
                                    />
                                    <label htmlFor="title">Title</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="author"
                                        name="author"
                                        value={book.author}
                                        onChange={handleChange}
                                        placeholder="Enter author"
                                        required
                                    />
                                    <label htmlFor="author">Author</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="genre"
                                        name="genre"
                                        value={book.genre}
                                        onChange={handleChange}
                                        placeholder="Enter genres (comma-separated)"
                                        required
                                    />
                                    <label htmlFor="genre">Genres (comma-separated)</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="category"
                                        name="category"
                                        value={book.category}
                                        onChange={handleChange}
                                        placeholder="Enter Category"
                                        required
                                    />
                                    <label htmlFor="category">Category</label>
                                </div>


                                <div className="form-floating mb-3">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="publicationYear"
                                        name="publicationYear"
                                        value={book.publicationYear}
                                        onChange={handleChange}
                                        placeholder="Enter publication year"
                                    />
                                    <label htmlFor="publicationYear">Publication Year</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ISBN"
                                        name="ISBN"
                                        value={book.ISBN}
                                        onChange={handleChange}
                                        placeholder="Enter ISBN"
                                        required
                                    />
                                    <label htmlFor="ISBN">ISBN</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="publisher"
                                        name="publisher"
                                        value={book.publisher}
                                        onChange={handleChange}
                                        placeholder="Enter publisher"
                                    />
                                    <label htmlFor="publisher">Publisher</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="language"
                                        name="language"
                                        value={book.language}
                                        onChange={handleChange}
                                        placeholder="Enter language"
                                    />
                                    <label htmlFor="language">Language</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="pages"
                                        name="pages"
                                        value={book.pages}
                                        onChange={handleChange}
                                        placeholder="Enter number of pages"
                                        required
                                    />
                                    <label htmlFor="pages">Pages</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <select
                                        className="form-select"
                                        id="format"
                                        name="format"
                                        value={book.format}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select format</option>
                                        <option value="Hardcover">Hardcover</option>
                                        <option value="Paperback">Paperback</option>
                                        <option value="eBook">eBook</option>
                                    </select>
                                    <label htmlFor="format">Format</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="price"
                                        name="price"
                                        value={book.price}
                                        onChange={handleChange}
                                        placeholder="Enter price"
                                        step="0.01"
                                    />
                                    <label htmlFor="price">Price</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="stock"
                                        name="stock"
                                        value={book.stock}
                                        onChange={handleChange}
                                        placeholder="Enter stock"
                                    />
                                    <label htmlFor="stock">Stock</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="coverImage"
                                        name="coverImage"
                                        value={book.coverImage}
                                        onChange={handleChange}
                                        placeholder="Enter cover image URL"
                                    />
                                    <label htmlFor="coverImage">Cover Image URL</label>
                                </div>

                                <div className="form-floating mb-4">
                                    <textarea
                                        className="form-control"
                                        id="summary"
                                        name="summary"
                                        value={book.summary}
                                        onChange={handleChange}
                                        placeholder="Enter summary"
                                        style={{ height: '120px' }}
                                    />
                                    <label htmlFor="summary">Summary</label>
                                </div>

                                <div className="d-flex justify-content-end">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 btn btn-primary"
                                    >
                                        Add Book
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddBook;