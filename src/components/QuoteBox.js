import React from 'react';

const Badge = ({ colorPair, borderRadius = 0, ...props }) => {
    return (
        <div style={{
            whiteSpace: 'nowrap',
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px 4px',
            borderRadius: borderRadius,
            backgroundColor: colorPair[1],
            color: colorPair[0],
            fontSize: '10px',
        }}>
            <blockquote>
        <p>
             
        </p>
            </blockquote>
        </div>

    );
};

export default Badge;
