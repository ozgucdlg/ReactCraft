import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = (props) => {
    const truncateOverview = (string, maxlength) => {
        if (!string) return null;
        if (string.length <= maxlength) return string;
        return `${string.substring(0, maxlength)} ...`;
    }

    if (!props.movies) {
        return (
            <div className="alert alert-warning">
                No movies data available.
            </div>
        );
    }

    return (
        <div className="row">
            {props.movies.map((movie) => (
                <div className="col-lg-4" key={movie._id}>
                    <div className="card mb-4 shadow-sm">
                        <img 
                            src={movie.imageURL} 
                            className="card-img-top" 
                            alt={movie.name}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                            }}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{movie.name}</h5>
                            <p className="card-text">{truncateOverview(movie.overview, 100)}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <button 
                                    type="button" 
                                    onClick={() => props.deleteMovieProp(movie)} 
                                    className="btn btn-md btn-outline-danger"
                                >
                                    Delete
                                </button>
                                <Link 
                                    type="button"
                                    className="btn btn-md btn-outline-primary"
                                    to={`edit/${movie._id}`}
                                >
                                    Edit
                                </Link>
                                <h2>
                                    <span className="badge bg-warning text-dark">
                                        {movie.rating}
                                    </span>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MovieList;