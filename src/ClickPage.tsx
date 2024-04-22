import React, {useEffect} from "react";
import CircularProgressBar from "./CircularProgressBar";



const ClickPage = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

    }, []);

    return (
        <div>
            <CircularProgressBar></CircularProgressBar>
            <h2
                style={{
                    paddingTop: "46px",
                    color: "white",
                    fontSize: "16px",
                    marginBottom: "10px"
                }}
            >Lottery</h2>
            <h2
                style={{
                    color: "white",
                    fontSize: "32px",
                    marginBottom: "10px"
                }}
            >$500</h2>
            <h2
                style={{
                    color: "grey",
                    fontSize: "16px",
                    marginBottom: "30px"
                }}
            >100 TON</h2>
        </div>
    )

}

export default ClickPage;