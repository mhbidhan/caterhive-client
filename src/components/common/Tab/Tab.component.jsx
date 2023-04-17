import React, { useEffect, useState } from 'react';
import './Tab.styles.scss';

const Tab = ({ tabData = [], id }) => {
  const [activeTab, setActiveTab] = useState([]);

  useEffect(() => {
    const lastActive = localStorage.getItem('lastTab' + id);
    if (!lastActive) {
      setActiveTab(tabData[0]);
    } else {
      setActiveTab(tabData.find((tab) => tab.id === lastActive));
    }
  }, [tabData, id]);

  if (!activeTab) return;

  return (
    <div className="tab">
      <ul className="tab-list">
        {tabData.map((tab) => (
          <li
            onClick={() => {
              localStorage.setItem('lastTab' + id, tab.id);
              setActiveTab(tab);
            }}
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
