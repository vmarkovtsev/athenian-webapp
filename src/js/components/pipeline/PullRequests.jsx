import React, { useEffect, useState, useMemo } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
import Select from 'react-select';

import { dateTime, github, number } from 'js/services/format';
import { prLabel, PR_STATUS as prStatus, PR_LABELS_CLASSNAMES as prLabelClasses } from 'js/services/prHelpers';

import _ from 'lodash';

import { StatusIndicator, READY } from 'js/components/ui/Spinner';
import Info, { tooltip_conf } from 'js/components/ui/Info';

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

const tableContainerId = 'dataTable';
const tableContainerSelector = `#${tableContainerId}`;

export default ({ stage, data, status }) => {
  const [selectValue, setSelectValue] = useState(null);
  const [selectOptions, setSelectOptions] = useState([{ label: 'All', value: null }]);

  const options = useMemo(() => {
    const getLabel = prLabel(stage);
    const labels = [...data.prs.reduce((acc, curr) => acc.add(getLabel(curr)), new Set())];
    return [
      { label: 'All' },
      ...labels.map(value => ({ value, label: value })),
    ];
  }, [data.prs, stage]);

  const isReady = status => status === READY;

  // reset filter when changing stage
  useEffect(() => {
    setSelectValue(null);
  }, [stage]);

  useEffect(() => {
    if (!isReady(status)) {
      return;
    }

    setSelectOptions(options);
    initTable(stage, data.users);

    return () => {
      $.fn.DataTable.isDataTable(tableContainerSelector) && $(tableContainerSelector).DataTable().destroy();
      $(tableContainerSelector).empty();
    };
  }, [stage, data.users, status, options]);

  useEffect(() => {
    if (!isReady(status)) {
      return;
    }

    fillTable(selectValue ? data.prs.filter(v => prLabel(stage)(v) === selectValue.value) : data.prs);

  }, [stage, data.prs, status, selectValue]);

  if (!isReady(status)) {
    return  <StatusIndicator status={status} textOnly={false} />;
  }

  return (
    <>
      <div className="table-responsive mb-4">
        <div className="d-flex" style={{ marginBottom: '-28px', justifyContent: 'flex-start' }}>
          <div style={{ zIndex: 4, marginLeft: '40.5rem', textAlign: 'right' }}>
            <Info content={`You can search by PR title, repository or participant, or use this other syntax for these other filters:<br />
              <b>by status:</b> <span class="code">status:merged</span>, <span class="code">status:closed</span>, <span class="code">status:opened</span><br />
              <b>by number:</b> <span class="code">number:354</span><br />
              <b>by author:</b> <span class="code">author:user_handler</span><br />
              <b>by reviewer:</b> <span class="code">reviewer:user_handler</span>
              `}
            />
          </div>
        </div>
        <div className="d-flex" style={{ marginBottom: '-34px', justifyContent: 'flex-end' }}>
          <div style={{ zIndex: 3, flex: '0 0 170px' }}>
            <Select
              value={selectValue}
              isClearable={false}
              placeholder="Filter by status"
              options={selectOptions}
              onChange={value => {
                if (value && !value.value) {
                  setSelectValue(null);
                  return;
                }
                setSelectValue(value);
              }}
            />
          </div>
        </div>
        <table className="table table-bordered" id={tableContainerId} width="100%" cellSpacing="0" style={{ tableLayout: 'fixed' }} />
      </div>
    </>
  );
};

const fillTable = prs => {
  if (!$(tableContainerSelector).DataTable) {
    return;
  }

  $(tableContainerSelector).DataTable()
    .clear()
    .rows
    .add(prs)
    .draw();
};

const cycleTimeColumnTitles = {
  overview: 'Lead Time',
  wip: 'WIP Time',
  review: 'Review Time',
  merge: 'Merge Time',
  release: 'Release >',
};

