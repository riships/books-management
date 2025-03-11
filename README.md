# Books Management System

A full-stack application for managing books with MERN stack (MongoDB, Express.js, React, Node.js).

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Git

## 1. Clone the Repository
```sh
git clone https://github.com/riships/books-management.git
cd books-management
```

## 2. Set Up Environment Variables

### For Server
Create a `.env` file inside the `server` directory:
```sh
touch server/.env
```

Add the following environment variables:
```sh
# server/.env
MONGO_URI=mongodb://localhost:27017/books_management
SECRET_KEY=RISHISACHINSABIR
CLIENT_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

### For Client
Create a `.env` file inside the `client` directory:
```sh
touch client/.env
```

Add the following environment variables:
```sh
# client/.env
VITE_API_URL=http://localhost:5000/api
```

## 3. Install Dependencies

Install server dependencies:
```sh
cd server
npm install
```

Install client dependencies:
```sh
cd ../client
npm install
```

## 4. Start the Development Servers

Start the backend server:
```sh
cd server
npm run dev  # For development with nodemon
# or
npm start    # For production
```

Start the frontend server in a new terminal:
```sh
cd client
npm run dev
```

The application should now be running at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 5. Testing

Run backend tests:
```sh
cd server
npm test
```

Run frontend tests:
```sh
cd client
npm test
```

## Project Structure

```
books-management/
├── client/                 # Frontend React application
│   ├── src/
│   ├── public/
│   └── package.json
└── server/                 # Backend Node.js application
    ├── src/
    ├── tests/
    └── package.json
```
