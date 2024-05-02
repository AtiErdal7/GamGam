import React from 'react';

const BoostPage = () => {

    const fillEnergy= () => localStorage.setItem('energyLeft',JSON.stringify(100));


    return (
        <div>
            <button onClick={fillEnergy} style={{
                backgroundColor:"grey",
                marginTop:"100px",
                width: "150px",
                height:"70px"
            }}>Energy Fill</button>
        </div>
    );
};

export default BoostPage;