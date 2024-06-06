import React from 'react';

const StatusDotOutline = ({ colorPair, size = '8px', borderRadius = 0, ...props }) => {
    return (
        <span style={{
            whiteSpace: 'nowrap',
            display: 'inline-flex',
            alignItems: 'center',
            height: size,
            width: size,
            backgroundColor: colorPair[0],
            color: colorPair[1],
            boxShadow: 'inset 0 0 0 1px currentColor',
        }} {...props} />

    );
};

export default StatusDotOutline;
