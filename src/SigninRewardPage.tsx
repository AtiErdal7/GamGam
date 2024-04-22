import React, {useState} from 'react';
import RewardCollectPopup from "./RewardCollectPopup";

const SigninRewardPage = () => {

    const [isPopupOpen, setPopupOpen] = useState(false);
    const buttons = Array.from({ length: 30 }, (_, index) => ({
        id:index,
        index: index + 1,
    }));

    const [disabledButtons, setDisabledButtons] = useState({});
    // @ts-ignore
    const claimReward = (id) => {
        setDisabledButtons(prev => ({...prev,[id]: true}));
        setPopupOpen(true);
    }


    return (
        <div className="signin" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 60px)', // Creates 6 columns, each 50px wide
            gridGap: '6.5px', // Adjust spacing between squares
            justifyContent: 'left', // Centers the grid horizontally
            alignContent: 'center', // Centers the grid vertically
            height: '50vh' // Makes the container full viewport height
        }}>
            {buttons.map((button) => (
                <button
                    key={button.id}
                    // @ts-ignore
                    disabled={!!disabledButtons[button.id]}
                    onClick={()=>claimReward(button.id)}
                    style={{
                        width: '60px', // Set width for square shape
                        height: '60px', // Set height for square shape
                        margin: '1px',
                        // @ts-ignore
                        backgroundColor: disabledButtons[button.id] ? 'dimgrey' : '#00aaff'
                    }}
                >
                </button>
            ))}
            <RewardCollectPopup isOpen={isPopupOpen} close={() => setPopupOpen(false)}>
                <p>Congrats! You collected your reward.</p>
            </RewardCollectPopup>
        </div>
    );
};

export default SigninRewardPage;