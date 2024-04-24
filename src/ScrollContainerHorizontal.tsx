import React, {useRef, useState} from "react";
import {NavLink} from "react-router-dom";

    const ScrollContainerHorizontal = () => {
        const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
        const containerRef = useRef<HTMLDivElement>(null);
        const [isDragging, setIsDragging] = useState(false);
        const [startX, setStartX] = useState(0);
        const [scrollStartX, setScrollStartX] = useState(0);

        const onDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
            setIsDragging(true);
            const clientX = e.type.includes('mouse') ? (e as React.MouseEvent).clientX : (e as React.TouchEvent).touches[0].clientX;
            setStartX(clientX);
            setScrollStartX(containerRef.current ? containerRef.current.scrollLeft : 0);
        };

        const onDragMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
            if (!isDragging) return;
            const currentX = e.type.includes('mouse') ? (e as React.MouseEvent).clientX : (e as React.TouchEvent).touches[0].clientX;
            const deltaX = currentX - startX;
            if (containerRef.current) {
                containerRef.current.scrollLeft = scrollStartX - deltaX;
            }
        };

        const onDragEnd = () => {
            setIsDragging(false);
        };

        return (
            <div>
                <div className="profileBar">
                    <NavLink to={"/profile"} className="profile-pic"></NavLink>
                    <div style={{
                        textAlign: "left",
                        alignItems: "center",
                        justifyContent: "left",
                        paddingLeft: "15px"
                    }}>
                        <h2 style={{
                            fontSize: "12px",
                        }}>Welcome back</h2>
                        <h2 style={{
                            fontSize: "16px",
                            color: "white"
                        }}>atierdal</h2>
                    </div>
                </div>

                <div
                    ref={containerRef}
                    className="scroll-container-horizontal"
                    onMouseDown={onDragStart}
                    onMouseMove={onDragMove}
                    onMouseUp={onDragEnd}
                    onMouseLeave={onDragEnd}
                    onTouchStart={onDragStart}
                    onTouchMove={onDragMove}
                    onTouchEnd={onDragEnd}
                >
                {items.map((item, index) => (
                    <div key={index} className="item">
                        {item}
                    </div>
                ))}
            </div>
            </div>
        );
    };

export default ScrollContainerHorizontal;