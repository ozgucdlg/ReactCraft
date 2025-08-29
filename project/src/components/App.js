import React from 'react';
import axios from 'axios';

import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import EditMovie from './EditMovie';
import Login from './Login';
import Signup from './Signup';
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';
import PrivateRoute from './PrivateRoute';

class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null };
    
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    
    componentDidCatch(error, errorInfo) {
        console.error('Error caught:', error, errorInfo);
    }
    
    render() {
        if (this.state.hasError) {
            return <div className="container mt-5">
                <h1>Something went wrong.</h1>
                <pre>{this.state.error.toString()}</pre>
            </div>;
        }
        return this.props.children;
    }
}

class App extends React.Component {
    state = {
        movies: [],
        searchQuery: "",
        loading: true,
        error: null,
        user: null,
        token: null
    }

    componentDidMount() {
        console.log('App mounted');
        this.checkAuthStatus();
        this.loadMovies();
    }

    checkAuthStatus = () => {
        // Clear any existing user session to show home page by default
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Always start with no user logged in
        this.setState({ token: null, user: null });
    }

    loadMovies = async () => {
        try {
            this.setState({ loading: true });
            
            if (this.state.token) {
                // Load movies from API if authenticated
                const config = {
                    headers: { Authorization: `Bearer ${this.state.token}` }
                };
                const response = await axios.get('http://localhost:5000/api/movies', config);
                this.setState({ 
                    movies: response.data,
                    loading: false 
                });
            } else {
                // Show empty state for non-authenticated users
                this.setState({ 
                    movies: [],
                    loading: false 
                });
            }
        } catch (error) {
            console.error('Error loading movies:', error);
            this.setState({ 
                error: error.message,
                loading: false 
            });
        }
    }

    // Delete movie function
    deleteMovie = async (movie) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${this.state.token}` }
            };
            await axios.delete(`http://localhost:5000/api/movies/${movie._id}`, config);
            
            const newMovieList = this.state.movies.filter(
                m => m._id !== movie._id
            );
            this.setState({
                movies: newMovieList
            });
        } catch (error) {
            console.error('Error deleting movie:', error);
            alert('Error deleting movie. Please try again.');
        }
    }

    searchMovie = (event) => {
        // console.log(event.target.value);
        this.setState({ searchQuery: event.target.value });
    }

    addMovie = async (movie) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${this.state.token}` }
            };
            const response = await axios.post('http://localhost:5000/api/movies', movie, config);
            
            this.setState(state => ({
                movies: [response.data, ...state.movies]
            }));
        } catch (error) {
            console.error('Error adding movie:', error);
            alert('Error adding movie. Please try again.');
        }
    }

    editMovie = async (id, updatedMovie) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${this.state.token}` }
            };
            const response = await axios.put(`http://localhost:5000/api/movies/${id}`, updatedMovie, config);
            
            const updatedMovies = this.state.movies.map(movie =>
                movie._id === id ? response.data : movie
            );
            this.setState({ movies: updatedMovies });
        } catch (error) {
            console.error('Error updating movie:', error);
            alert('Error updating movie. Please try again.');
        }
    }

    handleLogin = (token, user) => {
        this.setState({ token, user }, () => {
            this.loadMovies();
        });
    }

    handleLogout = () => {
        console.log('Logout function called'); // Debug log
        
        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        console.log('localStorage cleared'); // Debug log
        
        // Reset state
        this.setState({ 
            token: null, 
            user: null, 
            movies: [],
            searchQuery: "",
            loading: false,
            error: null
        }, () => {
            console.log('State updated after logout:', this.state); // Debug log
        });
    }

    render() {
        console.log('Rendering App with movies:', this.state.movies);
        
        if (this.state.loading) {
            return (
                <div className="container mt-5">
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            );
        }

        if (this.state.error) {
            return (
                <div className="container mt-5">
                    <div className="alert alert-danger" role="alert">
                        Error: {this.state.error}
                    </div>
                </div>
            );
        }

        let filteredMovies = this.state.movies.filter(
            (movie) => {
                return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1;
            }
        ).sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        return (
            <ErrorBoundary>
                <Router>
                    <div>
                        <Header user={this.state.user} movies={this.state.movies} />
                        <Navbar user={this.state.user} onLogout={this.handleLogout} />
                        <div className="container">
                            <Switch>
                                <Route path="/login" render={() => (
                                    <Login onLogin={this.handleLogin} />
                                )} />
                                
                                <Route path="/signup" render={() => (
                                    <Signup onLogin={this.handleLogin} />
                                )} />

                                <Route path="/" exact render={() => (
                                    <React.Fragment>
                                        {!this.state.user ? (
                                            <div className="text-center mt-5">
                                                <h2>Welcome to Movie App</h2>
                                                <p className="lead">Please login or sign up to manage your movies.</p>
                                                <div className="mt-4">
                                                    <Link to="/login" className="btn btn-primary me-3">
                                                        Login
                                                    </Link>
                                                    <Link to="/signup" className="btn btn-success">
                                                        Sign Up
                                                    </Link>
                                                </div>
                                            </div>
                                        ) : (
                                            <React.Fragment>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <SearchBar
                                                            searchMovieProp={this.searchMovie}
                                                        />
                                                    </div>
                                                </div>
                                                {filteredMovies.length === 0 ? (
                                                    <div className="alert alert-info">
                                                        No movies found. Add your first movie!
                                                    </div>
                                                ) : (
                                                    <MovieList
                                                        movies={filteredMovies}
                                                        deleteMovieProp={this.deleteMovie}
                                                    />
                                                )}
                                            </React.Fragment>
                                        )}
                                    </React.Fragment>
                                )} />

                                <PrivateRoute 
                                    path="/add" 
                                    user={this.state.user}
                                    component={({ history }) => (
                                        <AddMovie
                                            onAddMovie={(movie) => {
                                                this.addMovie(movie);
                                                history.push("/");
                                            }}
                                        />
                                    )}
                                />

                                <PrivateRoute 
                                    path="/edit/:id" 
                                    user={this.state.user}
                                    component={(props) => (
                                        <EditMovie
                                            {...props}
                                            onEditMovie={(id, movie) => {
                                                this.editMovie(id, movie);
                                            }}
                                        />
                                    )}
                                />
                                
                                {/* Redirect any unknown routes to home page */}
                                <Route path="*" render={() => <Redirect to="/" />} />
                            </Switch>
                        </div>
                        <Footer />
                    </div>
                </Router>
            </ErrorBoundary>
        );
    }
}

export default App;