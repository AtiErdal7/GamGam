import { NavLink} from "react-router-dom";
import React, {useEffect} from "react";
import {TonConnectButton} from "@tonconnect/ui-react";

const Navbar = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

    }, []);

    return(
        <nav className="navbar">
            <TonConnectButton></TonConnectButton>
            <NavLink to={"/boosts"} className="navbarButtons boost-link ({ isActive }) => isActive ? 'navbarButtons active' : 'navbarButtons'">Boost</NavLink>
            <NavLink to={"/"} className="navbarButtons play-link ({ isActive }) => isActive ? 'navbarButtons active' : 'navbarButtons'">Play</NavLink>
            <NavLink to={"/deals"} className="navbarButtons hotdeals-link ({ isActive }) => isActive ? 'navbarButtons active' : 'navbarButtons'">Deals</NavLink>
            <NavLink to={"/profile"} className="navbarButtons profile-link ({ isActive }) => isActive ? 'navbarButtons active' : 'navbarButtons'">Profile</NavLink>
        </nav>
    );
}

export default Navbar;