import React from 'react';

const AvatarOutline = ({ colorPair, borderRadius = 0, ...props }) => {
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
            backgroundColor: colorPair[0],
            color: colorPair[1],
            boxShadow: 'inset 0 0 0 1px currentColor',
            fontSize: '10px',
        }} {...props} />

    );
};

export default AvatarOutline;
