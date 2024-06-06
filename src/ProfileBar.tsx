import React from 'react';
import {NavLink} from "react-router-dom";

let nick = "Guest";
let membership = "membership"

function ProfileBar() {

    // @ts-ignore
    const nickname = JSON.parse(localStorage.getItem('nickname'));
    if (nickname !== null){
        nick = nickname;
    }
    // @ts-ignore
    const membershipStatus = JSON.parse(localStorage.getItem('membershipStatus'));
    if (membershipStatus === "Premium" ){
        membership = "membership mPremium"
    }
    else{
        membership = "membership mBasic"
    }
 0

    return (
        <div className="profileBar">
            <div style={{
                display: 'flex',
            }}>
                <NavLink to={"/profile"} className="profile-pic"></NavLink>
                <div style={{
                    textAlign: "left",
                    alignItems: "center",
                    justifyContent: "left",
                    paddingLeft: "15px",
                    marginTop: "8px"
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
            <NavLink to={"/membership"} className={membership}></NavLink>
        </div>
    );
}

export default ProfileBar;