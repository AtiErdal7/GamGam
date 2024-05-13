import React, {useRef, useState} from 'react';

// @ts-ignore
const ScrollContainerVertical = ({height}) => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4','Item 5','Item 6','Item 7','Item 8'];
    const scrollViewRef  = useRef<HTMLDivElement>(null);

    const handleScroll = (direction: 'up' | 'down') => {
        if (scrollViewRef.current) {
            const scrollAmount = 149; // This should be the height of one item
            scrollViewRef.current.scrollTop += direction === 'down' ? scrollAmount : -scrollAmount;
        }
    };

    return (
        <>
            <button onClick={() => handleScroll('up')} style={{
                height: 25,
                width: 80,
                marginBottom:5
            }}>Up
            </button>
            <div
                className="vertical-scroll-profile"
                ref={scrollViewRef}
                style={{userSelect: 'none', height: height, overflowY: 'auto'}}
            >
                <div>
                    {items.map((item, index) => (
                        <div key={index} className="item2" style={{textAlign: 'center', lineHeight: '120px'}}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={() => handleScroll('down')} style={{
                height: 25,
                width: 80,
            }}>Down
            </button>

        </>
    )
}
export default ScrollContainerVertical;