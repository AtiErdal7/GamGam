import React, {useRef, useState} from 'react';

// @ts-ignore
const ScrollContainerVertical = ({height}) => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4','Item 5','Item 6','Item 7','Item 8'];
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setStartY(e.clientY);
        if (ref.current) {
            setScrollTop(ref.current.scrollTop);
        }
    };

    const onDrag = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !ref.current) return;
        e.preventDefault();
        const newY = e.clientY;
        const diff = newY - startY;
        ref.current.scrollTop = scrollTop - diff;
    };

    const stopDragging = () => {
        setIsDragging(false);
    };

    return (
        <div
            className="vertical-scroll-profile"
            ref={ref}
            onMouseDown={startDragging}
            onMouseMove={onDrag}
            onMouseLeave={stopDragging}
            onMouseUp={stopDragging}
            style={{cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none', height: height, overflowY: 'auto'}}
        >
            {items.map((item, index) => (
                <div key={index} className="item2" style={{textAlign: 'center', lineHeight: '130px'}}>
                    {item}
                </div>
            ))}
        </div>
    );
}
export default ScrollContainerVertical;