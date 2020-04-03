import React, { useEffect } from 'react';
import $ from 'jquery';

import TooltipInfo from 'js/pages/prototypes/tooltip-info/TooltipInfo';

import chart01 from 'js/pages/prototypes/tooltip-info/tooltip-charts/chart01.png';
import chart02 from 'js/pages/prototypes/tooltip-info/tooltip-charts/chart02.png';
import chart03 from 'js/pages/prototypes/tooltip-info/tooltip-charts/chart03.png';
import chart04 from 'js/pages/prototypes/tooltip-info/tooltip-charts/chart04.png';
import chart05 from 'js/pages/prototypes/tooltip-info/tooltip-charts/chart05.png';
import chart06 from 'js/pages/prototypes/tooltip-info/tooltip-charts/chart06.png';
import chart07 from 'js/pages/prototypes/tooltip-info/tooltip-charts/chart07.png';

export default ({ content }) => {
    useEffect(() => {
        $('[data-toggle="tooltip"]').tooltip && $('[data-toggle="tooltip"]').tooltip();
    }, [])

    return (
        <div>
            <div className="row">
                <div className="col-12 mb-3">
                    <p className="text-centerleft font-weight-light text-dark text-lg">Tooltips</p>
                </div>
            </div>

            <div className="row mb-5">
                <div className="col-12">
                    <h4 className="text-centerleft text-dark font-weight-light mr-2 mb-2">Pull requests</h4>

                    <img className="mb-2" src={chart01} alt="" width="620"/>

                    <p className="font-weight-light text-m mt-2 mb-3">Regular Pull Request</p>

                    <div className="hint">
                        <div className="hint-content">
                            <div className='card'>
                                <div className='card-body text-left p-1'>
                                    <div className='w-100'>
                                        <p className='text-uppercase text-secondary text-xs mb-1'>#458</p>
                                        <span className='text-s'><span className='text-secondary'>src-d/go-git:</span> <span
                                            className=' text-dark font-weight-bold'>git: remove potentially duplicate check for unstaged files</span></span>
                                    </div>
                                    <div className='w-100 mt-2'>
                                        <img src='https://randomuser.me/api/portraits/women/44.jpg'
                                             className='user-avatar inline-block'
                                             height='18' width='18'/>
                                        <span className='ml-2 inline-block text-secondary font-weight-light align-middle'>6 hours ago by <span
                                            className='text-dark'>jennifer_38</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="font-weight-light text-m mt-5 mb-3">Pull Request waiting for Review</p>

                    <div className="hint">
                        <div className="hint-content">
                            <div className='card'>
                                <div className='card-body text-left p-1'>
                                    <div className='w-100'>
                                        <p className='text-uppercase text-secondary text-xs mb-1'>#458</p>
                                        <span className='text-s'><span
                                            className='text-secondary'>src-d/go-git:</span> <span
                                            className=' text-dark font-weight-bold'>git: remove potentially duplicate check for unstaged files</span></span>
                                    </div>
                                    <div className='w-100 my-2 text-orange'>
                                        <i className='far fa-clock mr-1'></i>
                                        <span>Waiting review for 16 hours</span>
                                    </div>
                                    <div className='w-100 mt-2'>
                                        <img src='https://randomuser.me/api/portraits/women/44.jpg'
                                             className='user-avatar inline-block'
                                             height='18' width='18'/>
                                        <span
                                            className='ml-2 inline-block text-secondary font-weight-light align-middle'>Created by <span
                                            className='text-dark'>jennifer_38</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="font-weight-light text-m mt-5 mb-3">Pull Request Reviewed</p>

                    <div className="hint">
                        <div className="hint-content">
                            <div className='card'>
                                <div className='card-body text-left p-1'>
                                    <div className='w-100'>
                                        <p className='text-uppercase text-secondary text-xs mb-1'>#458</p>
                                        <span className='text-s'><span
                                            className='text-secondary'>src-d/go-git:</span> <span
                                            className=' text-dark font-weight-bold'>git: remove potentially duplicate check for unstaged files</span></span>
                                    </div>
                                    <div className='w-100 my-2 text-turquoise'>
                                        <i className='far fa-clock mr-1'></i>
                                        <span>Waited review for 7 hours</span>
                                    </div>
                                    <div className='w-100 mt-2'>
                                        <img src='https://randomuser.me/api/portraits/women/44.jpg'
                                             className='user-avatar inline-block'
                                             height='18' width='18'/>
                                        <span
                                            className='ml-2 inline-block text-secondary font-weight-light align-middle'>Created by <span
                                            className='text-dark'>jennifer_38</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="row mb-5">
                <div className="col-12">
                    <h4 className="text-centerleft text-dark font-weight-light mt-3 mr-2 mb-4">User tooltips</h4>

                    <img className="mb-2" src={chart02} alt="" width="620"/>

                    <p className="font-weight-light text-m mt-2 mb-3">User with PRs and comments</p>

                    <div className="hint">
                        <div className="hint-content">
                            <div className='card'>
                                <div className='card-body text-center p-1'>
                                    <div className='w-100 mb-2'>
                                        <img src='https://randomuser.me/api/portraits/women/44.jpg'
                                             className='user-avatar inline-block' height='30' width='30'/>
                                        <span
                                            className='ml-2 inline-block text-dark text-m align-middle'>jennifer_38</span>
                                    </div>
                                    <div className='w-100'>
                                        <p className='user-info text-secondary font-weight-light m-0'>
                                            <i className='fas fa-code-branch mr-1'></i>
                                            <span className='mr-3'>10</span>
                                            <i className='far fa-comment-alt mr-1'></i>
                                            <span>8</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="font-weight-light text-m mt-5 mb-3">User Reviews comments</p>

                    <div className="hint">
                        <div className="hint-content">
                            <div className='card'>
                                <div className='card-body text-center p-1'>
                                    <div className='w-100 mb-2'>
                                        <img src='https://randomuser.me/api/portraits/women/44.jpg'
                                             className='user-avatar inline-block' height='30' width='30'/>
                                        <span
                                            className='ml-2 inline-block text-dark text-m align-middle'>jennifer_38</span>
                                    </div>
                                    <div className='w-100'>
                                        <span
                                            className='text-uppercase text-secondary text-xs mb-1'>Reviews comments</span>
                                    </div>
                                    <div className='w-100'>
                                        <span
                                            className='big-number font-weight-bold d-inline-block align-middle text-dark text-lg'>23 <span
                                            className='text-secondary font-weight-normal text-m'>(75%)</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="font-weight-light text-m mt-5 mb-2">User Reviews</p>

                    <div className="hint">
                        <div className="hint-content">
                            <div className='card'>
                                <div className='card-body text-center p-1'>
                                    <div className='w-100 mb-2'>
                                        <img src='https://randomuser.me/api/portraits/women/44.jpg'
                                             className='user-avatar inline-block' height='30' width='30'/>
                                        <span
                                            className='ml-2 inline-block text-dark text-m align-middle'>jennifer_38</span>
                                    </div>
                                    <div className='w-100'>
                                        <span className='text-uppercase text-secondary text-xs mb-1'>Reviews</span>
                                    </div>
                                    <div className='w-100'>
                                        <span
                                            className='big-number font-weight-bold d-inline-block align-middle text-dark text-lg'>15 <span
                                            className='text-secondary font-weight-normal text-m'>(35%)</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="font-weight-light text-m mt-5 mb-3">User Icon</p>

                    <div className="hint">
                        <div className="hint-content">
                            <div className='card'>
                                <div className='card-body text-center p-0'>
                                    <div className='w-100 mb-0'>
                                        <img src='https://randomuser.me/api/portraits/women/44.jpg'
                                             className='user-avatar inline-block' height='30' width='30'/>
                                        <span
                                            className='ml-2 inline-block text-dark text-m align-middle'>jennifer_38</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-5">
                <div className="col-12">
                    <h4 className="text-centerleft text-dark font-weight-light mt-5 mr-2 mb-4">Lead Time + 4 Summary Line Charts + Wait time for 1st Review</h4>

                    <img className="mb-2" src={chart03} alt="" width="620"/><br/>

                    <img className="mb-2" src={chart06} alt="" width="620"/>

                    <p className="font-weight-light text-m mt-2 mb-3">One date with time</p>

                    <div className="hint">
                        <div className="hint-content">
                            <div className='card'>
                                <div className='card-body text-left p-1'>
                                    <div className='w-100'>
                                        <p className='text-secondary text-xs mb-1'><span
                                            className='text-uppercase'>Tue</span>, 23rd <span
                                            className='text-uppercase'>Mar</span></p>
                                        <span
                                            className='big-number font-weight-bold d-inline-block align-middle text-dark text-lg'>6 hours</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="font-weight-light text-m mt-5 mb-3">One date, time and pull requests</p>

                    <div className="hint">
                        <div className="hint-content">
                            <div className='card'>
                                <div className='card-body text-left p-1'>
                                    <div className='w-100'>
                                        <p className='text-secondary text-xs mb-1'><span
                                            className='text-uppercase'>Tue</span>, 23rd <span
                                            className='text-uppercase'>Mar</span></p>
                                        <span
                                            className='big-number font-weight-bold d-inline-block align-middle text-dark text-lg'>35min</span>
                                    </div>
                                    <div className='w-100'>
                                        <span
                                            className='d-inline-block align-middle text-dark text-m'>6 pull requests</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-5">
                <div className="col-12">
                    <h4 className="text-centerleft text-dark font-weight-light mt-5 mr-2 mb-4">Pull Request Ratio Flow</h4>

                    <img className="mb-2" src={chart04} alt="" width="620"/>

                    <p className="font-weight-light text-m mt-2 mb-3">PR Ratio Flow</p>

                    <div className="hint">
                        <div className="hint-content">
                            <div className='card'>
                                <div className='card-body text-center p-1'>
                                    <div className='w-100'>
                                        <p className='text-secondary text-xs mb-1'><span
                                            className='text-uppercase'>Tue</span>, 23rd <span
                                            className='text-uppercase'>Mar</span></p>
                                        <span
                                            className='big-number font-weight-bold d-inline-block align-middle text-dark text-lg'>7/5 <span
                                            className='text-secondary font-weight-normal text-m'>(1.4)</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-5">
                <div className="col-12">
                    <h4 className="text-centerleft text-dark font-weight-light mt-5 mr-2 mb-4">Most Active Developers</h4>

                    <img className="mb-2" src={chart05} alt="" width="620"/>

                    <p className="font-weight-light text-m mt-5 mb-3">Pull Requests Created</p>

                    <div className="hint">
                        <div className="hint-content">
                            <div className='card'>
                                <div className='card-body text-center p-1'>
                                    <div className='w-100'>
                                        <p className='text-uppercase text-secondary text-xs mb-1'>Pull Requests</p>
                                        <span
                                            className='big-number font-weight-bold d-inline-block align-middle text-dark text-lg'>19</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-5">
                <div className="col-12">
                    <h4 className="text-centerleft text-dark font-weight-light mr-2 mb-4">Merge Delays</h4>

                    <img className="mb-2" src={chart07} alt="" width="620"/>

                    <p className="font-weight-light text-m mt-5 mb-3">Time to merge</p>

                    <div className="hint">
                        <div className="hint-content">
                            <div className='card'>
                                <div className='card-body text-center p-1'>
                                    <div className='w-100 mb-2'>
                                        <span className='text-secondary text-m align-middle'>athenian/api</span>
                                    </div>
                                    <div className='w-100'>
                                        <p className='text-m text-dark m-0'>
                                            <i className='far fa-clock text-blue mr-1'></i>
                                            <span>10.3 hours</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="row mb-5 border-top">
                <div className="col-12">
                    <h4 className="text-centerleft text-dark font-weight-light mr-2 mt-5">Text and numbers</h4>
                    <MainTooltip title="One title and one number"
                                 hint="<div class='card'>
                                            <div class='card-body text-center p-1'>
                                                <div class='w-100'>
                                                    <p class='text-uppercase text-secondary text-xs mb-1'>PRs Created</p>
                                                    <span class='big-number font-weight-bold d-inline-block align-middle text-dark text-lg'>49</span>
                                                </div>
                                            </div>
                                        </div>"
                    />
                    <MainTooltip title="Two titles and two numbers"
                                 hint="<div class='card'>
                                            <div class='card-body text-left p-1'>
                                                <div class='w-100'>
                                                    <p class='text-uppercase text-secondary text-xs mb-1'>Average time to merge</p>
                                                    <span class='font-weight-bold d-inline-block align-middle text-dark text-m mb-2'>18 hours</span>
                                                </div>
                                                <div class='w-100'>
                                                    <p class='text-uppercase text-secondary text-xs mb-1'>Developers with merge privileges</p>
                                                    <span class='font-weight-bold d-inline-block align-middle text-dark text-m'>6</span>
                                                </div>
                                            </div>
                                        </div>"
                    />
                </div>
            </div>

            <div className="row mb-5">
                <div className="col-12">
                    <h4 className="text-centerleft text-dark font-weight-light mr-2">Repositories</h4>

                    <MainTooltip title="Single repository"
                                 hint="<div class='card'>
                                            <div class='card-body text-center p-1'>
                                                <div class='w-100 mb-2'>
                                                    <span class='text-secondary text-m align-middle'>athenian/api</span>
                                                </div>
                                                <div class='w-100'>
                                                    <p class='text-m text-dark m-0'>
                                                        <i class='far fa-clock text-blue mr-1'></i>
                                                        <span class='mr-3'>38 min</span>
                                                        <i class='far fa-user text-secondary mr-1'></i>
                                                        <span>5</span></p>
                                                </div>
                                            </div>
                                        </div>"
                    />
                    <MainTooltip title="Multiple repositories"
                                 hint="<div class='card'>
                                            <div class='card-body text-center p-1'>
                                                <div class='w-100 mb-2'>
                                                    <span class='text-secondary text-m align-middle'>5 repositories</span>
                                                </div>
                                                <div class='w-100'>
                                                    <p class='text-m text-dark m-0'>
                                                        <i class='far fa-clock text-orange mr-1'></i>
                                                        <span class='mr-3'>38 min</span>
                                                        <i class='far fa-user text-secondary mr-1'></i>
                                                        <span>5</span></p>
                                                </div>
                                            </div>
                                        </div>"
                    />
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-12">
                    <h4 className="text-centerleft text-dark font-weight-light mr-2">Releases</h4>

                    <MainTooltip title="Single release"
                                 hint="<div class='card'>
                                            <div class='card-body text-center p-1'>
                                                <div class='w-100 mb-2'>
                                                    <span class='text-dark text-m align-middle'>webapp <span class='text-secondary'>v1.3.2</span></span>
                                                </div>
                                                <div class='w-100'>
                                                    <p class='text-s m-0'>
                                                        <i class='fas fa-code-branch text-green mr-1'></i>
                                                        <span class='text-secondary mr-2'>9</span>
                                                        <span class='mr-1 text-green'>+1,543</span>
                                                        <span class='text-danger'>-504</span>
                                                        </p>
                                                </div>
                                            </div>
                                        </div>"
                    />
                    <MainTooltip title="Multiple releases"
                                 hint="<div class='card'>
                                            <div class='card-body text-center p-1'>
                                                <div class='w-100 mb-2'>
                                                    <span class='text-dark text-m align-middle'>webapp <span class='text-secondary'>v1.3.2</span></span>
                                                </div>
                                                <div class='w-100'>
                                                    <p class='text-s m-0'>
                                                        <i class='fas fa-code-branch text-green mr-1'></i>
                                                        <span class='text-secondary mr-2'>9</span>
                                                        <span class='mr-1 text-green'>+1,543</span>
                                                        <span class='text-danger'>-504</span>
                                                    </p>
                                                </div>
                                                <div class='w-100 mt-3 mb-2'>
                                                    <span class='text-dark text-m align-middle'>api <span class='text-secondary'>v1.4.0</span></span>
                                                </div>
                                                <div class='w-100'>
                                                    <p class='text-s m-0'>
                                                        <i class='fas fa-code-branch text-green mr-1'></i>
                                                        <span class='text-secondary mr-2'>5</span>
                                                        <span class='mr-1 text-green'>+328</span>
                                                        <span class='text-danger'>-139</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>"
                    />
                </div>
            </div>
        </div>
    );
};

const MainTooltip = ({ title, hint }) => (
    <div>
        {title && <TooltipInfo title={title} content={hint} />}
    </div>
);
