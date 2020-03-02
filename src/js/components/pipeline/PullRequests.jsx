import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';

import { SmallTitle } from 'js/components/ui/Typography';
import Badge from 'js/components/ui/Badge';

import { dateTime, github, number } from 'js/services/format';
import { palette } from 'js/res/palette';

export default ({ data }) => {

    const userImage = user => {
        if (users[user] && users[user].avatar) {
            return `<img src="${users[user].avatar}" title="${github.userName(user)}" alt="${github.userName(user)}" class="pr-user-avatar" /><span class="pr-user-avatar pr-user-unknown" title="${github.userName(user)}" class="pr-user-unknown">?</span>`;
        }

        return `<span title="${github.userName(user)}" class="pr-user-avatar pr-user-unknown">?</span>`;
    }

    const { prs, users } = data;

    useEffect(() => {
        if (!prs.length || !$('#dataTable').DataTable) {
            return;
        }

        if ($.fn.DataTable.isDataTable('#dataTable')) {
            console.log('Table already exists. Clearing.', $('#dataTable').DataTable().data().length);
            $('#dataTable').DataTable().clear();//.draw();
            return;
        }

        $('#dataTable').DataTable({
            dom: `
                <'row'<'col-12'f>>
                <'row'<'col-12'tr>>
                <'row'<'d-flex align-items-center col-sm-12 col-md-5'<'pt-3'l><'pb-2 ml-3'i>><'col-sm-12 col-md-7'p>>
            `,
            searching: true,
            ordering: true,
            fixedHeader: true,
            data: prs,
            columns: [
                {
                    title: '',
                    className: 'pr-merged',
                    render: (_, type, row) => {
                        let pic, status;
                        if (row.merged) {
                            pic = '<i title="merged" class="fa fas fa-code-branch text-merge fa-rotate-180"></i>';
                            status = 'merged';
                        } else if (row.stage == 'wip' || row.stage == 'review' || row.stage == 'merge') {
                            pic = '<i title="opened" class="fa fas fa-code-branch text-success"></i>';
                            status = 'opened';
                        } else {
                            pic = '<i title="closed" class="fa fas fa-code-branch text-danger"></i>';
                            status = 'closed';
                        }

                        switch (type) {
                            case 'display':
                                return pic;
                            default:
                                return status;
                        }
                    },
                },
                {
                    title: 'Pull Requests',
                    className: 'pr-main',
                    render: (_, type, row) => {
                        switch (type) {
                            case 'display':
                                return `
                                    <div class="table-title">
                                        <span class="text-secondary">${github.repoOrg(row.repository)}/${github.repoName(row.repository)}:</span>
                                        <a class="text-dark font-weight-bold" href=${github.prLink(row.repository, row.number)} target="_blank">${row.title}</a>
                                    </div>
                                    <div class="table-creators">
                                        ${row.creators.map(userImage).join(' ')}
                                        <div class="pr-created-by"><span>Created by</span> <span class="text-dark">${row.creators.map(github.userName).join(' ')}</span>
                                        <span>${dateTime.ago(row.created)} ago</span></div>
                                    </div>
                                `;
                            case 'sort':
                                return row.number;
                            default:
                                return row.title;
                        }
                    },
                }, {
                    title: 'Size',
                    className: 'pr-size',
                    searchable: false,
                    render: (_, type, row) => {
                        switch (type) {
                            case 'display':
                                return `
                                    <i class="fa far fa-file-alt"></i>
                                    <span class="mr-3">${number.si(row.files_changed)}</span>
                                    <span class="text-success mr-1">+${number.si(row.size_added)}</span>
                                    <span class="text-danger">-${number.si(row.size_removed)}</span>
                                `;
                            default:
                                return row['files_changed'];
                        }
                    },
                }, {
                    title: 'Comments',
                    className: 'pr-comments',
                    searchable: false,
                    render: (_, type, row) => {
                        switch (type) {
                            case 'display':
                                return `<i class="fa far fa-comment-alt"></i>${row.comments + row.review_comments}`;
                            default:
                                return row['comments'] + row['review_comments'];
                        }
                    },
                }, {
                    title: 'Participants',
                    className: 'pr-participants',
                    render: (_, type, row) => {
                        switch (type) {
                            case 'display':
                                return row.participants.map(userImage).join(' ');
                            case 'sort':
                                return row.participants.length;
                            default:
                                return row.participants.map(github.userName).join(' ') + row.creators.map(github.userName).join(' ');
                        }
                    },
                }, {
                    title: 'Age',
                    searchable: false,
                    className: 'pr-age',
                    render: (_, type, row) => {
                        switch (type) {
                            case 'display':
                                if (row.stage === 'release' || row.stage === 'done') {
                                    return row.closed ? dateTime.interval(row.created, row.closed) : '';
                                }
                                return '';
                            default:
                                if (row.stage === 'release' || row.stage === 'done') {
                                    return row.closed ? row.closed - row.created : Number.MAX_VALUE;
                                }
                                return Number.MAX_VALUE;
                        }
                    },
                }, {
                    title: 'Stage',
                    className: 'align-middle text-center',
                    render: (_, type, row) => {
                        switch (type) {
                            case 'display':
                                return `<div class="badge badge-outlined badge-${row.stage}"">${row.stage}</div>`;
                            default:
                                return row.stage;
                        }
                    },
                },
            ],
        });

        return () => {
            console.log('Unmounting table. Clearing.');
            $('#dataTable').DataTable().destroy(true);
        }
    }, [prs])

    return prs.length ? (
        <>
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex border-bottom">
                        <div className="pr-tab card mr-2 p-0 border-0 border-bottom-primary rounded-top rounded-0 rounded-top bg-transparent">
                            <div className="card-body px-0 py-3">
                                <SmallTitle content="Pull Requests" isBlack />
                                <Badge value={prs.length} className="ml-3" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="table-responsive mb-4">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0" />
            </div>
        </>
    ) : ('')
}
