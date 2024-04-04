import React, {useState,useEffect} from "react";

let clickAmount = 0;

let interval: any = null;

const ClickPage = () => {


    // @ts-ignore
    const savedTickets = JSON.parse(localStorage.getItem('myTickets'));
    if (savedTickets !== null){
        clickAmount = savedTickets;
    }
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
        const minutes = Math.floor(time / 60);
        const seconds = `0${time % 60}`.slice(-2);
        return `${minutes}:${seconds}`;
    };

    const resetTimer = () => {
        setTime(initialTime);
        setIsActive(false);
    };
    const handleClick = () => {
        clickAmount++;
        setIsActive(true);
        let button = document.getElementById('clickButton');
        // @ts-ignore
        button.setAttribute("disabled","true");
        setClickAmount(clickAmount);
        setTickets((savedTickets: number) => [savedTickets,clickAmount])
        localStorage.setItem('myTickets',JSON.stringify(savedTickets))
    }

    return (
        <div className="clickPage">
            <h2>Click to collect your ticket</h2>
            <div>{formatTime()}</div>
            <p>{number}</p>
            <button id="clickButton" onClick={handleClick} >Click</button>
        </div>
    );
}

export default ClickPage;