import React from 'react';
import 'js/components/development/index.scss';

export default {
    Breakpoints: () => (
        <div id="breakpoint-helper">
            <div className="breakPoints">
                <div className="breakPoint" id="xs">
                    <span className="desc">Phone</span>
                    <span className="size">(0px)</span>
                    <span className="name">xs</span>
                </div>
                <div className="breakPoint" id="sm">
                    <span className="desc">Tablet</span>
                    <span className="size">(768px)</span>
                    <span className="name">sm</span>
                </div>
                <div className="breakPoint" id="md">
                    <span className="desc">Small screen</span>
                    <span className="size">(992px)</span>
                    <span className="name">md</span>
                </div>
                <div className="breakPoint" id="lg">
                    <span className="desc">Medium screen</span>
                    <span className="size">(1200px)</span>
                    <span className="name">lg</span>
                </div>
                <div className="breakPoint" id="xl">
                    <span className="desc">Large screen</span>
                    <span className="size">(1300px)</span>
                    <span className="name">xl</span>
                </div>
            </div>
        </div>
    )
};
