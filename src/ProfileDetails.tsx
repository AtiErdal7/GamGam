import React, {useState} from 'react';
import ScrollContainerHorizontal from "./ScrollContainerVertical";

const ProfileDetails = () => {

    const [isCopied, setIsCopied] = useState(false);
    const walletId = "000000000001";

    const handleClickCopy = () => {
        navigator.clipboard.writeText(walletId)
            .then(() => {
                console.log('Text successfully copied to clipboard');
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000); // Reset after 2s
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    }

    return (
            <div className="profileDetails">
                <div className="profile-pic-big"></div>
                <div className={"rows-container"}>
                    <div className={"profile-detail-style"}>
                        <div>
                            <p style={{
                                fontSize: "16px",
                                color: "white"
                            }}>atierdal</p>
                            <p style={{
                                marginTop: "8px"
                            }}>atakan@multiplayer.com.tr</p>
                        </div>
                        <div className={"profile-edit-verified"}>
                            <button className={"edit-button"}>Edit</button>
                            <p className={"verified"}>Verified</p>
                        </div>
                    </div>
                    <div className={"wallet-address"}>
                        <text style={{
                            paddingLeft: "10px",
                            textAlign: "left",
                            display: "flex",
                            color: "grey"
                        }}>{walletId} </text>
                        <button onClick={handleClickCopy} className={"wallet-copy"}></button>
                    </div>
                    <div>
                        <h2 style={{
                            textAlign: "left",
                            fontSize: "16px",
                            color: "white"
                        }}>Badges</h2>
                        <div className={"badges-style"}>
                            <p className={"badges"}>Education</p>
                            <p className={"badges"}>Education</p>
                            <p className={"badges"}>Education</p>
                            <p className={"badges"}>Education</p>
                        </div>
                    </div>
                </div>
                <div className={"x-boost-text"}>
                    <text style={{
                        fontSize: "12px",
                        marginLeft: "8px",
                        paddingTop: "6px",
                        textAlign: "center",
                        display: "flex",
                        color: "white",
                }}>Great, your GamGam are boosting x1.5 MPs time more</text>
                </div>
                <div style={{
                    paddingLeft: 10,
                    gridArea: "third-row"
                }}>
                    <ScrollContainerHorizontal height={window.innerHeight/100*60}></ScrollContainerHorizontal>
                </div>


            </div>
    );
};

export default ProfileDetails;