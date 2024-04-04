import React, {useState,useEffect} from "react";
import CircularProgressBar from "./CircularProgressBar";

let clickAmount = 0;

let interval: any = null;

const ClickPage = () => {
    // @ts-ignore
    const savedTickets = JSON.parse(localStorage.getItem('myTickets'));
    if (savedTickets !== null){
        clickAmount = savedTickets;
    }
    const [progress, setProgress] = useState(clickAmount);
    const [number,setClickAmount] = useState(clickAmount);
    const [tickets,setTickets] = useState(savedTickets)
    const [time, setTime] = useState(10);
    const [isActive, setIsActive] = useState(false);
    const initialTime = 10;

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
    const formatTime = () => {
        if (isActive !== false){
            const minutes = Math.floor(time / 60);
            const seconds = `0${time % 60}`.slice(-2);
            return `${minutes}:${seconds} to next tap`;
        }
        else{
            return "Tap to earn"
        }

    };

    const resetTimer = () => {
        setTime(initialTime);
        setIsActive(false);
    };
    const handleClick = () => {
        setIsActive(true);
        let button = document.getElementById('clickButton');
        // @ts-ignore
        button.setAttribute("disabled","true");
        setProgress(prevProgress => Math.min(prevProgress + 1));
        setClickAmount(clickAmount => clickAmount++);
        setTickets((savedTickets: number) => [savedTickets,clickAmount])
        console.log(clickAmount)
        localStorage.setItem('myTickets',JSON.stringify(savedTickets))
    }

    return (
        <div className="clickPage">
            <h2>Click to collect your ticket</h2>
            <CircularProgressBar progress={progress} size={150} strokeWidth={7} circleOneStroke="grey" circleTwoStroke="#00aaff" ></CircularProgressBar>
            <div>{formatTime()}</div>
            <button id="clickButton" onClick={handleClick} style={{ width: '100vw',
                height: '100vh',
                margin: 0,
                border: 'none',
                backgroundColor: 'transparent',
                color: 'transparent', // In case there's text you want to hide
                padding: 0,
                cursor: 'pointer',
                outline: 'none', // Removes the outline on focus
                position: 'absolute',
                top: 0,
                left: 0 }}>
            </button>
        </div>
    );
}

export default ClickPage;