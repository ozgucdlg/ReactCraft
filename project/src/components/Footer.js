import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-dark text-light py-4 mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <h5 className="mb-3">🎬 MovieCraft</h5>
                        <p className="text-muted small">
                            Your personal movie collection manager. 
                            Track, organize, and discover your favorite films.
                        </p>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h6 className="mb-3">Quick Links</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/" className="text-muted text-decoration-none">
                                    Home
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/add" className="text-muted text-decoration-none">
                                    Add Movie
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h6 className="mb-3">Connect</h6>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-muted text-decoration-none">
                                <i className="bi bi-github me-1"></i> GitHub
                            </a>
                            <a href="#" className="text-muted text-decoration-none">
                                <i className="bi bi-linkedin me-1"></i> LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <p className="mb-0 text-muted small">
                            © {currentYear} MovieCraft. All rights reserved.
                        </p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <p className="mb-0 text-muted small">
                            Built with React & Node.js
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
