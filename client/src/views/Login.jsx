import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [firstName, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('authToken'); // Store token, not just "success"
        if (!token) {
            navigate('/login');
        } else {
            navigate('/upload');
        }
    }, []); // Dependency added to avoid unnecessary re-renders

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!firstName || !password) {
            alert('Please fill all fields');
            return;
        }
        setLoading(true);
        try {
            const res = await login(firstName, password);
            if (res) {
                navigate('/upload')
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="mt-5 container">
            <div className="justify-content-center row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="text-center card-header">
                            <h2>Log In</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="First Name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="w-100 btn btn-primary">
                                    Log In
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
