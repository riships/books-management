import React, { useState, useEffect } from 'react';

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
        return <div>Loading...</div>;
    }


    return (
        <div className="mx-auto p-4 container">
            <h1 className="mb-6 font-bold text-3xl">Books Collection</h1>
            <div className="gap-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {books.length > 0 ? (
                    books.map((book) => (
                        <div
                            key={book._id}
                            className="bg-white shadow-lg hover:shadow-2xl rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 transform"
                        >
                            {/* Image Section */}
                            <div className="relative">
                                <img
                                    src={book.coverImage || "default-book-cover.jpg"}
                                    alt={book.title}
                                    className="w-full h-72 object-cover"
                                />
                                <div className="top-3 right-3 absolute bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md px-3 py-1 rounded-full font-medium text-white text-sm">
                                    Stock: {book.stock}
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6">
                                {/* Title & Author */}
                                <div className="mb-3">
                                    <h2 className="font-bold text-gray-900 text-2xl">{book.title}</h2>
                                    <p className="text-gray-600 text-sm">by {book.author}</p>
                                </div>

                                {/* Details Grid */}
                                <div className="gap-x-4 gap-y-2 grid grid-cols-2 mb-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Genre:</span>
                                        <p className="font-medium text-gray-800">{book.genre.join(", ")}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Published:</span>
                                        <p className="font-medium text-gray-800">{book.publicationYear}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Format:</span>
                                        <p className="font-medium text-gray-800">{book.format}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Pages:</span>
                                        <p className="font-medium text-gray-800">{book.pages}</p>
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="mb-3">
                                    <span className="text-gray-500 text-sm">Summary:</span>
                                    <p className="text-gray-800 text-sm line-clamp-3 leading-relaxed">
                                        {book.summary}
                                    </p>
                                </div>

                                {/* Additional Details */}
                                <div className="space-y-1 mb-3 text-gray-500 text-xs">
                                    <p><strong>ISBN:</strong> {book.ISBN}</p>
                                    <p><strong>Publisher:</strong> {book.publisher}</p>
                                    <p><strong>Language:</strong> {book.language}</p>
                                </div>

                                {/* Price & Rating */}
                                <div className="flex justify-between items-center pt-4 border-gray-200 border-t">
                                    <div>
                                        <span className="font-bold text-blue-600 text-2xl">${book.price}</span>
                                        <div className="flex items-center mt-1 text-gray-600 text-sm">
                                            <span className="mr-1 text-yellow-400 text-lg">★</span>
                                            <span>
                                                {book.ratings || "0"} ({book.reviews.length} reviews)
                                            </span>
                                        </div>
                                    </div>
                                    <button className="bg-gradient-to-r from-blue-500 hover:from-indigo-600 to-indigo-600 hover:to-blue-500 shadow-md px-5 py-2 rounded-lg font-medium text-white transition-all duration-300">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>

                    ))
                ) : (
                    <div className="col-span-full py-10 text-center">
                        <p className="text-gray-500 text-xl">No books available in the collection.</p>
                        <p className="mt-2 text-gray-400">Please check back later!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Books;