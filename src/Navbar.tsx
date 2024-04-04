import {Link} from "react-router-dom";
import React from "react";

const Navbar = () => {
    return(
        <nav className="navbar">
            <div className="content">
                <Link to={"/collect-ticket"} style={{
                    color: "white",
                    backgroundColor:"grey",
                    borderRadius: "8px"
                }}>Click Page</Link>
                <Link to={"/sign-in Rewards"} style={{
                    color: "gold",
                    backgroundColor:"green",
                    borderRadius: "8px"
                }}>Sign-in Rewards</Link>
            </div>
        </nav>
    );
}

export default Navbar;