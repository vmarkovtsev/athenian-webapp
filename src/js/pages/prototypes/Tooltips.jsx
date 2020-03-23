import React, { useEffect } from 'react';
import $ from 'jquery';

import TooltipInfo from 'js/pages/prototypes/tooltip-info/TooltipInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
                    <h4 className="text-centerleft text-dark font-weight-light mr-2">User tooltips</h4>
                    <MainTooltip title="User with PRs and comments"
                                 hint="<div class='card'>
                                            <div class='card-body text-center p-1'>
                                                <div class='w-100 mb-2'>
                                                    <img src='https://randomuser.me/api/portraits/women/44.jpg'
                                                         class='user-avatar inline-block' height='30' width='30'/>
                                                    <span class='ml-2 inline-block text-dark text-m align-middle'>jennifer_38</span>
                                                </div>
                                                <div class='w-100'>
                                                    <p class='user-info text-secondary font-weight-light m-0'>
                                                        <i class='fas fa-code-branch mr-1'></i>
                                                        <span class='mr-3'>10</span>
                                                        <i class='far fa-comment-alt mr-1'></i>
                                                        <span>8</span></p>
                                                </div>
                                            </div>
                                        </div>"
                    />
                </div>
            </div>

            <div className="row mb-5">
                <div className="col-12">
                    <h4 className="text-centerleft text-dark font-weight-light mr-2">Text and numbers</h4>
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
                    <h4 className="text-centerleft text-dark font-weight-light mr-2">Pull requests</h4>

                    <MainTooltip title="Regular Pull Request"
                                 hint="<div class='card'>
                                            <div class='card-body text-left p-1'>
                                                <div class='w-100'>
                                                    <p class='text-uppercase text-secondary text-xs mb-1'>#458</p>
                                                    <span class='text-s'><span class='text-secondary'>src-d/go-git:</span> <span className=' text-dark font-weight-bold'>git: remove potentially duplicate check for unstaged files</span></span>
                                                </div>
                                                <div class='w-100 mt-2'>
                                                    <img src='https://randomuser.me/api/portraits/women/44.jpg' class='user-avatar inline-block'
                                                         height='18' width='18'/>
                                                    <span class='ml-2 inline-block text-secondary font-weight-light align-middle'>6 hours ago by <span
                                                        class='text-dark'>jennifer_38</span></span>
                                                </div>
                                            </div>
                                        </div>"
                    />

                    <MainTooltip title="Pull Request waiting for Review"
                                 hint="<div class='card'>
                                            <div class='card-body text-left p-1'>
                                                <div class='w-100'>
                                                    <p class='text-uppercase text-secondary text-xs mb-1'>#458</p>
                                                    <span class='text-s'><span class='text-secondary'>src-d/go-git:</span> <span className=' text-dark font-weight-bold'>git: remove potentially duplicate check for unstaged files</span></span>
                                                </div>
                                                <div class='w-100 my-2 text-orange'>
                                                    <i class='far fa-clock mr-1'></i>
                                                    <span>Waiting review for 16 hours</span>
                                                </div>
                                                <div class='w-100 mt-2'>
                                                    <img src='https://randomuser.me/api/portraits/women/44.jpg'
                                                         class='user-avatar inline-block'
                                                         height='18' width='18'/>
                                                    <span class='ml-2 inline-block text-secondary font-weight-light align-middle'>Created by <span
                                                        class='text-dark'>jennifer_38</span></span>
                                                </div>
                                            </div>
                                        </div>"
                    />

                    <MainTooltip title="Pull Request Reviewed"
                                 hint="<div class='card'>
                                            <div class='card-body text-left p-1'>
                                                <div class='w-100'>
                                                    <p class='text-uppercase text-secondary text-xs mb-1'>#458</p>
                                                    <span class='text-s'><span class='text-secondary'>src-d/go-git:</span> <span className=' text-dark font-weight-bold'>git: remove potentially duplicate check for unstaged files</span></span>
                                                </div>
                                                <div class='w-100 my-2 text-turquoise'>
                                                    <i class='far fa-clock mr-1'></i>
                                                    <span>Waited review for 7 hours</span>
                                                </div>
                                                <div class='w-100 mt-2'>
                                                    <img src='https://randomuser.me/api/portraits/women/44.jpg'
                                                         class='user-avatar inline-block'
                                                         height='18' width='18'/>
                                                    <span class='ml-2 inline-block text-secondary font-weight-light align-middle'>Created by <span
                                                        class='text-dark'>jennifer_38</span></span>
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
