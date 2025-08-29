const express = require('express');
const { body, validationResult } = require('express-validator');
const Movie = require('../models/Movie');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/movies
// @desc    Get all movies for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const movies = await Movie.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/movies
// @desc    Add a new movie
// @access  Private
router.post('/', [
  auth,
  body('name', 'Name is required').not().isEmpty(),
  body('rating', 'Rating must be a number between 0 and 10').isFloat({ min: 0, max: 10 }),
  body('overview', 'Overview is required').not().isEmpty(),
  body('imageURL', 'Image URL is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newMovie = new Movie({
      name: req.body.name,
      rating: req.body.rating,
      overview: req.body.overview,
      imageURL: req.body.imageURL,
      user: req.user.id
    });

    const movie = await newMovie.save();
    res.json(movie);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/movies/:id
// @desc    Update a movie
// @access  Private
router.put('/:id', [
  auth,
  body('name', 'Name is required').not().isEmpty(),
  body('rating', 'Rating must be a number between 0 and 10').isFloat({ min: 0, max: 10 }),
  body('overview', 'Overview is required').not().isEmpty(),
  body('imageURL', 'Image URL is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Make sure user owns the movie
    if (movie.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        rating: req.body.rating,
        overview: req.body.overview,
        imageURL: req.body.imageURL
      },
      { new: true }
    );

    res.json(movie);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/movies/:id
// @desc    Get a single movie
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Make sure user owns the movie
    if (movie.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(movie);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/movies/:id
// @desc    Delete a movie
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Make sure user owns the movie
    if (movie.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await movie.remove();
    res.json({ message: 'Movie removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
