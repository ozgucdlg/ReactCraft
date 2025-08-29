import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
    const history = useHistory();

    const handleLogout = () => {
        console.log('Navbar logout button clicked'); // Debug log
        onLogout();
        console.log('onLogout called, redirecting to home'); // Debug log
        history.push('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    🎬 Movie App
                </Link>
                
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        {user && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/add">
                                    Add Movie
                                </Link>
                            </li>
                        )}
                    </ul>
                    
                    <ul className="navbar-nav">
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <span className="navbar-text me-3">
                                        👤 {user.username}
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        className="btn btn-outline-light btn-sm" 
                                        onClick={handleLogout}
                                    >
                                        🚪 Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
