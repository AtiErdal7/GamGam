import React, {useEffect, useState} from 'react';
let clickAmount = 0;
let energyLimit = 100;
let energyRemains = 100;

let interval: any = null
let energyTInterval: any = null;
let initialTime = 1;
let increaseTime = 5;
let yellowSectorSize = 8;
let greenSectorSize = 14;
let yellowIncrease = 2;
let greenIncrease = 3;
let increaseAmount = 0;

// @ts-ignore
const CircularProgress = () => {

    const size = 260;
    const strokeWidth = 10;
    const circleOneStroke = "grey";


    const [progress, setProgress] = useState(0);

    const angle = 2 * Math.PI * (progress / 360) - Math.PI / 2;
    const radius = (size - strokeWidth) / 2;
    const radiusForZone = (size) / 2;

    const ballRadius = strokeWidth-4;
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
    const [indicatorAngle, setIndicatorAngle] = useState(angle);
    const [time, setTime] = useState(initialTime);
    const [speed, setSpeed] = useState(1);
    const [streak, setStreak] = useState(0);
    const [showMessage, setShowMessage] = useState(false);
    const [messageColor, setMessageColor] = useState("white");
    const [energyTime, setEnergyTime] = useState(increaseTime);
    const [isActive, setIsActive] = useState(false);
    const [isEnergyFull, setIsEnergyFull] = useState(false);
    const [hits, setHits] = useState(0);

    const containerStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    };

    //circle the ball
    useEffect(() => {
        const circleInt = setInterval(() => {
            setProgress(progress => progress+speed)
        },10)
        
        if (progress>360)
            setProgress(0);

        return () =>{
            clearInterval(circleInt);
        }
    }, [progress, speed]);

    //timer after click
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

    //energy system
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
        const inGreen = progress >= indicatorAngle+8 && progress <= indicatorAngle + 22;
        const inYellow = ((progress <= indicatorAngle + 30 && progress >= indicatorAngle + 22) || (progress >= indicatorAngle &&progress <= indicatorAngle + 8));

        if (inGreen || inYellow) {
            setHits(prevHits => prevHits + 1);
            setStreak(streak => streak + 1);
            if (inGreen){
                clickAmount += greenIncrease;
                increaseAmount = greenIncrease
                setMessageColor("green");
            }
            else if (inYellow){
                clickAmount += yellowIncrease;
                increaseAmount = yellowIncrease
                setMessageColor("gold");
            }
            setShowMessage(true)
            setTimeout(() => setShowMessage(false), 1000);

        } else {
            setHits(0);
            setSpeed(1);
            setStreak(0);
            yellowSectorSize =8;
            greenSectorSize =14;
            setIndicatorAngle(Math.random() * 360);
        }

        if (hits + 1 === 3) { // Check if it's the third successful hit before resetting
            if (yellowSectorSize > 3)
                yellowSectorSize -=1;
            if (greenSectorSize > 1)
                greenSectorSize -=1;
            if (speed < 4)
                setSpeed(speed => speed+0.6);

            setIndicatorAngle(Math.random() * 360);
            setHits(0); // Reset hits
        }

        setIsActive(true);
        let button = document.getElementById('clickButton');
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
    const calculateSectorPath = (startAngle: number, endAngle: number): string => {
        const start = polarToCartesian(radiusForZone, startAngle);
        const end = polarToCartesian(radiusForZone, endAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        return [
            "M", radiusForZone, radiusForZone,
            "L", start.x, start.y,
            "A", radiusForZone, radiusForZone, 0, largeArcFlag, 1, end.x, end.y,
            "L", radiusForZone, radiusForZone
        ].join(" ");
    };
    const polarToCartesian = (radius: number, angleInDegrees: number) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

        return {
            x: radiusForZone + (radiusForZone * Math.cos(angleInRadians)),
            y: radiusForZone + (radiusForZone * Math.sin(angleInRadians))
        };
    };


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
                    <g transform={`rotate(0 ${centerX} ${centerY})`}>
                        <circle
                            stroke={circleOneStroke}
                            fill="transparent"
                            strokeWidth={strokeWidth}
                            style={{strokeDashoffset: 0}}
                            r={radius}
                            cx={centerX}
                            cy={centerY}

                        />
                        <path d={calculateSectorPath(indicatorAngle, indicatorAngle + yellowSectorSize)} fill="#DAD300"/>
                        <path
                            d={calculateSectorPath(indicatorAngle + yellowSectorSize, indicatorAngle + yellowSectorSize + greenSectorSize)}
                            fill="#04650F"/>
                        <path
                            d={calculateSectorPath(indicatorAngle + yellowSectorSize + greenSectorSize, indicatorAngle + 2 * yellowSectorSize + greenSectorSize)}
                            fill="#DAD300"/>
                        <circle
                            fill="transparent"
                            strokeWidth={strokeWidth}
                            r={radius}
                            cx={centerX}
                            cy={centerY}
                        />
                    </g>
                    <circle
                        cx={ballX}
                        cy={ballY}
                        r={ballRadius}
                        fill="#DE66D4"
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
                height: '90vh',
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
            <h2 style={{
                paddingTop:10
            }}>Streak: {streak}</h2>
            <h2 style={{
                color: "white",
                paddingTop:10
            }}>Tickets: <text>{clickAmount}</text> {showMessage && <text style={{color: messageColor}}>+{increaseAmount}</text>}</h2>
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