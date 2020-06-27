/* eslint-disable consistent-return */
import React, { PureComponent } from 'react';
import ReactDataGrid from 'react-data-grid';
import PropTypes from 'prop-types';

export default class DataPaginationTable extends PureComponent {
  static propTypes = {
    heads: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      name: PropTypes.string,
      editable: PropTypes.bool,
      sortable: PropTypes.bool,
    })).isRequired,
    rows: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onSorting: PropTypes.func.isRequired,
  };

  rowGetter = (i) => {
    const { rows } = this.props;
    return rows[i];
  };

  rowRenderer = ({ renderBaseRow, ...props }) => {
    let className = '';
    if (props && props.row) {
      console.log('row: ', props.row)
      const readingValue = props.row.readingValue;
      const upper = props.row.upperThreshold;
      if (!isNaN(readingValue) && !isNaN(upper)) {
        className = readingValue > upper ? 'upper-threshold-color' : 'lower-threshold-color';
      }
    }
    return <ReactDataGrid.Row {...props} extraClasses={className} />;
  };

  render() {
    const { heads, rows, onSorting } = this.props;

    return (
      <div className="table">
        <ReactDataGrid
          rowRenderer={this.rowRenderer}
          columns={heads}
          rowGetter={this.rowGetter}
          rowsCount={rows.length}
          rowHeight={44}
          minColumnWidth={100}
          onGridSort={onSorting}
        />
      </div>
    );
  }
}
