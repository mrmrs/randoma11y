import React from 'react';

const TextBox = ({ title, text = 'Color contrast is the difference in brightness between foreground and background colors. For accessibility purposes, aim for a 4.5:1 ratio between the foreground color (e.g. text, links, etc.) and the background color. This ratio ensures people with moderately low vision can tell the colors apart and see your content.', colorPair, borderRadius = 0, time, subtitle, ...props }) => {
    return (
        <article style={{
            borderRadius: borderRadius,
            border: '1px solid currentColor',
            backgroundColor: colorPair[0],
            color: colorPair[1],
            padding: '32px'
        }}>
            <h2 style={{ marginTop: 0, fontSize: '4rem', marginBottom: '8px', fontWeight: 900, lineHeight: .9 }}>{title}</h2>
            <h3 style={{ marginTop: 0, fontSize: '2rem', marginBottom: '16px', fontWeight: 600 }}>{subtitle}</h3>
            <h4 style={{ margin: 0, fontSize: '12px', marginBottom: '16px' }}><time>{time}</time></h4>
            <p style={{ lineHeight: 1.5, margin: 0, maxWidth: '65ch', fontSize: '1rem' }}>{text}</p>
        </article>

    );
};

export default TextBox;
