import React from 'react';

const TextBox = ({ title, text, colorPair, borderRadius = 0, ...props }) => {
    return (
        <article style={{
            borderRadius: borderRadius,
            border: '1px solid currentColor',
            backgroundColor: colorPair[0],
            color: colorPair[1],
            padding: '24px'
        }}>
            <h2 style={{ marginTop: 0 }}>{title}</h2>
            <p style={{ lineHeight: 1.5, margin: 0, maxWidth: '65ch', fontSize: '1rem' }}>{text}</p>
        </article>

    );
};

export default TextBox;
