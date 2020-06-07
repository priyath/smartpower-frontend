import React, {useEffect, useState} from 'react';
import { EditingState } from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import { fetchBranchList, updateBranchList, addNewBranch } from '../../../../repositories/initRepository';
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
                ...added.map((row, index) => {
                    addNewBranch({location: row.location, geoLat: row.lat, geoLng: row.lng});
                    return ({id: startingAddedId + index, ...row,})
                }),
            ];
        }
        if (changed) {
            let location;
            let geoLng;
            let geoLat;

            changedRows = rows.map(row => {
                if (changed[row.id]){
                    location = row.id;
                    geoLng = changed[row.id].lng ? changed[row.id].lng : row.lng;
                    geoLat = changed[row.id].lat ? changed[row.id].lat : row.lat;
                    updateBranchList({location, geoLng, geoLat});
                    return { ...row, ...changed[row.id] };
                }
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
                    showAddCommand
                    showEditCommand
                />
            </Grid>
                </CardBody>
            </Card>
        </Col>
    );
};
