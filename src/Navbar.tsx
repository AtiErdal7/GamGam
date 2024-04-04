import {Link} from "react-router-dom";
import React from "react";

const Navbar = () => {
    return(
        <nav className="navbar">
            <div className="content">
                <Link to={"/"} style={{
                    color: "grey",
                    borderRadius: "8px"
                }}>Play</Link>
                <Link to={"/sign-in Rewards"} style={{
                    color: "grey",
                    borderRadius: "8px"
                }}>Sign-in Rewards</Link>
            </div>
        </nav>
    );
}

export default Navbar;