import React, { useState } from 'react';

import './Tab.styles.scss';

const Tab = ({ tabData = [] }) => {
  const [activeTab, setActiveTab] = useState(tabData[0]);

  if (!activeTab) return;

  return (
    <div className="tab">
      <ul className="tab-list">
        {tabData.map((tab) => (
          <li
            onClick={() => setActiveTab(tab)}
            key={tab.id}
            className={`tab-selector ${
              tab.id === activeTab.id ? 'active' : ''
            }`}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <div className="tab-content">{activeTab.content}</div>
    </div>
  );
};

export default Tab;
