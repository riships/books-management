import React from "react";
import { Link, NavLink } from "react-router-dom";
import Signout from "./Signout";

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg"
                        alt="Website Logo"
                    />
                </Link>
            </div>
            <nav className="nav">
                <ul className="mb-0">
                    <li>
                        <NavLink to="/upload" className={({ isActive }) => (isActive ? "active" : "")}>
                            Upload Data Page
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/videoListing" className={({ isActive }) => (isActive ? "active" : "")}>
                            Videos List
                        </NavLink>
                    </li>
                </ul>
                <Signout />
            </nav>
            
        </header>
    );
}

export default Header;
