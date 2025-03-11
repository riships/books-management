import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

function Books() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch books data when component mounts
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            // Replace with your actual API endpoint
            const response = await fetch(import.meta.env.VITE_API_URL + '/books',
                {
                    method: 'GET',
                    headers: {
                        'library-auth-token': sessionStorage.getItem('authToken')
                    }
                });
            const data = await response.json();
            if (!data.success) {
                return alert(data.message);
            }
            setBooks(data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching books:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex align-items-center justify-content-center min-vw-100 min-vh-100">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="p-4 container">
            <h1 className="mb-4 fw-bold text-center">Library Collection</h1>
            <div className="row-cols-1 row-cols-lg-2 row-cols-xl-3 row g-4">
                {books.length > 0 ? (
                    books.map((book) => (
                        <div
                            key={book._id}
                            className="col"
                        >
                            <div className="shadow h-100 card">
                                {/* Image Section */}
                                <div className="position-relative">
                                    <img
                                        src={book.coverImage || "default-book-cover.jpg"}
                                        alt={book.title}
                                        className="card-img-top"
                                        style={{ height: "320px", objectFit: "cover" }}
                                    />
                                    <div className="top-0 position-absolute m-3 end-0">
                                        <span className="bg-success badge">
                                            {book.stock} in stock
                                        </span>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="card-body">
                                    {/* Title & Author */}
                                    <div className="mb-3">
                                        <h2 className="fw-bold card-title h4">{book.title}</h2>
                                        <p className="text-muted">by <span className="fw-medium">{book.author}</span></p>
                                    </div>

                                    {/* Genre Pills */}
                                    <div className="mb-3">
                                        {book.genre.map((g, idx) => (
                                            <span key={idx} className="bg-primary me-2 badge">
                                                {g}
                                            </span>
                                        ))}
                                        <span className="bg-secondary badge">
                                            {book.format}
                                        </span>
                                    </div>

                                    {/* Summary */}
                                    <p className="mb-3 text-muted card-text small">
                                        {book.summary}
                                    </p>

                                    {/* Details Grid */}
                                    <div className="bg-light mb-3 p-3 rounded">
                                        <div className="row-cols-2 row g-3">
                                            <div className="col">
                                                <small className="d-block text-muted">Published</small>
                                                <span className="fw-medium">{book.publicationYear}</span>
                                            </div>
                                            <div className="col">
                                                <small className="d-block text-muted">Pages</small>
                                                <span className="fw-medium">{book.pages}</span>
                                            </div>
                                            <div className="col">
                                                <small className="d-block text-muted">Language</small>
                                                <span className="fw-medium">{book.language}</span>
                                            </div>
                                            <div className="col">
                                                <small className="d-block text-muted">Publisher</small>
                                                <span className="fw-medium text-truncate">{book.publisher}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price & Actions */}
                                    <div className="d-flex align-items-center justify-content-between pt-3 border-top">
                                        <div>
                                            <div className="mb-0 text-primary h4">${book.price}</div>
                                            <div className="d-flex align-items-center">
                                                <div className="text-warning">
                                                    {'★'.repeat(Math.round(book.ratings || 0))}
                                                    {'☆'.repeat(5 - Math.round(book.ratings || 0))}
                                                </div>
                                                <small className="ms-2 text-muted">
                                                    ({book.reviews.length})
                                                </small>
                                            </div>
                                        </div>
                                        <button className="d-flex align-items-center gap-2 btn btn-primary">
                                            View Details
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-chevron-right bi" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-5 text-center col-12">
                        <p className="text-muted h4">No books available in the collection.</p>
                        <p className="text-muted">Please check back later!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Books;