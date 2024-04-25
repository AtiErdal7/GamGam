import React, {useEffect, useRef, useState} from "react";
import {NavLink} from "react-router-dom";

    const ScrollContainerHorizontal = () => {
        const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
        const containerRef = useRef<HTMLDivElement>(null);
        const [isDragging, setIsDragging] = useState(false);
        const [startX, setStartX] = useState(0);
        const [scrollStartX, setScrollStartX] = useState(0);
        const [activeIndex, setActiveIndex] = useState(0);
        const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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

        useEffect(() => {
            const handleScroll = () => {
                if (containerRef.current) {
                    const scrollLeft = containerRef.current.scrollLeft;
                    let cumulativeWidth = 0;

                    for (let i = 0; i < itemRefs.current.length; i++) {
                        const item = itemRefs.current[i];
                        if (item) {
                            cumulativeWidth += item.offsetWidth;
                            if (scrollLeft < cumulativeWidth) {
                                setActiveIndex(i);
                                break;
                            }
                        }
                    }
                }
            };

            containerRef.current?.addEventListener('scroll', handleScroll);

            return () => {
                containerRef.current?.removeEventListener('scroll', handleScroll);
            };
        }, []);

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
                    style={{ overflow: 'auto', whiteSpace: 'nowrap' }}
                >
                    {items.map((item, index) => (
                        <div key={index} ref={el => itemRefs.current[index] = el} className="item" style={{ display: 'flex', width: '100%' }}>
                            {item}
                        </div>
                    ))}
                </div>
                <div className="indicator-container">
                    {items.map((_, index) => (
                        <span key={index} className={`dot ${index === activeIndex ? 'active' : ''}`}/>
                    ))}
                </div>
            </div>
        );
    };

export default ScrollContainerHorizontal;