import React, {useEffect, useState} from 'react';
import { EditingState } from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import { loadThresholds } from '../../../../repositories/dashboardRepository';
import { generateThresholdRows } from '../../../../logic/thresholdManager';
import {Card, CardBody, Col} from "reactstrap";

const getRowId = row => row.id;

const columnNames = [
    { name: 'gauge', title: 'Gauge' },
    { name: 'lowerThreshold', title: 'Lower Threshold' },
    { name: 'upperThreshold', title: 'Upper Threshold' },
]

export default () => {
    const [columns] = useState(columnNames);
    const [rows, setRows] = useState([]);
    useEffect(() => {
        loadThresholds().then((res) => {
            const rows = generateThresholdRows(res.data);
            setRows(rows);
        })
    }, [])

    const commitChanges = ({ added, changed, deleted }) => {
        let changedRows;
        if (added) {
            const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
            changedRows = [
                ...rows,
                ...added.map((row, index) => ({
                    id: startingAddedId + index,
                    ...row,
                })),
            ];
        }
        if (changed) {
            changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        if (deleted) {
            const deletedSet = new Set(deleted);
            changedRows = rows.filter(row => !deletedSet.has(row.id));
        }
        setRows(changedRows);
    };

    return (
        <Col md={12} lg={12}>
            <Card>
                <CardBody className="products-list">
            <Grid
                rows={rows}
                columns={columns}
                getRowId={getRowId}
            >
                <EditingState
                    onCommitChanges={commitChanges}
                />
                <Table />
                <TableHeaderRow />
                <TableEditRow />
                <TableEditColumn
                    showEditCommand
                />
            </Grid>
                </CardBody>
            </Card>
        </Col>
    );
};
