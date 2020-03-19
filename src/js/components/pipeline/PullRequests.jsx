import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';

import { dateTime, github, number } from 'js/services/format';

const userImage = users => user => {
    if (users[user] && users[user].avatar) {
        return `<img
            src="${users[user].avatar}"
            title="${github.userName(user)}"
            alt="${github.userName(user)}"
            class="pr-user-avatar"
        />`;
    }

    return `<span title="${github.userName(user)}" class="pr-user-avatar pr-user-unknown">?</span>`;
};

export default ({ data }) => {

    const { prs, users } = data;

    useEffect(() => {
        if (!prs.length || !$('#dataTable').DataTable) {
            return;
        }

        if ($.fn.DataTable.isDataTable('#dataTable')) {
            $('#dataTable').DataTable().clear();
        }

        $('#dataTable').DataTable({
            dom: `
                <'row'<'col-12'f>>
                <'row'<'col-12'tr>>
                <'row mt-3 pr-pagination'<'d-flex align-items-center col-sm-12 col-md-5'<'pt-0'l><'pb-0 ml-3'i>><'col-sm-12 col-md-7'p>>
            `,
            searching: true,
            ordering: true,
            language: {
                paginate: {
                    next: "<i class='fas fa-angle-right'></i>",
                    previous: "<i class='fas fa-angle-left'></i>"
                },
                lengthMenu: "Show rows: <select class='form-control'>" +
                    "<option value='10'>10</option>" +
                    "<option value='20'>20</option>" +
                    "<option value='30'>30</option>" +
                    "<option value='40'>40</option>" +
                    "<option value='50'>50</option>" +
                    "<option value='-1'>All</option>" +
                    "</select>",
                searchPlaceholder: "Search...",
                search: "<i class='field-icon fas fa-search' aria-hidden='true'></i>"
            },
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
                        } else if (row.stage === 'wip' || row.stage === 'review' || row.stage === 'merge') {
                            pic = '<i title="opened" class="icon-pull-request text-success"></i>';
                            status = 'opened';
                        } else {
                            pic = '<i title="closed" class="icon-pull-request text-danger"></i>';
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
                                        ${row.authors.map(userImage(users)).join(' ')}
                                        <div class="pr-created-by"><span>Created by</span> <span class="text-dark">${row.authors.map(github.userName).join(' ')}</span>
                                        <span>${dateTime.ago(row.created)} ago</span></div>
                                    </div>
                                `;
                            case 'sort':
                                return row.number;
                            default:
                                return row.title + ' ' + (row.authors.map(github.userName).join(' '));
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
                                    <i class="align-middle icon-file-code"></i>
                                    <span class="align-middle mr-3">${number.si(row.files_changed)}</span>
                                    <span class="align-middle text-success mr-1">+${number.si(row.size_added)}</span>
                                    <span class="align-middle text-danger">-${number.si(row.size_removed)}</span>
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
                                return row.commentersReviewers.map(userImage(users)).join(' ');
                            case 'sort':
                                return row.commentersReviewers.length;
                            default:
                                return row.commentersReviewers.map(userImage(users)).join(' ');
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
                                return `<div class="badge badge-outlined badge-${row.stage}">${row.stage}</div>`;
                            default:
                                return row.stage;
                        }
                    },
                },
            ],
        });

        return () => {
            $('#dataTable').DataTable().destroy();
        }
    }, [prs, users])

    if (prs.length === 0) {
        return null;
    }

    return (
        <div className="table-responsive mb-4">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0" />
        </div>
    );
}
