# 🎬 MovieCraft - Personal Movie Collection Manager

A modern, full-stack React application for managing your personal movie collection with user authentication, beautiful UI, and seamless user experience.

## ✨ Features

- 🔐 **User Authentication**: Secure login/signup system with JWT tokens
- 🎬 **Movie Management**: Full CRUD operations for your movie collection
- 🔍 **Smart Search**: Real-time search and filtering of movies
- 👤 **Personal Collections**: User-specific movie databases
- 🎨 **Modern UI**: Beautiful interface with Bootstrap 5 and custom components
- 🏠 **Home Page**: Welcoming landing page for new users
- 📱 **Responsive Design**: Works perfectly on all devices
- 🔒 **Protected Routes**: Secure access to user-specific features
- 💾 **Data Persistence**: MongoDB integration with test server option
- 🚪 **Easy Logout**: Simple and functional logout system

## Tech Stack

### Frontend
- React 17
- React Router DOM
- Axios
- Bootstrap 5
- Bootstrap Icons
- Custom Header & Footer Components

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Test Server (No Database Required)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Backend Setup

#### Option 1: Test Server (Recommended for Quick Start)
1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the test server:**
   ```bash
   npm run test
   ```
   The test server will run on `http://localhost:5000` (No database required!)

#### Option 2: Full MongoDB Server
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

## 🚀 Quick Start

### Test Credentials (Test Server)
- **Email**: `test@example.com`
- **Password**: `password123`

## 📱 Usage

1. **Home Page**: App opens to a welcoming home page with login/signup options
2. **Register/Login**: Create an account or login with existing credentials
3. **Dashboard**: View your personal movie collection with sample movies
4. **Add Movies**: Click "Add Movie" to add new movies to your collection
5. **Search**: Use the search bar to filter movies by name
6. **Edit/Delete**: Use the buttons on each movie card to edit or delete
7. **Logout**: Click the "🚪 Logout" button in the navbar to return to home page

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes
- User-specific data isolation
- Input validation and sanitization

## 🏗️ Project Structure

```
project/
├── server/                 # Backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication middleware
│   ├── server.js          # Main server file
│   ├── test-server.js     # Test server (no database)
│   └── package.json       # Backend dependencies
├── src/
│   ├── components/        # React components
│   │   ├── Header.js      # App header with branding
│   │   ├── Footer.js      # App footer with links
│   │   ├── Login.js       # Login component
│   │   ├── Signup.js      # Signup component
│   │   ├── Navbar.js      # Navigation bar
│   │   ├── PrivateRoute.js # Protected route wrapper
│   │   ├── MovieList.js   # Movie display component
│   │   ├── AddMovie.js    # Add movie form
│   │   ├── EditMovie.js   # Edit movie form
│   │   └── SearchBar.js   # Search functionality
│   └── index.js           # React entry point
└── package.json           # Frontend dependencies
```

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Error:**
   - **Solution**: Use the test server instead! Run `npm run test` in the server directory
   - **Alternative**: Check your connection string in `config.env`
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Verify your username and password

2. **CORS Errors:**
   - The backend is configured to allow requests from `http://localhost:3000`
   - If using a different port, update the CORS configuration

3. **JWT Token Issues:**
   - Clear localStorage and login again
   - Check that the JWT_SECRET is properly set

4. **Logout Not Working:**
   - The logout button is now clearly visible in the navbar
   - Click the "🚪 Logout" button to return to home page
   - Check browser console for any error messages

### Development Tips

- **Test Server**: Use `npm run test` for quick development without database setup
- **Full Server**: Use `npm run dev` in the server directory for auto-restart on changes
- **Debug Logs**: Check the browser console and server logs for error messages
- **API Debugging**: Use the Network tab in browser dev tools to debug API calls
- **State Management**: The app now properly manages user sessions and logout functionality

## Deployment

### Backend Deployment
- Deploy to platforms like Heroku, Railway, or Render
- Set environment variables in your hosting platform
- Update the MongoDB connection string for production

### Frontend Deployment
- Build the app: `npm run build`
- Deploy the `build` folder to platforms like Vercel, Netlify, or GitHub Pages
- Update API URLs to point to your deployed backend

## 🆕 Recent Updates

### Version 2.0 - Enhanced User Experience
- ✨ **New Header Component**: Beautiful MovieCraft branding with welcome messages
- 🦶 **New Footer Component**: Professional footer with links and copyright
- 🏠 **Improved Home Page**: App now starts with welcoming home page instead of user account
- 🚪 **Fixed Logout**: Visible logout button with proper functionality
- 🧪 **Test Server**: Added test server option for quick development without database
- 🎨 **Better UI**: Enhanced navbar and overall user interface
- 🔧 **Debug Logging**: Added comprehensive logging for troubleshooting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

## 🎯 **Getting Started in 3 Steps**

1. **Start Backend**: `cd server && npm run test`
2. **Start Frontend**: `cd .. && npm start`
3. **Login**: Use `test@example.com` / `password123`

**Your MovieCraft app will be running in minutes!** 🚀
