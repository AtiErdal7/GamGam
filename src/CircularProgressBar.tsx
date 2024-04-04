import React from 'react';

// @ts-ignore
const CircularProgress = ({ size, progress, strokeWidth, circleOneStroke, circleTwoStroke }) => {
    const angle = 2 * Math.PI * (progress / 100) - Math.PI / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    const ballRadius = strokeWidth;
    const ballX = size / 2 + radius * Math.cos(angle);
    const ballY = size / 2 + radius * Math.sin(angle);

    const centerX = size / 2;
    const centerY = size / 2;

    return (
        <div style={{ cursor: 'pointer', width: '100%', height: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg width={size} height={size}>
                <g transform={`rotate(-90 ${centerX} ${centerY})`}>
                    <circle
                        stroke={circleOneStroke}
                        fill="transparent"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{strokeDashoffset: 0}}
                        r={radius}
                        cx={centerX}
                        cy={centerY}
                    />
                    <circle
                        stroke={circleTwoStroke}
                        fill="transparent"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        style={{strokeDashoffset: offset}}
                        r={radius}
                        cx={centerX}
                        cy={centerY}
                    />
                    </g>
                    {/* White ball */}
                    <circle
                        cx={ballX}
                        cy={ballY}
                        r={ballRadius}
                        fill="white"
                    />
            </svg>
        </div>
);
};


export default CircularProgress;