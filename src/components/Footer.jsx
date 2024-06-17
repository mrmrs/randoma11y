import React from 'react';

const Footer = ({ count, ...props }) => {
    return (
      <footer style={{ padding: '16px 8px' }} {...props}>
      <small style={{ fontSize: '10px', display: 'block', textAlign: 'center' }}>{Intl.NumberFormat().format(count)} generated combinations</small>
      <p style={{ fontSize: '10px' }}>Created by <a title="John Otander" href="https://johno.com" style={{ color: 'currentColor' }}>John Otander</a> &amp; <a href="https://mrmrs.cc" title="Adam Morse" style={{ color: 'currentColor' }}>Adam Morse</a></p>
      </footer>

    );
};

export default Footer;
