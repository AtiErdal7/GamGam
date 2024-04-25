import React from 'react';
import ProfileBar from "./ProfileBar";
import ScrollContainerHorizontal from "./ScrollContainerHorizontal";
import ScrollContainerVertical from "./ScrollContainerVertical";

const HotDeals = () => {
    return (
        <div>
            <ProfileBar></ProfileBar>
            <h1 style={{
                textAlign: "left",
                paddingTop: 70,
                paddingLeft: 16,
                fontSize: 16,
                color: "white"
            }}>Hot Deals</h1>
            <h2 style={{
                textAlign: "left",
                paddingLeft: 16,
                fontSize: 12,
            }}>Hello everyone! Welcome to hot deals page.</h2>
            <ScrollContainerHorizontal></ScrollContainerHorizontal>
            <h1 style={{
                textAlign: "left",
                paddingTop: 20,
                paddingLeft: 16,
                fontSize: 16,
                color: "white"
            }}>Quest Hub</h1>
            <h2 style={{
                textAlign: "left",
                paddingLeft: 16,
                fontSize: 12,
            }}>You can check your available quests here!</h2>
            <ScrollContainerVertical></ScrollContainerVertical>
        </div>
    );
};

export default HotDeals;