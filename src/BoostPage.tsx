import React, {useEffect, useState} from 'react';

let countdownIntArea: any = null;
let countdownIntSpeed: any = null;
let countdownIntMulti: any = null;

let increaseAreaCountdown = 0;
let reduceSpeedCountdown = 0;
let multiplierCountdown = 0;

const BoostPage = () => {

    const fillEnergy= () => localStorage.setItem('energyLeft',JSON.stringify(100));

    const [areaTime, setAreaTime] = useState(increaseAreaCountdown);
    const [speedTime, setSpeedTime] = useState(reduceSpeedCountdown);
    const [multiTime, setMultiTime] = useState(multiplierCountdown);


    const increaseArea = () => {
        enableBoost("increaseArea","increaseAreaB","increaseAreaCounter")
        setAreaTime(3600);
    }

    const reduceSpeed = () => {
        enableBoost("reduceSpeed","speedReduceB","reduceSpeedCounter")
        setSpeedTime(3600)
    }

    const multiplier = () => {
        enableBoost("multiplierBoost","multiplierB","multiplierCounter")
        setMultiTime(3600)
    }

    function enableBoost(boostName:string, buttonId:string,timeId:string){
        localStorage.setItem(boostName,JSON.stringify(10));
        saveFromOneHour(new Date(),timeId)
        let button = document.getElementById(buttonId);
        // @ts-ignore
        button.setAttribute("disabled","true");
    }

    function saveFromOneHour(date:Date,saveId:string){
        date.setHours(date.getHours() + 1);
        localStorage.setItem(saveId, JSON.stringify(date));
    }

    function checkClickable(indicator:number,buttonId:string){
        let button = document.getElementById(buttonId);
        if ((indicator) > 0){
            // @ts-ignore
            button.setAttribute("disabled","true");
        }
        else{
            // @ts-ignore
            button.removeAttribute("disabled");
        }
    }

    useEffect(() => {
        // @ts-ignore
        const timeLastSavedArea: Date = JSON.parse(localStorage.getItem("increaseAreaCounter"));
        if (timeLastSavedArea !== null){
            const now = new Date();
            const savedTime = new Date(timeLastSavedArea);
            increaseAreaCountdown = Math.floor((savedTime.getTime() - now.getTime())/1000)
            setAreaTime(increaseAreaCountdown);
        }
        // @ts-ignore
        const timeLastSavedSpeed: Date = JSON.parse(localStorage.getItem("reduceSpeedCounter"));
        if (timeLastSavedSpeed !== null){
            const now = new Date();
            const savedTime = new Date(timeLastSavedSpeed);
            reduceSpeedCountdown = Math.floor((savedTime.getTime() - now.getTime())/1000)
            setSpeedTime(reduceSpeedCountdown)
        }
        // @ts-ignore
        const timeLastSavedMultiplier: Date = JSON.parse(localStorage.getItem("multiplierCounter"));
        if (timeLastSavedMultiplier !== null){
            const now = new Date();
            const savedTime = new Date(timeLastSavedMultiplier);
            multiplierCountdown = Math.floor((savedTime.getTime() - now.getTime())/1000)
            setMultiTime(multiplierCountdown)
        }
    }, []);

    useEffect(() => {
        checkClickable(areaTime,"increaseAreaB",);
        checkClickable(speedTime,"speedReduceB");
        checkClickable(multiTime,"multiplierB");
    }, [areaTime, multiTime, speedTime]);

    const counterIncArea = () => {
        if (areaTime > 0){
            const minutes = Math.floor(areaTime / 60);
            const seconds = `0${areaTime % 60}`.slice(-2);
            return `${minutes}:${seconds} to unlock`;
        }
        else{
            return "Claimable"
        }
    }
    const counterSpeedReduce = () => {
        if (speedTime > 0){
            const minutes = Math.floor(speedTime / 60);
            const seconds = `0${speedTime % 60}`.slice(-2);
            return `${minutes}:${seconds} to unlock`;
        }
        else{
            return "Claimable"
        }
    }
    const counterMultiplier = () => {
        if (multiTime > 0){
            const minutes = Math.floor(multiTime / 60);
            const seconds = `0${multiTime % 60}`.slice(-2);
            return `${minutes}:${seconds} to unlock`;
        }
        else{
            return "Claimable"
        }
    }

    useEffect(() => {
        if (areaTime > 0){
            countdownIntArea = setInterval(() => {
                setAreaTime(areaTime => areaTime-1);
            }, 1000);

        }
        return () => clearInterval(countdownIntArea)
    }, [areaTime]);

    useEffect(() => {
        if (speedTime > 0){
            countdownIntSpeed = setInterval(() => {
                setSpeedTime(speedTime => speedTime-1)
            }, 1000);

        }
        return () => clearInterval(countdownIntSpeed)
    }, [speedTime]);
    useEffect(() => {
        if (multiTime > 0){
            countdownIntMulti = setInterval(() => {
                setMultiTime(multiTime => multiTime-1);
            }, 1000);

        }
        return () => clearInterval(countdownIntMulti)
    }, [multiTime]);

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
                <button id={"increaseAreaB"} onClick={increaseArea} style={{
                    backgroundColor: "grey",
                    marginTop: "10px",
                    width: "150px",
                    height: "70px",
                    color: "gold"
                }}>Increase Area
                    <div style={{
                        height: "16px",
                        color: "gold",
                        fontSize: '16px'
                    }}>{counterIncArea()}</div>
                </button>
            </div>
            <div>
                <button id={"speedReduceB"} onClick={reduceSpeed} style={{
                    backgroundColor: "grey",
                    marginTop: "10px",
                    width: "150px",
                    height: "70px",
                    color: "gold"
                }}>Speed Reducer
                    <div style={{
                        height: "16px",
                        color: "gold",
                        fontSize: '16px'
                    }}>{counterSpeedReduce()}</div>
                </button>
            </div>
            <div>
                <button id={"multiplierB"} onClick={multiplier} style={{
                    backgroundColor: "grey",
                    marginTop: "10px",
                    width: "150px",
                    height: "70px",
                    color: "gold"
                }}>2x multiplier
                    <div style={{
                        height: "16px",
                        color: "gold",
                        fontSize: '16px'
                    }}>{counterMultiplier()}</div>
                </button>
            </div>
        </div>
    );
};

export default BoostPage;