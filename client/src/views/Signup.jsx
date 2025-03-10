import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
function Signup() {
    // State to store form values
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone_number: '',
        password: ''
    });
    // State to store loading status
    const [loading, setLoading] = useState(false);

    // Handle change for input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        if (token) {
            navigate('/books');
        }
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // You can process form data here or send it to an API
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone_number || !formData.password) {
            return alert('Please fill all the fields');
        }
        setLoading(true);
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + '/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });
            const data = await response.json();
            console.log(data);

            if (data.success) {
                // clear the data of form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone_number: '',
                    password: ''
                });
                setLoading(false);
            } else {
                alert(data.message)
                setLoading(false);
            }
        } catch (error) {
            alert(error.message)
        }

    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header">
                                <h2>Signup</h2>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group mb-3">
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="Enter your First Name"
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Enter your Last Name"
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Phone</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="phone_number"
                                            value={formData.phone_number}
                                            onChange={handleChange}
                                            placeholder="Enter your Phone"
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                    <button type="submit" className="mb-3 w-100 btn btn-primary">
                                        {
                                            loading ? (
                                                <Spinner animation="border" variant="light" />
                                            ) : 'Signup'

                                        }
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
