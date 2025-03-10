import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Signout() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + "/user/signout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "yt-auth-token": sessionStorage.getItem("authToken"),
                },
                credentials: "include",
            });

            const data = await response.json();
            if (data.success) {
                sessionStorage.removeItem("authToken"); // Clear token from storage
                alert("Logged out successfully!");
                navigate("/login"); // Redirect user to login
            } else {
                alert("Logout failed. Please try again.");
            }
        } catch (error) {
            alert("Error during logout: " + error.message);
        }
    };

    return (
        <>
            <Button variant="primary" type="submit" onClick={handleLogout}>
                Signout
            </Button>
        </>
    )
}

export default Signout