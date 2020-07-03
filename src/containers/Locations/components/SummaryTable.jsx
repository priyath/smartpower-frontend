/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import {
    ButtonToolbar, Card, CardBody, Col,
} from 'reactstrap';
import EditTable from '../../../shared/components/table/EditableTable';

export default class SummaryTable extends PureComponent {
    constructor() {
        super();
        this.heads = [
            {
                key: 'location',
                name: 'Location',
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
        if (!branchDetails) return [];
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
