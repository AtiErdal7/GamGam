import React, {useRef, useState} from 'react';

let showButtons: boolean = false;

// @ts-ignore
interface ListProps  {
    height: number;
    itemsList: string[]
}

const ScrollContainerVertical: React.FC<ListProps>= ({height, itemsList}) => {
    const scrollViewRef = useRef<HTMLDivElement>(null);

    const handleScroll = (direction: 'up' | 'down') => {
        if (scrollViewRef.current) {
            const scrollAmount = 150; // This should be the height of one item
            scrollViewRef.current.scrollTop += direction === 'down' ? scrollAmount : -scrollAmount;
        }
    };

    showButtons = itemsList.length > 3;

    return (
        <>
            {showButtons && <button onClick={() => handleScroll('up')} style={{
                height: 25,
                width: 80,
                marginBottom: 5
            }}>Up
            </button>}
            <div
                className="vertical-scroll-profile"
                ref={scrollViewRef}
                style={{userSelect: 'none', height: height, overflowY: 'auto'}}
            >
                <div>
                    {itemsList.map((item, index) => (
                        <div key={index} className="item2" style={{textAlign: 'center', lineHeight: '120px'}}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            {showButtons && <button onClick={() => handleScroll('down')} style={{
                height: 25,
                width: 80,
                marginTop: 5
            }}>Down
            </button>}

        </>
    )
}
export default ScrollContainerVertical;