const initTable = (stage, users) => {
  if (!$(tableContainerSelector).DataTable) {
    return;
  }

  const prLabelStage = prLabel(stage);

  const table = $(tableContainerSelector).DataTable({
    dom: `
      <'row'<'col-12 table-filter'f>>
      <'row'<'col-12'tr>>
      <'row mt-3 pr-pagination'<'d-flex align-items-center col-sm-12 col-md-5'<'pt-0'l><'pb-0 ml-3'i>><'col-sm-12 col-md-7'p>>
    `,
    searching: true,
    ordering: true,
    order: [[1, 'desc']],
    language: {
      paginate: {
        next: "<i class='fas fa-angle-right'></i>",
        previous: "<i class='fas fa-angle-left'></i>",
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
      search: "<i class='field-icon fas fa-search' aria-hidden='true'></i>",
    },
    fixedHeader: true,
    columnDefs: [
      { "width": "50px", "targets": 0, "orderable": false },  //status
      { "width": "130px", "targets": 2 }, //changes
      { "width": "90px", "targets": 3 },  //comments
      { "width": "130px", "targets": 4 }, //participants
      { "width": "100px", "targets": 5 },  //age
      { "width": "150px", "targets": 6 }, //stage
    ],
    columns: [{
      title: '',
      className: 'pr-merged',
      render: (__, type, row) => {
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
      title: 'Pull Requests | Created',
      className: 'pr-main',
      render: (__, type, row) => {
        switch (type) {
          case 'display':
            return `
              <div class="table-title">
                  <span class="text-secondary">${row.organization}/${row.repo}</span>
                  <a class="text-dark font-weight-bold" href=${github.prLink(row.repository, row.number)} target="_blank">
                      #${row.number} ${row.title}
                  </a>
              </div>
              <div class="table-creators">
                  ${row.authors.map(userImage(users)).join(' ')}
                  <div class="pr-created-by"><span>Created by</span> <span class="text-dark">${row.authors.map(github.userName).join(' ')}</span>
                  <span title="${dateTime.ymd(row.created)}">${dateTime.ago(row.created)} ago</span></div>
              </div>
            `;
          case 'filter':
            return `${row.title} ${row.repo} number:${row.number} ` + (row.authors.map(user => `author:${github.userName(user)}`).join(' '));
          case 'type':
          case 'sort':
          default:
            return row.created;
        }
      },
    },
    {
      title: 'Size',
      className: 'pr-size',
      searchable: false,
      render: (__, type, row) => {
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
    },
    {
      title: 'Comments',
      className: 'pr-comments',
      searchable: false,
      render: (__, type, row) => {
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
    },
    {
      title: 'Reviewers',
      className: 'pr-reviewers',
      render: (__, type, row) => {
        switch (type) {
          case 'display':
            return row.commentersReviewers.map(userImage(users)).join(' ');
          case 'filter':
            return row.commentersReviewers.map(user => `reviewer:${github.userName(user)}`).join(' ');
          case 'type':
          case 'sort':
          default:
            return row.commentersReviewers.length;
        }
      },
    },
    {
      title: cycleTimeColumnTitles[stage],
      searchable: false,
      className: 'pr-cycle-time',
      render: (__, type, row) => {
        const cycleTime = stage === 'overview' ? (
            _(row.stage_timings).values().compact().sum()
          ) : (
            row.stage_timings[stage]
          );

        switch (type) {
          case 'display':
            return cycleTime === undefined ? '-' : dateTime.bestTimeUnit(cycleTime * 1000, 0);
          case 'filter':
            return '';
          case 'type':
          case 'sort':
          default:
            return cycleTime || 0;
        }
      },
    },
    {
      title: 'Stage',
      className: 'align-middle text-center',
      render: (__, type, row) => {
        switch (type) {
          case 'display':
            const hint = '' +
              `<b>properties:</b> ${row.properties.join(', ')}<br />` +
              `<b>events:</b> ${row.properties.map(prop => prop.replace('_happened', '')).join(', ')} <br />` +
              `<b>stage-completes:</b> ${row.completedStages.join(', ')}`;
            return (
              `<div
                title="${hint}"
                class="badge badge-outlined ${prLabelClasses[prLabelStage(row)]}"
                data-toggle="tooltip"
              >
                  <span data-toggle="tooltip" data-placement="bottom" className="ml-2">
                    ${prLabelStage(row)}
                  </span>
              </div>`
            );
          case 'filter':
          case 'sort':
          case 'type':
          default:
            return prLabelStage(row);
        }
      },
    }],
  });

  table.on('draw', () => $('[data-toggle="tooltip"]').tooltip(tooltip_conf));
}
