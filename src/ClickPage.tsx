import React, {useEffect} from "react";
import CircularProgressBar from "./CircularProgressBar";

const ClickPage = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

    }, []);

    return (
        <div>
            <CircularProgressBar></CircularProgressBar>
        </div>
    )

}

export default ClickPage;