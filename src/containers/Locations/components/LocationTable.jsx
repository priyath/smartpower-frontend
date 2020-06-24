/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import {
    ButtonToolbar, Card, CardBody, Col,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import EditTable from '../../../shared/components/table/EditableTable';

export default class SummaryTable extends PureComponent {
    constructor() {
        super();
        this.heads = [
            {
                key: 'alertType',
                name: 'Alert Type',
                sortable: true,
            },
            {
                key: 'alerts',
                name: 'Alerts',
                sortable: true,
            },
        ];
    }

    onChangePage = (pageOfItems) => {
        this.setState({ pageOfItems });
    };

    createRows = (branchDetails) => {
        return branchDetails.map(el => {
            return {
                location: el.location,
                alerts: el.alertCount
            }
        })
    };

    render() {
        const { branchDetails } = this.props;
        const rows = this.createRows(branchDetails);

        //TODO: default css class names products should be changed to users
        return (
            <Col md={12} lg={12}>
                <EditTable heads={this.heads} rows={rows} enableRowSelect />
            </Col>
        );
    }
}
