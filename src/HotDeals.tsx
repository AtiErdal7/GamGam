import React from 'react';
import ProfileBar from "./ProfileBar";
import ScrollContainerHorizontal from "./ScrollContainerHorizontal";
import ScrollContainerVertical from "./ScrollContainerVertical";

let itemsList = ['Achievement 1', 'Achievement 2', 'Achievement 3', 'Achievement 4', 'Achievement 5']

const HotDeals = () => {
    return (
        <div style={{
            display:"grid",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <ProfileBar></ProfileBar>
            <h1 style={{
                textAlign: "left",
                paddingTop: 70,
                paddingLeft: 10,
                fontSize: 16,
                color: "white"
            }}>Hot Deals</h1>
            <h2 style={{
                textAlign: "left",
                paddingLeft: 10,
                fontSize: 12,
            }}>Hello everyone! Welcome to hot deals page.</h2>
            <ScrollContainerHorizontal></ScrollContainerHorizontal>
            <h1 style={{
                textAlign: "left",
                fontSize: 16,
                color: "white"
            }}>Quest Hub</h1>
            <h2 style={{
                textAlign: "left",
                fontSize: 14,
            }}>You can check your available quests here!</h2>
            <div>
                <ScrollContainerVertical height={window.innerHeight/100*38} itemsList = {itemsList}></ScrollContainerVertical>
            </div>
        </div>
    );
};

export default HotDeals;