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
            setBooks(data);
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
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {books.map((book) => (
                    <div key={book._id} className="bg-white shadow-md p-4 rounded-lg">
                        <img
                            src={book.imageUrl || 'default-book-cover.jpg'}
                            alt={book.title}
                            className="mb-4 rounded-md w-full h-48 object-cover"
                        />
                        <h2 className="mb-2 font-semibold text-xl">{book.title}</h2>
                        <p className="mb-2 text-gray-600">{book.author}</p>
                        <p className="mb-4 text-gray-500 text-sm">{book.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-blue-600">${book.price}</span>
                            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Books;