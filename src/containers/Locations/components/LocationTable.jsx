/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import {
    ButtonToolbar, Card, CardBody, Col,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import EditTable from '../../../shared/components/table/DataPaginationTable';

const items = ['Active Power Phase 1', 'Current Average', 'Frequency', 'Voltage L N avg'];

export default class SummaryTable extends PureComponent {
    constructor() {
        super();
        this.heads = [
            {
                key: 'alertType',
                name: 'Alert Type',
                sortable: false,
                width: 200,
            },
            {
                key: 'alerts',
                name: 'Alerts',
                sortable: false,
            },
        ];
    }

    onChangePage = (pageOfItems) => {
        this.setState({ pageOfItems });
    };

    createRows = (branchDetails) => {
        let rows = [];
        const summaryDetails = branchDetails.summaryDetails;
        for (let key in items) {
            if (summaryDetails && summaryDetails.hasOwnProperty(items[key]))
                rows.push({alertType: items[key], alerts: summaryDetails[items[key]]})
            else
                rows.push({alertType: items[key], alerts: 0});
        }

        return rows;
    };

    render() {
        const { branchDetails } = this.props;
        const rows = this.createRows(branchDetails.find(detail => detail.location === this.props.branchName));
        const href = `/alerts?location=${this.props.branchName}`;
        //TODO: default css class names products should be changed to users
        return (
            <Col md={12} lg={12}>
                <EditTable heads={this.heads} rows={rows} enableRowSelect />
                <a className='location--view__details' href={href}>View Details</a>
            </Col>
        );
    }
}
