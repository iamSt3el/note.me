# note.me

A full-stack note-taking application built with React and Node.js, featuring user authentication and real-time note management.

## Features

- User authentication with JWT
- Create, read, update, and delete notes
- Markdown support with syntax highlighting
- Color customization for notes
- Secure API with bcrypt password hashing

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing

### Frontend
- React 18
- React Router for navigation
- Axios for API requests
- React Markdown with syntax highlighting
- Sass for styling

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB instance
- npm or yarn

### Setup

1. Clone the repository
```bash
git clone <repository-url>
cd note.me
```

2. Install server dependencies
```bash
npm install
```

3. Install client dependencies
```bash
cd client
npm install
cd ..
```

4. Configure environment variables

Create a `.env` file in the root directory:
```
PORT=4000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
CORS_ORIGIN=http://localhost:3000
```

## Running the Application

### Development

Start the backend server:
```bash
npm start
```

Start the frontend client (in a separate terminal):
```bash
cd client
npm start
```

The API will be available at `http://localhost:4000` and the client at `http://localhost:3000`.

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### Notes
- `GET /note` - Get all notes for authenticated user
- `POST /note` - Create a new note
- `PUT /note/:id` - Update a note
- `DELETE /note/:id` - Delete a note

## License

ISC
