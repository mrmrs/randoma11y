import React from 'react';

const BadgeOutline = ({ colorPair, borderRadius = 0, ...props }) => {
    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px 4px',
            borderRadius: borderRadius,
            backgroundColor: colorPair[0],
            color: colorPair[1],
            boxShadow: 'inset 0 0 0 1px currentColor',
            fontSize: '10px',
            whiteSpace: 'nowrap',
        }} {...props} />

    );
};

export default BadgeOutline;
