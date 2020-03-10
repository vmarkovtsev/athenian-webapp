import React from 'react';

import Page from 'js/pages/templates/Page';

export default () => {

    var placeholderHeight = {
        height: '300px'
    };

    return (
        <Page>
            <div>
                <div className="row">
                    <div className="col-12 mb-3">
                        <p className="text-centerleft font-weight-light text-dark text-lg">Insight Layouts</p>
                    </div>
                </div>

                {/* ONE CHART */}
                <div className="card mb-4">
                    <div className="card-header bg-white font-weight-bold text-dark p-4">
                        <span className="text-m">One chart</span>
                    </div>
                    <div className="card-body py-5 px-4">
                        {/* First we add the chart row */}
                        <div className="row">
                            <div className="col-7">
                                {/* This is a placeholder for a real chart */}
                                <div className="w-100 h-100 bg-light text-center d-flex justify-content-center align-items-center">
                                    <span className="align-middle">CHART</span>
                                </div>
                                {/* Here ends the placeholder */}
                            </div>
                            <div className="col-5 align-self-center">
                                <div className="row justify-content-center">
                                    <div className="col-8">
                                        <div className="card mb-4 bg-light border-0">
                                            <div className="card-body p-4">
                                                <h5 className="card-title text-xs text-uppercase font-weight-bold">insight 1</h5>
                                                <h6 className="card-subtitle mb-2 text-xs text-uppercase">subtitle 1</h6>
                                                <div className="card-text">
                                                    <div className="font-weight-bold">
                                                        <span className="big-number font-weight-bold d-inline-block align-middle text-gray-900 text-lg">11 hours</span>
                                                        <span className="badge ml-2 badge font-weight-normal align-middle d-inline-block badge-success">
                                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-up" className="svg-inline--fa fa-caret-up fa-w-10 align-bottom" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"></path></svg>
                                                            <span className="ml-1">15%</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mb-4 bg-light border-0">
                                            <div className="card-body p-4"><h5
                                                className="card-title text-xs text-uppercase">insight
                                                2</h5>
                                                <h6
                                                    className="card-subtitle mb-2 text-xs text-uppercase">subtitle 2</h6>
                                                <div className="card-text">
                                                    <div className="font-weight-bold"><span
                                                        className="big-number font-weight-bold d-inline-block align-middle text-gray-900 text-lg">11 hours</span><span
                                                        className="badge ml-2 badge font-weight-normal align-middle d-inline-block badge-danger"><svg
                                                        aria-hidden="true" focusable="false" data-prefix="fas"
                                                        data-icon="caret-down"
                                                        className="svg-inline--fa fa-caret-down fa-w-10 align-bottom"
                                                        role="img"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path
                                                        fill="currentColor"
                                                        d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg><span
                                                        className="ml-1">20%</span></span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Here ends the chart row */}
                    </div>
                </div>

                {/* TWO CHARTS */}
                <div className="card mb-4">
                    <div className="card-header bg-white font-weight-bold text-dark p-4">
                        <span className="text-m">Two charts</span>
                    </div>
                    <div className="card-body py-5 px-4">
                        {/* First we add the first chart row */}
                        <div className="row">
                            <div className="col-7">
                                {/* This is a placeholder for a real chart */}
                                <div className="w-100 h-100 bg-light text-center d-flex justify-content-center align-items-center">
                                    <span className="align-middle">CHART</span>
                                </div>
                                {/* Here ends the placeholder */}
                            </div>
                            <div className="col-5 align-self-center">
                                <div className="row justify-content-center">
                                    <div className="col-8">
                                        <div className="card mb-4 bg-light border-0">
                                            <div className="card-body p-4">
                                                <h5 className="card-title text-xs text-uppercase font-weight-bold">insight 1</h5>
                                                <h6 className="card-subtitle mb-2 text-xs text-uppercase">subtitle 1</h6>
                                                <div className="card-text">
                                                    <div className="font-weight-bold">
                                                        <span className="big-number font-weight-bold d-inline-block align-middle text-gray-900 text-lg">11 hours</span>
                                                        <span className="badge ml-2 badge font-weight-normal align-middle d-inline-block badge-success">
                                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-up" className="svg-inline--fa fa-caret-up fa-w-10 align-bottom" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"></path></svg>
                                                            <span className="ml-1">15%</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mb-4 bg-light border-0">
                                            <div className="card-body p-4"><h5
                                                className="card-title text-xs text-uppercase">insight
                                                2</h5>
                                                <h6
                                                    className="card-subtitle mb-2 text-xs text-uppercase">subtitle 2</h6>
                                                <div className="card-text">
                                                    <div className="font-weight-bold"><span
                                                        className="big-number font-weight-bold d-inline-block align-middle text-gray-900 text-lg">11 hours</span><span
                                                        className="badge ml-2 badge font-weight-normal align-middle d-inline-block badge-danger"><svg
                                                        aria-hidden="true" focusable="false" data-prefix="fas"
                                                        data-icon="caret-down"
                                                        className="svg-inline--fa fa-caret-down fa-w-10 align-bottom"
                                                        role="img"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path
                                                        fill="currentColor"
                                                        d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg><span
                                                        className="ml-1">20%</span></span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Here ends the first chart row */}
                        {/* Here we add the second chart row */}
                        <div className="row mt-5">
                            <div className="col-7">
                                {/* This is a placeholder for a real chart */}
                                <div className="w-100 h-100 bg-light text-center d-flex justify-content-center align-items-center">
                                    <span className="align-middle">CHART</span>
                                </div>
                                {/* Here ends the placeholder */}
                            </div>
                            <div className="col-5 align-self-center">
                                <div className="row justify-content-center">
                                    <div className="col-8">
                                        <div className="card mb-4 bg-light border-0">
                                            <div className="card-body p-4">
                                                <h5 className="card-title text-xs text-uppercase font-weight-bold">insight 1</h5>
                                                <h6 className="card-subtitle mb-2 text-xs text-uppercase">subtitle 1</h6>
                                                <div className="card-text">
                                                    <div className="font-weight-bold">
                                                        <span className="big-number font-weight-bold d-inline-block align-middle text-gray-900 text-lg">11 hours</span>
                                                        <span className="badge ml-2 badge font-weight-normal align-middle d-inline-block badge-success">
                                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-up" className="svg-inline--fa fa-caret-up fa-w-10 align-bottom" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"></path></svg>
                                                            <span className="ml-1">15%</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mb-4 bg-light border-0">
                                            <div className="card-body p-4"><h5
                                                className="card-title text-xs text-uppercase">insight
                                                2</h5>
                                                <h6
                                                    className="card-subtitle mb-2 text-xs text-uppercase">subtitle 2</h6>
                                                <div className="card-text">
                                                    <div className="font-weight-bold"><span
                                                        className="big-number font-weight-bold d-inline-block align-middle text-gray-900 text-lg">11 hours</span><span
                                                        className="badge ml-2 badge font-weight-normal align-middle d-inline-block badge-danger"><svg
                                                        aria-hidden="true" focusable="false" data-prefix="fas"
                                                        data-icon="caret-down"
                                                        className="svg-inline--fa fa-caret-down fa-w-10 align-bottom"
                                                        role="img"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path
                                                        fill="currentColor"
                                                        d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg><span
                                                        className="ml-1">20%</span></span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Here ends the second chart row */}
                    </div>
                </div>

                {/* ONE CHART, ONE TABLE */}
                <div className="card mb-4">
                    <div className="card-header bg-white font-weight-bold text-dark p-4">
                        <span className="text-m">One chart, one table</span>
                    </div>
                    <div className="card-body py-5 px-4">
                        {/* First we add the chart row */}
                        <div className="row">
                            <div className="col-7">
                                {/* This is a placeholder for a real chart */}
                                <div className="w-100 h-100 bg-light text-center d-flex justify-content-center align-items-center">
                                    <span className="align-middle">CHART</span>
                                </div>
                                {/* Here ends the placeholder */}
                            </div>
                            <div className="col-5 align-self-center">
                                <div className="row justify-content-center">
                                    <div className="col-8">
                                        <div className="card mb-4 bg-light border-0">
                                            <div className="card-body p-4">
                                                <h5 className="card-title text-xs text-uppercase font-weight-bold">insight 1</h5>
                                                <h6 className="card-subtitle mb-2 text-xs text-uppercase">subtitle 1</h6>
                                                <div className="card-text">
                                                    <div className="font-weight-bold">
                                                        <span className="big-number font-weight-bold d-inline-block align-middle text-gray-900 text-lg">11 hours</span>
                                                        <span className="badge ml-2 badge font-weight-normal align-middle d-inline-block badge-success">
                                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-up" className="svg-inline--fa fa-caret-up fa-w-10 align-bottom" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"></path></svg>
                                                            <span className="ml-1">15%</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mb-4 bg-light border-0">
                                            <div className="card-body p-4"><h5
                                                className="card-title text-xs text-uppercase">insight
                                                2</h5>
                                                <h6
                                                    className="card-subtitle mb-2 text-xs text-uppercase">subtitle 2</h6>
                                                <div className="card-text">
                                                    <div className="font-weight-bold"><span
                                                        className="big-number font-weight-bold d-inline-block align-middle text-gray-900 text-lg">11 hours</span><span
                                                        className="badge ml-2 badge font-weight-normal align-middle d-inline-block badge-danger"><svg
                                                        aria-hidden="true" focusable="false" data-prefix="fas"
                                                        data-icon="caret-down"
                                                        className="svg-inline--fa fa-caret-down fa-w-10 align-bottom"
                                                        role="img"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path
                                                        fill="currentColor"
                                                        d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg><span
                                                        className="ml-1">20%</span></span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Here ends the chart row */}
                        {/* Here goes the table row */}
                        <div className="row">
                            <div className="col-12 mt-5">
                                {/* This is a placeholder to be replaced with a real table */}
                                <div className="w-100 bg-light text-center d-flex justify-content-center align-items-center" style={placeholderHeight}>
                                    <span className="align-middle">TABLE</span>
                                </div>
                                {/* Here ends the placeholder */}
                            </div>
                        </div>
                        {/* Here ends the table row */}
                    </div>
                </div>

                {/* TWO CHARTS, ONE TABLE */}
                <div className="card mb-4">
                    <div className="card-header bg-white font-weight-bold text-dark p-4">
                        <span className="text-m">Two charts, one table</span>
                    </div>
                    <div className="card-body py-5 px-4">
                        {/* First we add the first chart row */}
                        <div className="row">
                            <div className="col-7">
                                {/* This is a placeholder for a real chart */}
                                <div className="w-100 h-100 bg-light text-center d-flex justify-content-center align-items-center">
                                    <span className="align-middle">CHART</span>
                                </div>
                                {/* Here ends the placeholder */}
                            </div>
                            <div className="col-5 align-self-center">
                                <div className="row justify-content-center">
                                    <div className="col-8">
                                        <div className="card mb-4 bg-light border-0">
                                            <div className="card-body p-4">
                                                <h5 className="card-title text-xs text-uppercase font-weight-bold">insight 1</h5>
                                                <h6 className="card-subtitle mb-2 text-xs text-uppercase">subtitle 1</h6>
                                                <div className="card-text">
                                                    <div className="font-weight-bold">
                                                        <span className="big-number font-weight-bold d-inline-block align-middle text-gray-900 text-lg">11 hours</span>
                                                        <span className="badge ml-2 badge font-weight-normal align-middle d-inline-block badge-success">
                                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-up" className="svg-inline--fa fa-caret-up fa-w-10 align-bottom" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"></path></svg>
                                                            <span className="ml-1">15%</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mb-4 bg-light border-0">
                                            <div className="card-body p-4"><h5
                                                className="card-title text-xs text-uppercase">insight
                                                2</h5>
                                                <h6
                                                    className="card-subtitle mb-2 text-xs text-uppercase">subtitle 2</h6>
                                                <div className="card-text">
                                                    <div className="font-weight-bold"><span
                                                        className="big-number font-weight-bold d-inline-block align-middle text-gray-900 text-lg">11 hours</span><span
                                                        className="badge ml-2 badge font-weight-normal align-middle d-inline-block badge-danger"><svg
                                                        aria-hidden="true" focusable="false" data-prefix="fas"
                                                        data-icon="caret-down"
                                                        className="svg-inline--fa fa-caret-down fa-w-10 align-bottom"
                                                        role="img"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path
                                                        fill="currentColor"
                                                        d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg><span
                                                        className="ml-1">20%</span></span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Here ends the first chart row */}
                        {/* Here we add the second chart row */}
                        <div className="row mt-5">
                            <div className="col-7">
                                {/* This is a placeholder for a real chart */}
                                <div className="w-100 h-100 bg-light text-center d-flex justify-content-center align-items-center">
                                    <span className="align-middle">CHART</span>
                                </div>
                                {/* Here ends the placeholder */}
                            </div>
                            <div className="col-5 align-self-center">
                                <div className="row justify-content-center">
                                    <div className="col-8">
                                        <div className="card mb-4 bg-light border-0">
                                            <div className="card-body p-4">
                                                <h5 className="card-title text-xs text-uppercase font-weight-bold">insight 1</h5>
                                                <h6 className="card-subtitle mb-2 text-xs text-uppercase">subtitle 1</h6>
                                                <div className="card-text">
                                                    <div className="font-weight-bold">
                                                        <span className="big-number font-weight-bold d-inline-block align-middle text-gray-900 text-lg">11 hours</span>
                                                        <span className="badge ml-2 badge font-weight-normal align-middle d-inline-block badge-success">
                                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-up" className="svg-inline--fa fa-caret-up fa-w-10 align-bottom" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"></path></svg>
                                                            <span className="ml-1">15%</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mb-4 bg-light border-0">
                                            <div className="card-body p-4"><h5
                                                className="card-title text-xs text-uppercase">insight
                                                2</h5>
                                                <h6
                                                    className="card-subtitle mb-2 text-xs text-uppercase">subtitle 2</h6>
                                                <div className="card-text">
                                                    <div className="font-weight-bold"><span
                                                        className="big-number font-weight-bold d-inline-block align-middle text-gray-900 text-lg">11 hours</span><span
                                                        className="badge ml-2 badge font-weight-normal align-middle d-inline-block badge-danger"><svg
                                                        aria-hidden="true" focusable="false" data-prefix="fas"
                                                        data-icon="caret-down"
                                                        className="svg-inline--fa fa-caret-down fa-w-10 align-bottom"
                                                        role="img"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path
                                                        fill="currentColor"
                                                        d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg><span
                                                        className="ml-1">20%</span></span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Here ends the second chart row */}
                        {/* Here goes the table row */}
                        <div className="row">
                            <div className="col-12 mt-5">
                                {/* This is a placeholder to be replaced with a real table */}
                                <div className="w-100 bg-light text-center d-flex justify-content-center align-items-center" style={placeholderHeight}>
                                    <span className="align-middle">TABLE</span>
                                </div>
                                {/* Here ends the placeholder */}
                            </div>
                        </div>
                        {/* Here ends the table row */}
                    </div>
                </div>

            </div>
        </Page>
    );
};
