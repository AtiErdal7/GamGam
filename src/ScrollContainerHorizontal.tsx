import React, {useEffect, useRef, useState} from "react";
import {Link, NavLink} from "react-router-dom";

    const ScrollContainerHorizontal = () => {
        const items = [
            {id:1, title:"item item-1", url:'http://www.google.com/',text1: "Hello!",text2:"Complete your mission"},
            {id:2, title:"item item-2",url:'http://www.google.com/',text1: "Ohayouuu!",text2:"Watch Video Ads"},
            {id:3, title:"item item-3",url:'http://www.google.com/',text1: "Hi!",text2:"Tweet somethings on x"},
            {id:4, title:"item item-4",url:'http://www.google.com/',text1: "Hiiii!",text2:"Fight!"},
        ];
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
                        <div key={item.id} ref={el => itemRefs.current[index] = el} className={item.title}
                        >
                            <Link to={item.url} style={{
                                width: '100%',
                                height: '100%',
                                textDecoration: "none",
                            }}>
                                <div className={"item-overlay"}>
                                    <div className={"item-container"}>
                                        <h2 style={{
                                            paddingLeft: 10,
                                            fontSize: 24,
                                            color: "white"
                                        }}>{item.text1}</h2>
                                        <h2 style={{
                                            paddingLeft: 10,
                                            fontSize: 20,
                                            color: "white"
                                        }}>{item.text2}</h2>
                                    </div>
                                </div>

                            </Link>

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