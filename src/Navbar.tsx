import { NavLink} from "react-router-dom";
import React, {useEffect} from "react";

const Navbar = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

    }, []);

    return(
        <nav className="navbar">
            <NavLink to={"/wallet"} className="navbarButtons wallet-link ({ isActive }) => isActive ? 'navbarButtons active' : 'navbarButtons' ({ isActive }) => isActive ? 'navbarButtons icon active' : 'navbarButtons icon active'" >Wallet</NavLink>
            <NavLink to={"/boosts"} className="navbarButtons boost-link ({ isActive }) => isActive ? 'navbarButtons active' : 'navbarButtons'">Boost</NavLink>
            <NavLink to={"/"} className="navbarButtons play-link ({ isActive }) => isActive ? 'navbarButtons active' : 'navbarButtons'">Play</NavLink>
            <NavLink to={"/hotdeals"} className="navbarButtons hotdeals-link ({ isActive }) => isActive ? 'navbarButtons active' : 'navbarButtons'">Hot Deals</NavLink>
            <NavLink to={"/profile"} className="navbarButtons profile-link ({ isActive }) => isActive ? 'navbarButtons active' : 'navbarButtons'">Profile</NavLink>
        </nav>
    );
}

export default Navbar;