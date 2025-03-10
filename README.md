# Setting Up the Project

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
MONGO_URI=mongodb://localhost:27017/library_management
SECRET_KEY=RISHISACHINSABIR
CLIENT_URL=http://localhost:5173
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
VITE_MEDIA_URL=http://localhost:5000/
```

## 3. Install Dependencies
Navigate to both directories and install dependencies:
```sh
cd server
npm install
cd ../client
npm install
```

## 4. Start the Project
Run the backend and frontend servers:
```sh
cd server
npm start &
cd ../client
npm start
