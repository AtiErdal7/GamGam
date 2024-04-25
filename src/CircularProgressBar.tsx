import React, {useEffect, useState} from 'react';
import {debug} from "node:util";

let clickAmount = 0;
let energyLimit = 100;
let energyRemains = 100;

let interval: any = null;
let energyTInterval: any = null;
let initialTime = 2;
let increaseTime = 5;

// @ts-ignore
const CircularProgress = () => {
    const size = 260;
    const strokeWidth = 10;
    const circleOneStroke = "grey";
    const circleTwoStroke="#DE66D4";

    const [progress, setProgress] = useState(clickAmount);

    const angle = 2 * Math.PI * (progress / 10000000) - Math.PI / 2;
    const radius = (size-10 - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 10000000) * circumference;

    const ballRadius = strokeWidth;
    const ballX = size / 2 + radius * Math.cos(angle);
    const ballY = size / 2 + radius * Math.sin(angle);

    const centerX = size / 2;
    const centerY = size / 2;

    // @ts-ignore
    const savedTickets = JSON.parse(localStorage.getItem('myTickets'));
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

    const [number,setClickAmount] = useState(clickAmount);
    const [energy,setEnergyAmount] = useState(energyRemains);
    const [time, setTime] = useState(initialTime);
    const [energyTime, setEnergyTime] = useState(increaseTime);
    const [isActive, setIsActive] = useState(false);
    const [isEnergyFull, setIsEnergyFull] = useState(false);

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
        let button = document.getElementById('clickButton');
        clickAmount++
        energyRemains--
        // @ts-ignore
        button.setAttribute("disabled","true");
        setIsEnergyFull(false);
        setEnergyAmount(energyRemains);
        setProgress(prevProgress => Math.min(prevProgress + 1));
        setClickAmount(clickAmount);
        localStorage.setItem('myTickets',JSON.stringify(clickAmount))
        localStorage.setItem('energyLeft',JSON.stringify(energyRemains))
    }

    return (
        <div className="clickPage">
            <h2
            style={{
                color:"white",
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
            <svg width={size} height={size}>
                    <g transform={`rotate(-90 ${centerX} ${centerY})`}>
                        <circle
                            stroke={circleOneStroke}
                            fill="transparent"
                            strokeWidth={strokeWidth}
                            strokeDasharray={circumference + ' ' + circumference}
                            style={{strokeDashoffset: 0}}
                            r={radius}
                            cx={centerX}
                            cy={centerY}
                        />
                        <circle
                            stroke={circleTwoStroke}
                            fill="transparent"
                            strokeWidth={strokeWidth}
                            strokeDasharray={circumference}
                            style={{strokeDashoffset: offset}}
                            r={radius}
                            cx={centerX}
                            cy={centerY}
                        />
                    </g>
                    {/* White ball */}
                    <circle
                        cx={ballX}
                        cy={ballY}
                        r={ballRadius}
                        fill="white"
                    />
                    <text
                        x="50%"
                        y="45%"
                        alignmentBaseline="middle"
                        textAnchor="middle"
                        fill="white"
                        fontSize={size / 10}
                        dy=".3em">
                        {formatTime()}
                    </text>
                </svg>
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