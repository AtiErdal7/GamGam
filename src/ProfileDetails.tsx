import React from 'react';
import {NavLink} from "react-router-dom";

const ProfileDetails = () => {
    return (
        <div className="profileDetails">
            <div className="profile-pic-big"></div>
            <div className={"rows-container"}>
                <div className={"profile-detail-style"}>
                    <div>
                        <p style={{
                            fontSize: "16px",
                            color: "white"
                        }}>atierdal</p>
                        <p style={{
                            marginTop: "8px"
                        }}>atakan@multiplayer.com.tr</p>
                    </div>
                    <div className={"profile-edit-verified"}>
                        <button className={"edit-button"}>Edit</button>
                        <p className={"verified"}>Verified</p>
                    </div>
                </div>
                <div className={"wallet-address"}>
                    <text style={{
                        paddingTop: "3px",
                        paddingLeft:"10px",
                        textAlign: "left",
                        display: "flex",
                        color: "grey"
                    }}>0000000000000 <button className={"wallet-copy"}></button></text>
                </div>
                <div>
                    <h2 style={{
                        textAlign: "left",
                        marginLeft:"14px",
                        fontSize: "16px",
                        color:"white"
                    }}>Badges</h2>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;