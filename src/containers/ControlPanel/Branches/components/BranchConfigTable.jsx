import React, {useEffect, useState} from 'react';
import { EditingState } from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import { fetchBranchList } from '../../../../repositories/initRepository';
import { generateBranchConfigRows } from '../../../../logic/geoManager';
import {Card, CardBody, Col} from "reactstrap";

const getRowId = row => row.id;

const columnNames = [
    { name: 'location', title: 'Branch' },
    { name: 'lat', title: 'Geo Coordinate (LAT)' },
    { name: 'lng', title: 'Geo Coordinate (LNG)' },
]

export default () => {
    const [columns] = useState(columnNames);
    const [rows, setRows] = useState([]);
    useEffect(() => {
        //TODO: this data is already available. maybe change impl to reuse that data without additional API call
        fetchBranchList().then((res) => {
            const rows = generateBranchConfigRows(res.data);
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
            let key;
            let upperThreshold;
            let lowerThreshold;
            let startValue;
            let endValue;
            let tickInterval;

            changedRows = rows.map(row => {
                // if (changed[row.id]){
                //     key = row.id;
                //     lowerThreshold = changed[row.id].lowerThreshold ? changed[row.id].lowerThreshold : row.lowerThreshold;
                //     upperThreshold = changed[row.id].upperThreshold ? changed[row.id].upperThreshold : row.upperThreshold;
                //     startValue = changed[row.id].startValue ? changed[row.id].startValue : row.startValue;
                //     endValue = changed[row.id].endValue ? changed[row.id].endValue : row.endValue;
                //     tickInterval = changed[row.id].tickInterval ? changed[row.id].tickInterval : row.tickInterval;
                //     updateThresholds({key, upperThreshold, lowerThreshold, startValue, endValue, tickInterval});
                //     return { ...row, ...changed[row.id] };
                // }
                return row;
            });
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
