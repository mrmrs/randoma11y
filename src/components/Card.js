import React from 'react';

const Card = ({ colorPair, title = 'A default card title', description = 'Ye old classic lorem ipsum at the most finest moment in time', image }) => {
  const cardStyle = {
    backgroundColor: colorPair[0],
    color: colorPair[1],
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
    marginBottom: '16px',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '8px',
  };

  const descriptionStyle = {
    fontSize: '16px',
  };

  return (
    <div style={cardStyle}>
      <img src={image} alt={title} style={imageStyle} />
      <h2 style={titleStyle}>{title}</h2>
      <p style={descriptionStyle}>{description}</p>
    </div>
  );
};

export default Card;
