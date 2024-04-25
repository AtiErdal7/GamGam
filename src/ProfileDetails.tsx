import React from 'react';
import Badge from './images/Badge.png';
import ScrollContainerHorizontal from "./ScrollContainerVertical";

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
                            paddingLeft: "10px",
                            textAlign: "left",
                            display: "flex",
                            color: "grey"
                        }}>0000000000000 <button className={"wallet-copy"}></button></text>
                    </div>
                    <div>
                        <h2 style={{
                            textAlign: "left",
                            fontSize: "16px",
                            color: "white"
                        }}>Badges</h2>
                        <div className={"badges-style"}>
                            <p className={"badges"}>Education</p>
                            <p className={"badges"}>Education</p>
                            <p className={"badges"}>Education</p>
                            <p className={"badges"}>Education</p>
                        </div>
                    </div>
                </div>
                <div className={"x-boost-text"}>
                    <text style={{
                        fontSize: "12px",
                        marginLeft: "8px",
                        paddingTop: "6px",
                        textAlign: "center",
                        display: "flex",
                        color: "white",
                }}>Great, your MallCards are boosting x1.5 MPs time more</text>
                </div>
                    <ScrollContainerHorizontal></ScrollContainerHorizontal>

            </div>
    );
};

export default ProfileDetails;