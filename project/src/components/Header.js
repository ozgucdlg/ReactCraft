import React from 'react';

const Header = ({ user, movies }) => {
    return (
        <header className="bg-primary text-white py-4 mb-0">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-8">
                        <h1 className="display-4 mb-2">
                            🎬 MovieCraft
                        </h1>
                        <p className="lead mb-0">
                            {user ? `Welcome back, ${user.username}!` : 'Your Personal Movie Collection'}
                        </p>
                    </div>
                    <div className="col-md-4 text-md-end">
                        <div className="d-flex flex-column align-items-md-end">
                            <div className="mb-2">
                                <span className="badge bg-light text-primary fs-6">
                                    {user ? `${movies ? movies.length : 0} Movies` : 'Get Started'}
                                </span>
                            </div>
                            {user && (
                                <small className="text-light">
                                    Last login: {new Date().toLocaleDateString()}
                                </small>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
