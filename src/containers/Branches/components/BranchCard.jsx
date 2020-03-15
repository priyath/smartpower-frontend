import React, { PureComponent } from 'react';
import {Card, CardBody, Col, ListGroup, ListGroupItem, Table} from 'reactstrap';
import {
  AreaChart, Tooltip, Area, ResponsiveContainer, XAxis,
} from 'recharts';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import Panel from "../../../shared/components/Panel";
import PropTypes from 'prop-types';

const data = [{ name: 'Mon', btc: 70.23 },
  { name: 'Tue', btc: 80.5 },
  { name: 'Wed', btc: 38.45 },
  { name: 'Thu', btc: 89.2 },
  { name: 'Fri', btc: 105.61 },
  { name: 'Sat', btc: 98.6 },
  { name: 'Sun', btc: 115 }];

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
  static propTypes = {
    dir: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      activeIndex: 0,
    };
  }

  render() {
    const { dir } = this.props;
    const { activeIndex } = this.state;
    const activeItem = data[activeIndex];

    return (
      <Panel xl={4} lg={12} title="Biyagama Branch">
        <Table responsive striped>
          <thead>
          <tr>
            <th>Info</th>
            <th>Value</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><p className="bold-text dashboard__btc">kWh</p></td>
            <td>500</td>
          </tr>
          <tr>
            <td><p className="bold-text dashboard__eth">Cost (LKR)</p></td>
            <td>126.23</td>
          </tr>
          <tr>
            <td><p className="bold-text dashboard__neo">Alerts</p></td>
            <td>122</td>
          </tr>
          </tbody>
        </Table>
      </Panel>
    );
  }
}
