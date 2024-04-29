import React, {useEffect, useState} from 'react';
import {debug} from "node:util";

let clickAmount = 0;
let energyLimit = 100;
let energyRemains = 100;

let interval: any = null;
let circleInterval: any = null;
let energyTInterval: any = null;
let initialTime = 15;
let increaseTime = 60;

// @ts-ignore
const CircularProgress = () => {
    const initialSize = 250;
    const shrinkAmount = 11;
    const maxScore = 100;
    const minSize = 25;

    const [circleSize, setCircleSize] = useState<number>(initialSize);
    const [score, setScore] = useState<number>(0);
    const [number,setClickAmount] = useState(clickAmount);
    const [energy,setEnergyAmount] = useState(energyRemains);
    const [time, setTime] = useState(initialTime);
    const [energyTime, setEnergyTime] = useState(increaseTime);
    const [isActive, setIsActive] = useState(false);
    const [isEnergyFull, setIsEnergyFull] = useState(false);

    useEffect(() => {

        if (isActive === false ){
            circleInterval = setInterval(() => {
                setCircleSize(prevSize => {
                    if (prevSize - shrinkAmount > minSize) {
                        setScore(score+5)
                        return prevSize - shrinkAmount;
                    } else {
                        setScore(0);
                        return 250;
                    }
                });
            }, 100);
        }
        return () => clearInterval(circleInterval); // Clean up interval on component unmount
    }, [isActive, score]); // Dependency array includes score to reset interval when score is logged


    // @ts-ignore
    const savedTickets = JSON.parse(localStorage.getItem('myScore'));
    if (savedTickets !== null){
        clickAmount = savedTickets;
    }
    // @ts-ignore
    const energyLeft = JSON.parse(localStorage.getItem('energyLeft'));
    if (energyLeft !== null){
        energyRemains = energyLeft;

        if (energyRemains > 100){
            energyRemains = 100;
        }
    }

    const containerStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        cursor: 'pointer'
    };

    useEffect(() => {
        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime((time) => time - 1);
            }, 1000);
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }
        else if (isActive  && time === 0){
            clearInterval(interval);
            let button = document.getElementById('clickButton');
            // @ts-ignore
            button.removeAttribute("disabled");
            resetTimer();
        }

        return () => {
            clearInterval(interval);
        }
    }, [isActive, time]);


    useEffect(() => {
        if (!isEnergyFull && energyTime > 0){
            energyTInterval = setInterval(() => {
                setEnergyTime((time) => time - 1);
            }, 1000);
        }
        else if (!isEnergyFull && energyTime === 0){
            energyRemains++
            setEnergyAmount(energyRemains);
            localStorage.setItem('energyLeft',JSON.stringify(energyRemains))
            if (energyRemains === 100)
                setIsEnergyFull(true);
            setEnergyTime(increaseTime)
        }

        return () => {
            clearInterval(energyTInterval);
        }
    },[isEnergyFull,energyTime]);

    const formatTime = () => {
        if (isActive){
            const minutes = Math.floor(time / 60);
            const seconds = `0${time % 60}`.slice(-2);
            return `${minutes}:${seconds} to next tap`;
        }
        else{
            return "Tap to earn"
        }
    };

    const energyTimer = () => {
        if (energyRemains < 100){
            const minutes = Math.floor(energyTime / 60);
            const seconds = `0${energyTime % 60}`.slice(-2);
            return `${minutes}:${seconds} to energy increase`;
        }
        else{
            return "Energy full"
        }
    }

    const resetTimer = () => {
        setTime(initialTime);
        setIsActive(false);
    };
    const handleClick = () => {
        setIsActive(true);
        clickAmount += score;
        energyRemains--
        setScore(0);
        setIsEnergyFull(false);
        setEnergyAmount(energyRemains);
        setClickAmount(clickAmount);
        setCircleSize(250);
        localStorage.setItem('myScore',JSON.stringify(clickAmount))
        localStorage.setItem('energyLeft',JSON.stringify(energyRemains))
    }

    return (
        <div className="clickPage">
            <h2
                style={{
                    color: "white",
                    paddingTop: '50px'
                }}>Tap Remains</h2>
            <h2 style={{
                color: "white",
                fontSize: "48px"
            }}

            >{energyRemains + "/" + energyLimit}
                <div style={containerStyle}>
                    <div style={{width: '50%'}}>
                        <ProgressBar energy={energyRemains}></ProgressBar>
                    </div>
                </div>
                <div style={{
                    color: "grey",
                    fontSize: '16px'
                }}>{energyTimer()}</div>
            </h2>

            <div className="tapInfoContainer">
                <div className="square">
                    <h2 style={{
                        fontSize: '15px',
                        color: '#AAAAAA'
                    }}>Total Tap</h2>
                    <h2 style={{
                        fontSize: '20px',
                        color: 'white'
                    }}>{clickAmount}</h2>
                </div>
                <div className="square">
                    <h2 style={{
                        fontSize: '15px',
                        color: '#AAAAAA'
                    }}>Reach to Reward</h2>
                    <h2 style={{
                        fontSize: '20px',
                        color: 'white'
                    }}>5.6/10M</h2>
                </div>
            </div>
            <div style={{
                cursor: 'pointer',
                width: '100%',
                height: '30vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div className="gameArea">
                    <button
                        id="circle"
                        style={{
                            width: `${circleSize}px`,
                            height: `${circleSize}px`,
                            lineHeight: `${circleSize}px`
                        }}
                        onClick={handleClick}
                    >
                    </button>
                </div>

            </div>
            <button id="clickButton" onClick={handleClick} style={{
                width: '100vw',
                height: '60vh',
                margin: 0,
                border: 'none',
                backgroundColor: 'transparent',
                color: 'transparent', // In case there's text you want to hide
                padding: 0,
                cursor: 'pointer',
                outline: 'none', // Removes the outline on focus
                position: 'absolute',
                top: 0,
                left: 0
            }}>
            </button>
            <text
                x="50%"
                y="45%"
                alignmentBaseline="middle"
                textAnchor="middle"
                fill="white"
                color="white"
                fontSize={initialSize / 10}
                dy=".3em">
                {formatTime()}
            </text>
            <p>Score: {score}</p>
        </div>
    );
};

// @ts-ignore
const ProgressBar = ({energy}) => {
    const containerStyles = {
        height: 4,
        width: '100%',
        backgroundColor: "grey",
        borderRadius: 50
    };

    const fillerStyles = {
        height: '100%',
        width: `${energy}%`,
        backgroundColor: '#DE66D4',
        borderRadius: 'inherit',
        transition: 'width 0.5s ease-in-out',
    };

    return (
        <div style={containerStyles}>
            <div style={fillerStyles} />
        </div>
    );
}


export default CircularProgress;