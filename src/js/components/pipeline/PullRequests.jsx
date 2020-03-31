import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';

import { dateTime, github, number } from 'js/services/format';
import { PR_STATUS as prStatus, prLabel } from 'js/services/prHelpers'

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

const tableContainerId = '#dataTable';

export default ({ stage, data }) => {
    const prLabelStage = prLabel(stage);
    const { prs, users } = data;

    useEffect(() => {
        if (!prs.length || !$(tableContainerId).DataTable) {
            return;
        }

        if ($.fn.DataTable.isDataTable(tableContainerId)) {
            $(tableContainerId).DataTable().clear();
        }

        $(tableContainerId).DataTable({
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
            columnDefs: [
                { "width": "50px", "targets": 0 },  //status
                { "width": "130px", "targets": 2 }, //changes
                { "width": "65px", "targets": 3 },  //comments
                { "width": "130px", "targets": 4 }, //participants
                { "width": "70px", "targets": 5 },  //age
                { "width": "150px", "targets": 6 }, //stage
            ],
            columns: [
                {
                    title: '',
                    className: 'pr-merged',
                    render: (_, type, row) => {
                        let pic, sort;
                        switch (row.status) {
                            case prStatus.MERGED:
                                pic = '<i title="merged" class="fa fas fa-code-branch text-merge fa-rotate-180"></i>';
                                sort = 2;
                                break;
                            case prStatus.CLOSED:
                                pic = '<i title="closed" class="icon-pull-request text-danger"></i>';
                                sort = 3;
                                break;
                            case prStatus.OPENED:
                            default:
                                pic = '<i title="opened" class="icon-pull-request text-success"></i>';
                                sort = 1;
                        }

                        switch (type) {
                            case 'display':
                                return pic;
                            case 'filter':
                                return `status:${row.status}`;
                            case 'type':
                            case 'sort':
                            default:
                                return sort;
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
                            case 'filter':
                                return row.title + ` number:${row.number} ` + (row.authors.map(user => `author:${github.userName(user)}`).join(' '));
                            case 'type':
                            case 'sort':
                            default:
                                return row.number;
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
                            case 'filter':
                                return '';
                            case 'type':
                            case 'sort':
                            default:
                                return row.size_added + row.size_removed;
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
                            case 'filter':
                                return '';
                            case 'type':
                            case 'sort':
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
                            case 'filter':
                                return row.commentersReviewers.map(user => `participant:${github.userName(user)}`).join(' ');
                            case 'type':
                            case 'sort':
                            default:
                                return row.commentersReviewers.length;
                        }
                    },
                }, {
                    title: 'Age',
                    searchable: false,
                    className: 'pr-age',
                    render: (_, type, row) => {
                        switch (type) {
                            case 'display':
                                return dateTime.interval(row.created, row.closed || new Date());
                            case 'filter':
                                return '';
                            case 'type':
                            case 'sort':
                            default:
                                return (row.closed || new Date()) - row.created;
                        }
                    },
                }, {
                    title: 'Stage',
                    className: 'align-middle text-center',
                    render: (_, type, row) => {
                        switch (type) {
                            case 'display':
                                const hint = '' +
                                    `stage:${row.stage},\n` +
                                    `events:[${row.events.map(stage => stage.replace('_happened', '')).join(', ')}],\n` +
                                    `stage-completes:[${row.completedStages.map(stage => stage.replace('-complete', '')).join(', ')}]`;
                                return (
                                    `<div class="badge badge-outlined badge-${row.stage}">
                                        <span
                                            title="${hint}"
                                            data-toggle="tooltip"
                                            data-placement="bottom"
                                            className="ml-2"
                                        >
                                            ${prLabelStage(row)}
                                        </span>
                                    </div>`
                                );
                            default:
                                return row.stage;
                        }
                    },
                },
            ],
        });

        return () => {
            $(tableContainerId).DataTable().destroy();
        }
    }, [prs, users, prLabelStage])

    if (prs.length === 0) {
        return null;
    }

    return (
        <div className="table-responsive mb-4">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0" style={{ tableLayout: 'fixed' }} />
        </div>
    );
}
