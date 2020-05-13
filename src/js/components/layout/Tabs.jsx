import React, { useState } from 'react';
import classnames from 'classnames';

import { SmallTitle } from 'js/components/ui/Typography';
import Badge from 'js/components/ui/Badge';

export default ({ tabs }) => {
    const [activeTabState, setActiveTabState] = useState(0);

    return <>
        <div className="row mb-4">
            <div className="col-12">
                <div className="ath-tabs d-flex justify-content-center border-bottom">
                    {tabs.map((tab, i) => (
                        <div
                            className={classnames(
                                activeTabState === i ? 'active' : null,
                                "tab card mx-4 p-0 border-0 rounded-top rounded-0 rounded-top bg-transparent"
                            )}
                            key={i}
                            onClick={() => setActiveTabState(i)}
                        >
                            <div className="card-body px-0 py-3">
                                <SmallTitle content={tab.title} isBlack={activeTabState === i && 'active'} />
                                <Badge value={tab.badge} className="ml-3" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {tabs.length > 0 && tabs[activeTabState].content}
    </>
}
