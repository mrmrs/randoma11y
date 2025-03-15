import React from 'react';

const StatusDot = ({ colorPair, size = '8px', borderRadius = 0, ...props }) => {
    return (
        <span style={{
            whiteSpace: 'nowrap',
            display: 'inline-flex',
            alignItems: 'center',
            height: size,
            width: size,
            aspectRatio: 1,
            backgroundColor: colorPair[1],
            color: colorPair[0],
            fontSize: '10px',
        }} {...props} />

    );
};

export default StatusDot;
