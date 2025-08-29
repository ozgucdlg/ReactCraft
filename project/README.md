# Movie App with Authentication

A full-stack React application for managing movies with user authentication using MongoDB.

## Features

- 🔐 User authentication (login/signup)
- 🎬 CRUD operations for movies
- 🔍 Search functionality
- 👤 User-specific movie collections
- 🎨 Modern UI with Bootstrap
- 🔒 Protected routes
- 💾 Persistent data with MongoDB

## Tech Stack

### Frontend
- React 17
- React Router DOM
- Axios
- Bootstrap 5

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Backend Setup

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Open `config.env` file
   - Update the MongoDB connection string with your credentials
   - Change the JWT_SECRET to a secure random string

4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to the project root:**
   ```bash
   cd ..
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```
   The app will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user` - Get current user (protected)

### Movies (All protected)
- `GET /api/movies` - Get all movies for current user
- `POST /api/movies` - Add a new movie
- `GET /api/movies/:id` - Get a specific movie
- `PUT /api/movies/:id` - Update a movie
- `DELETE /api/movies/:id` - Delete a movie

## Usage

1. **Register/Login:** Create an account or login with existing credentials
2. **Add Movies:** Click "Add Movie" to add new movies to your collection
3. **Search:** Use the search bar to filter movies by name
4. **Edit/Delete:** Use the buttons on each movie card to edit or delete
5. **Logout:** Click on your username in the navbar to logout

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes
- User-specific data isolation
- Input validation and sanitization

## Project Structure

```
project/
├── server/                 # Backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication middleware
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── src/
│   ├── components/        # React components
│   │   ├── Login.js       # Login component
│   │   ├── Signup.js      # Signup component
│   │   ├── Navbar.js      # Navigation bar
│   │   ├── PrivateRoute.js # Protected route wrapper
│   │   └── ...            # Other components
│   └── index.js           # React entry point
└── package.json           # Frontend dependencies
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error:**
   - Check your connection string in `config.env`
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Verify your username and password

2. **CORS Errors:**
   - The backend is configured to allow requests from `http://localhost:3000`
   - If using a different port, update the CORS configuration

3. **JWT Token Issues:**
   - Clear localStorage and login again
   - Check that the JWT_SECRET is properly set

### Development Tips

- Use `npm run dev` in the server directory for auto-restart on changes
- Check the browser console and server logs for error messages
- Use the Network tab in browser dev tools to debug API calls

## Deployment

### Backend Deployment
- Deploy to platforms like Heroku, Railway, or Render
- Set environment variables in your hosting platform
- Update the MongoDB connection string for production

### Frontend Deployment
- Build the app: `npm run build`
- Deploy the `build` folder to platforms like Vercel, Netlify, or GitHub Pages
- Update API URLs to point to your deployed backend

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
