import React from 'react';
import ScrollContainerVertical from "./ScrollContainerVertical";


let itemsList = ['Daily VIP', 'Weekly VIP', 'Monthly VIP']

const MembershipPage = () => {

    function membershipSet() {
        localStorage.setItem('membershipStatus',JSON.stringify("Premium"));
    }

    return (
            <div className={"membershipPage"}>
                <div className={"membershipPageOverlay"}>
                    <h2 style={{
                        marginTop: "15px",
                        color: "gold"
                    }}>
                        The benefits of being VIP
                    </h2>
                    <h3 style={{
                        marginTop: "15px",
                        color: "gold"
                    }}>Increased Energy Limit</h3>
                    <h3 style={{
                        marginTop: "10px",
                        color: "gold"
                    }}>Reduced Click Timer</h3>
                    <div style={{
                        display: "grid",
                        justifyItems: "center",
                        alignItems: "center",
                        marginTop: 10
                    }}>
                        <h3 style={{
                            color: "gold",
                            marginBottom: 10
                        }}>Periodically Earned Rewards</h3>
                        <ScrollContainerVertical height={window.innerHeight/100*60} itemsList = {itemsList}></ScrollContainerVertical>
                    </div>
                    <button onClick={membershipSet} style={{
                        width: "60px",
                        height: "25px",
                        borderRadius: "5px",
                        backgroundColor: "grey",
                        marginTop:"10px",
                        color: "gold"
                    }}>be VIP
                    </button>
                </div>
            </div>

    );
};

export default MembershipPage;