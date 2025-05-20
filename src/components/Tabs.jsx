import React from 'react';
import { Tabs } from '@base-ui-components/react/tabs';

const BaseTabs = ({ colorPair, borderRadius = 0 }) => {
  const fg = colorPair ? colorPair[1] : 'currentColor';
  const bg = colorPair ? colorPair[0] : 'transparent';
  const [value, setValue] = React.useState(0);
  return (
    <>
      <style>{`
        .tabs-root {
          color: ${fg};
        }
        .tabs-list {
          display: flex;
          gap: 4px;
          border-bottom: 1px solid ${fg};
        }
        .tabs-tab {
          all: unset;
          padding: 4px 8px;
          cursor: pointer;
          font-size: 12px;
          border: 1px solid ${fg};
          background: ${bg};
          border-radius: ${borderRadius} ${borderRadius} 0 0;
        }
        .tabs-tab[data-selected] {
          background: ${fg};
          color: ${bg};
        }
        .tabs-panel {
          padding: 8px;
          border: 1px solid ${fg};
          border-radius: 0 0 ${borderRadius} ${borderRadius};
          background: ${bg};
          font-size: 12px;
        }
      `}</style>
      <Tabs.Root value={value} onValueChange={setValue} className="tabs-root">
        <Tabs.List className="tabs-list">
          <Tabs.Tab value={0} className="tabs-tab">One</Tabs.Tab>
          <Tabs.Tab value={1} className="tabs-tab">Two</Tabs.Tab>
          <Tabs.Tab value={2} className="tabs-tab">Three</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value={0} className="tabs-panel">First panel</Tabs.Panel>
        <Tabs.Panel value={1} className="tabs-panel">Second panel</Tabs.Panel>
        <Tabs.Panel value={2} className="tabs-panel">Third panel</Tabs.Panel>
      </Tabs.Root>
    </>
  );
};

export default BaseTabs;
