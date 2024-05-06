import React from 'react';
import {NavLink} from "react-router-dom";

let nick = "Guest";

function ProfileBar() {

    // @ts-ignore
    const nickname = JSON.parse(localStorage.getItem('nickname'));
    if (nickname !== null){
        nick = nickname;
    }

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
                }}>{nick}</h2>
            </div>
        </div>
    );
}

export default ProfileBar;