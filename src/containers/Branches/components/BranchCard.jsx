import React, { PureComponent } from 'react';
import {Card, CardBody, Col, ListGroup, ListGroupItem, Table} from 'reactstrap';
import {
  AreaChart, Tooltip, Area, ResponsiveContainer, XAxis,
} from 'recharts';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import Panel from "../../../shared/components/Panel";
import PropTypes from 'prop-types';

const CustomTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <div className="dashboard__total-tooltip">
        <p className="label">{`$${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number,
  })),
};

CustomTooltip.defaultProps = {
  active: false,
  payload: null,
};

export default class BranchCard extends PureComponent {
  constructor() {
    super();
  }

  render() {
    const { energyConsumption, alertCount, location } = this.props.branchSummary;

    return (
      <Panel xl={4} lg={12} title={location}>
        <Table responsive striped>
          <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><p className="bold-text dashboard__btc">kWh</p></td>
            <td>{energyConsumption}</td>
          </tr>
          <tr>
            <td><p className="bold-text dashboard__eth">Cost (LKR)</p></td>
            <td>0</td>
          </tr>
          <tr>
            <td><p className="bold-text dashboard__neo">Alerts</p></td>
            <td>{alertCount}</td>
          </tr>
          </tbody>
        </Table>
      </Panel>
    );
  }
}
