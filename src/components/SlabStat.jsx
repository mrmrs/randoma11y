import React from 'react';

const SlabStat = ({ label, value, unit = '', style = {} }) => (
  <dl style={{ margin: 0, ...style }}>
    <dt style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, marginBottom: '2px' }}>{label}</dt>
    <dd style={{ margin: 0, fontWeight: 700, fontSize: '32px', lineHeight: 1 }}>
      {value}{unit && <span style={{ fontSize: '14px', marginLeft: 2 }}>{unit}</span>}
    </dd>
  </dl>
);

export default SlabStat; 