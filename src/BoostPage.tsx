import React from 'react';

const BoostPage = () => {

    const fillEnergy= () => localStorage.setItem('energyLeft',JSON.stringify(100));

    const increaseArea = () => localStorage.setItem('increaseArea',JSON.stringify(10));

    const reduceSpeed = () => localStorage.setItem('reduceSpeed', JSON.stringify(10));

    const multiplier = () => localStorage.setItem('multiplierBoost', JSON.stringify(10));

    return (
        <div>
            <div>
                <button onClick={fillEnergy} style={{
                    backgroundColor: "grey",
                    marginTop: "100px",
                    width: "150px",
                    height: "70px",
                    color: "gold"
                }}>Energy Fill
                </button>
            </div>
            <div>
                <button onClick={increaseArea} style={{
                    backgroundColor: "grey",
                    marginTop: "10px",
                    width: "150px",
                    height: "70px",
                    color: "gold"
                }}>Increase Area
                </button>
            </div>
            <div>
                <button onClick={reduceSpeed} style={{
                    backgroundColor: "grey",
                    marginTop: "10px",
                    width: "150px",
                    height: "70px",
                    color: "gold"
                }}>Speed Reducer
                </button>
            </div>
            <div>
                <button onClick={multiplier} style={{
                    backgroundColor: "grey",
                    marginTop: "10px",
                    width: "150px",
                    height: "70px",
                    color: "gold"
                }}>2x multiplier
                </button>
            </div>
        </div>
    );
};

export default BoostPage;