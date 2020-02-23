import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faFileAlt } from '@fortawesome/free-regular-svg-icons';

import { SmallTitle } from 'js/components/ui/Typography';
import Badge from 'js/components/ui/Badge';

export default ({ data }) => {
    const statusClass = status => {
        switch (status) {
            case 'wip':
                return 'border-warning text-warning';
            case 'merged':
                return 'border-success text-success';
            case 'closed':
                return 'border-danger text-danger';
        };
    }

    useEffect(() => {
        $('#dataTable').DataTable && $('#dataTable').DataTable({
            searching: false,
            ordering: false
        });
    }, [])

    return (
        <>
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex border-bottom">
                        <div className="pr-tab card mr-2 p-0 border-0 border-bottom-primary rounded-top rounded-0 rounded-top bg-transparent">
                            <div className="card-body px-0 py-3">
                                <SmallTitle content="Pull Requests" isBlack />
                                <Badge value="33" className="ml-3" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="table-responsive mb-4">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                    <thead className="bg-secondary">
                        <tr>
                            <th><SmallTitle content="Pull Request | Creator" /></th>
                            <th><SmallTitle content="Size" /></th>
                            <th><SmallTitle content="Comments" /></th>
                            <th><SmallTitle content="Participants" /></th>
                            <th><SmallTitle content="Age" /></th>
                            <th><SmallTitle content="Status" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map && data.map((v, i) =>
                            <tr key={i} className="bg-white">
                                <td>
                                    <div>{v.organization}/{v.repo}: <strong>{v.title}</strong></div>
                                    <div>created by <strong>{v.creator}</strong></div>
                                </td>
                                <td>
                                    <span className="mr-3">
                                        <FontAwesomeIcon icon={faFileAlt} className="mr-1" />
                                        {v.size}
                                    </span>
                                    <span className="text-success mr-2">+{v.lines.add}</span>
                                    <span className="text-danger">-{v.lines.remove}</span>
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faCommentAlt} className="align-middle mr-1" />
                                    {v.comments}
                                </td>
                                <td>{v.participants.join(', ')}</td>
                                <td>{v.age}</td>
                                <td className="align-middle text-center"><div className={classnames('border rounded px-3 py-1', statusClass(v.status))}>{v.status}</div></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>




        </>
    )
}