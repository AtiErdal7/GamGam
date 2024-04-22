import React from 'react';
import {NavLink} from "react-router-dom";

function ProfileBar() {
    return (
        <div className="profileBar">
            <NavLink to={"/profile"} className="profile-pic"></NavLink>
            <div style={{
                textAlign: "left",
                alignItems: "center",
                justifyContent: "left",
                paddingLeft: "15px"
            }}>
                <h2 style={{
                fontSize: "12px",
            }}>Welcome back</h2>
                <h2 style={{
                    fontSize: "16px",
                    color: "white"
                }}>atierdal</h2>
            </div>

        </div>
    );
}

export default ProfileBar;