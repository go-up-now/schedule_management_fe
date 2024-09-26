import React, { useState } from 'react';

interface Tab {
    id: string;
    label: string;
    content: React.ReactNode;

}

interface TabPanelProps {
    tabs: Tab[];
    defaultTabId?: string;
    ulClassName?: string;
    activeClassName?: string;
    inactiveClassName?: string;
    onShow?: (id: string) => void;
}

const TabPanel: React.FC<TabPanelProps> = ({ tabs, defaultTabId, ulClassName, activeClassName, inactiveClassName }) => {
    //   const [activeTab, setActiveTab] = useState(tabs[0].id);
    const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0].id);

    // useEffect(() => {
    //   if (onShow) {
    //     onShow(activeTab);
    //   }
    // }, [activeTab, onShow]);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };

    return (
        <div>
            <div className="mb-1">
                <ul className={` ${ulClassName || 'flex flex-wrap -mb-px text-sm font-medium text-center'}`} role="tablist" >
                    {tabs.map((tab) => (
                        <li key={tab.id} className="mr-2" role="presentation">
                            <button
                                className={`inline-block p-2 rounded-t-lg ${activeTab === tab.id
                                    ? activeClassName
                                    : inactiveClassName
                                    }`}
                                id={`${tab.id}-tab`}
                                type="button"
                                role="tab"
                                aria-controls={tab.id}
                                aria-selected={activeTab === tab.id}
                                onClick={() => handleTabClick(tab.id)}
                            >
                                {tab.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                {tabs.map((tab) => (

                    <div
                        key={tab.id}
                        className={`px-5 py-3 border border-gray-100 rounded-lg shadow-lg my-4 ${activeTab === tab.id ? '' : 'hidden'
                            }`}
                        id={tab.id}
                        role="tabpanel"
                        aria-labelledby={`${tab.id}-tab`}
                    >
                        {activeTab === tab.id &&
                            <div className="">
                                {tab.content}
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabPanel;
