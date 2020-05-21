/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import DataPaginationTable from '../../../shared/components/table/DataPaginationTable';
import Pagination from '../../../shared/components/pagination/Pagination';

const CustomFormatter = (text,color=null,align=null) => {
    let style = {};
    if ( color )
        style.color = color;
    if ( align )
        style.textAlign = align;
    return (color || align) ? (<div style={style}>{text}</div>) : (<div>{text}</div>);
};

export default class AlertTable extends PureComponent {
    constructor() {
        super();
        this.heads = [
            {
                key: 'alertDate',
                name: 'Alert Date',
                sortable: true,
            },
            {
                key: 'location',
                name: 'Location',
                sortable: true,
            },
            {
                key: 'scanType',
                name: 'Scan Type',
                sortable: true,
            },
            {
                key: 'readingValue',
                name: 'Reading Value',
                sortable: true,
                formatter: (row) => {
                    const formattedVal = (Math.round(row.value * 100) / 100).toFixed(2);
                    return CustomFormatter(formattedVal, null, 'right');
                },
                headerRenderer: CustomFormatter('Reading Value', null, 'center')
            },
            {
                key: 'upperThreshold',
                name: 'Upper Threshold',
                sortable: true,
                formatter: (row) => {
                    const formattedVal = (Math.round(row.value * 100) / 100).toFixed(2);
                    return CustomFormatter(formattedVal, null, 'right');
                }
            },
            {
                key: 'lowerThreshold',
                name: 'Lower Threshold',
                sortable: true,
                formatter: (row) => {
                    const formattedVal = (Math.round(row.value * 100) / 100).toFixed(2);
                    return CustomFormatter(formattedVal, null, 'right');
                }
            },
        ];

        this.state = {
            rows: [],
            rowsToShow: [],
            pageOfItems: 1,
            itemsToShow: 10,
            loaded: false
        };
    }

    componentDidMount() {
        const originalRows = this.createRows(this.props.alertList);
        const currentPageRows = this.filterRows(originalRows, this.state.pageOfItems, this.state.itemsToShow);
        this.setState({
            rows: originalRows,
            rowsToShow: currentPageRows,
            loaded: true,
        });
    }


    // componentWillReceiveProps(nextProps, nextContext) {
    //     const originalRows = this.createRows(154);
    //     const currentPageRows = this.filterRows(originalRows, this.state.pageOfItems, this.state.itemsToShow);
    //     this.setState({
    //         rows: originalRows,
    //         rowsToShow: currentPageRows,
    //     });
    // }

    onChangePage = (pageOfItems) => {
        const { rows, itemsToShow } = this.state;
        if (pageOfItems) {
            const rowsToShow = this.filterRows(rows, pageOfItems, itemsToShow);
            this.setState({ rowsToShow, pageOfItems });
        }
    };

    getRandomDate = (start, end) => new Date(start.getTime() + (Math.random() * (end.getTime()
        - start.getTime()))).toLocaleDateString();

    createRows = (alertList) => {
        return alertList.map((item, idx) => {
            return {
                id: idx,
                alertDate: item.alertdate,
                location: item.location,
                scanType: item.scantype,
                readingValue: item.readingvalue,
                upperThreshold: item.upperthreshold,
                lowerThreshold: item.lowerthreshold,
            };
        })
    };

    // createRows = (numberOfRows) => {
    //     const rows = [];
    //     for (let i = 1; i < numberOfRows + 1; i += 1) {
    //         rows.push({
    //             id: i,
    //             alertDate: ['Maria', 'Bobby  ', 'Alexander'][Math.floor((Math.random() * 3))],
    //             location: ['Morisson', 'Brown  ', 'Medinberg'][Math.floor((Math.random() * 3))],
    //             scanType: ['@dragon', '@hamster', '@cat'][Math.floor((Math.random() * 3))],
    //             readingValue: Math.min(100, Math.round(Math.random() * 30) + 20),
    //             upperThreshold: this.getRandomDate(new Date(2002, 3, 1), new Date(1954, 3, 1)),
    //             lowerThreshold: ['Melbourne', 'Tokio', 'Moscow', 'Rome'][Math.floor((Math.random() * 4))],
    //             description: ['Nova Soft', 'Dog Shop', 'Aspirity', 'Business Bro', 'Starlight'][Math.floor((Math.random() * 5))],
    //         });
    //     }
    //     return rows;
    // };

    filterRows = (originalRows, pageNumber, rowsOnPage) => {
        const rowsFrom = rowsOnPage * (pageNumber - 1);
        const rowsTo = rowsFrom + rowsOnPage;
        return originalRows.slice(rowsFrom, rowsTo);
    };

    onSorting = (sortColumn, sortDirection) => {
        const comparer = (a, b) => {
            if (sortDirection === 'ASC') {
                return a[sortColumn] > b[sortColumn] ? 1 : -1;
            }
            return a[sortColumn] < b[sortColumn] ? 1 : -1;
        };
        const {
            rows, pageOfItems, itemsToShow,
        } = this.state;
        if (sortDirection !== 'NONE') {
            let sortRows = [...rows].sort(comparer);
            sortRows = this.filterRows(sortRows, pageOfItems, itemsToShow);
            this.setState({ rowsToShow: sortRows });
            return sortRows;
        }
        const sortRows = this.filterRows(rows, pageOfItems, itemsToShow);
        this.setState({ rowsToShow: sortRows });
        return sortRows;
    };

    render() {
        if (!this.state.loaded)
            return false;
        const {
            rows, itemsToShow, pageOfItems, rowsToShow,
        } = this.state;

        return (
            <Col md={12} lg={12}>
                <Card>
                    <CardBody>
                        <div className="card__title">
                            <h5 className="bold-text">Alert Details</h5>
                            {/*<h5 className="subhead">Use table with column's option <span className="red-text">sortable</span></h5>*/}
                        </div>
                        <DataPaginationTable
                            heads={this.heads}
                            rows={rowsToShow}
                            onSorting={this.onSorting}
                        />
                        <Pagination
                            itemsCount={rows.length}
                            itemsToShow={itemsToShow}
                            pageOfItems={pageOfItems}
                            onChangePage={this.onChangePage}
                        />
                    </CardBody>
                </Card>
            </Col>
        );
    }
}
