# Setting Up the Project

## 1. Clone the Repository
```sh
git clone https://github.com/riships/user_management_yt.git
cd user_management_yt
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
MONGO_URI=mongodb://localhost:27017/user_management
SECRET_KEY=RISHISACHINSABIR
EMAIL_PASSWORD=app_password
EMAIL_USERNAME=email-id-app-is-registered-with
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
