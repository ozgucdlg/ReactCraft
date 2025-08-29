const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for testing
const mockUsers = [
  { id: 1, username: 'testuser', email: 'test@example.com', password: 'password123' }
];

const mockMovies = [
  { id: 1, name: 'The Matrix', rating: 9, overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality.', imageURL: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg', user: 1, createdAt: new Date() },
  { id: 2, name: 'Emmerdale', rating: 4.4, overview: 'This is not preferable movies for all watchers !....', imageURL: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ualtuRRNYa9Fj61wSuBVcuvaVDP.jpg', user: 1, createdAt: new Date() }
];

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Test Movie App API is running' });
});

// Mock auth routes
app.post('/api/auth/register', (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  // Check if user already exists
  const existingUser = mockUsers.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  const newUser = { id: mockUsers.length + 1, username, email, password };
  mockUsers.push(newUser);
  
  res.status(201).json({ 
    message: 'User created successfully',
    user: { id: newUser.id, username: newUser.username, email: newUser.email }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = mockUsers.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  // Mock JWT token
  const token = 'mock-jwt-token-' + Date.now();
  
  res.json({
    token,
    user: { id: user.id, username: user.username, email: user.email }
  });
});

// Mock movies routes
app.get('/api/movies', (req, res) => {
  res.json(mockMovies);
});

app.post('/api/movies', (req, res) => {
  const { name, rating, overview, imageURL } = req.body;
  
  if (!name || !rating || !overview || !imageURL) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  const newMovie = {
    id: mockMovies.length + 1,
    name,
    rating: parseInt(rating),
    overview,
    imageURL,
    user: 1,
    createdAt: new Date()
  };
  
  mockMovies.push(newMovie);
  res.status(201).json(newMovie);
});

app.put('/api/movies/:id', (req, res) => {
  const { id } = req.params;
  const { name, rating, overview, imageURL } = req.body;
  
  const movieIndex = mockMovies.findIndex(m => m.id === parseInt(id));
  
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  
  mockMovies[movieIndex] = {
    ...mockMovies[movieIndex],
    name,
    rating: parseInt(rating),
    overview,
    imageURL
  };
  
  res.json(mockMovies[movieIndex]);
});

app.delete('/api/movies/:id', (req, res) => {
  const { id } = req.params;
  const movieIndex = mockMovies.findIndex(m => m.id === parseInt(id));
  
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  
  mockMovies.splice(movieIndex, 1);
  res.json({ message: 'Movie deleted successfully' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log('This is a mock server for testing - no MongoDB required!');
});
