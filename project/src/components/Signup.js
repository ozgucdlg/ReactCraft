import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Signup = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const { email, username, password, confirmPassword } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!username) {
            newErrors.username = 'Username is required';
        } else if (username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }
        
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async e => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                email,
                username,
                password
            });
            
            // Save token to localStorage
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            
            // Update app state
            onLogin(res.data.token, res.data.user);
            
            // Redirect to home
            history.push('/');
        } catch (error) {
            if (error.response?.data?.errors) {
                const serverErrors = {};
                error.response.data.errors.forEach(err => {
                    serverErrors[err.param] = err.msg;
                });
                setErrors(serverErrors);
            } else {
                setErrors({ 
                    general: error.response?.data?.message || 'Registration failed. Please try again.' 
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Sign Up</h2>
                            
                            {errors.general && (
                                <div className="alert alert-danger" role="alert">
                                    {errors.general}
                                </div>
                            )}

                            <form onSubmit={onSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={onChange}
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    )}
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={onChange}
                                        placeholder="Enter your username"
                                    />
                                    {errors.username && (
                                        <div className="invalid-feedback">{errors.username}</div>
                                    )}
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={onChange}
                                        placeholder="Enter your password"
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={onChange}
                                        placeholder="Confirm your password"
                                    />
                                    {errors.confirmPassword && (
                                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success btn-block w-100"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            Creating account...
                                        </>
                                    ) : (
                                        'Sign Up'
                                    )}
                                </button>
                            </form>

                            <div className="text-center mt-3">
                                <p>
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-decoration-none">
                                        Login here
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
