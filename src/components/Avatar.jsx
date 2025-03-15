import React from 'react';

const Avatar = ({ colorPair, borderRadius = 0, ...props }) => {
    return (
        <span style={{
            whiteSpace: 'nowrap',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            aspectRatio: 1,
            width: '32px',
            height: '32px',
            fontWeight: 700,
            borderRadius: borderRadius,
            backgroundColor: colorPair[1],
            color: colorPair[0],
            fontSize: '10px',
        }} {...props} />

    );
};

export default Avatar;
