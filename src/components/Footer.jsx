import React from 'react';

const Footer = ({ count, ...props }) => {
    return (
      <footer style={{ padding: '32px 8px' }} {...props}>
        <small style={{ fontSize: '10px', display: 'block', textAlign: 'center' }}>{Intl.NumberFormat().format(count)} generated combinations</small>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p style={{ margin: 0, fontSize: '10px' }}>Created by <a title="John Otander" href="https://johno.com" style={{ color: 'currentColor' }}>John Otander</a> &amp; <a href="https://mrmrs.cc" title="Adam Morse" style={{ color: 'currentColor' }}>Adam Morse</a></p>
      <a href='/live' style={{ fontSize: '10px', color: 'currentColor', }}>Live Feed</a>
      </div>
      </footer>

    );
};

export default Footer;
