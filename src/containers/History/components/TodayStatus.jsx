import React, { PureComponent } from 'react';
import { Card, CardBody, Col, ListGroup, ListGroupItem } from 'reactstrap';
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

export default class TodayStatus extends PureComponent {
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
      <Panel xl={6} lg={12} title="Today's Status">
        <ListGroup>
          <ListGroupItem>Peak kW Today 10,731 kW at 12:30 a.m</ListGroupItem>
          <ListGroupItem>Low Voltage Today 115.5 V at 12:30 a.m</ListGroupItem>
          <ListGroupItem>High Voltage Today 125.2 V at 12:30 a.m</ListGroupItem>
        </ListGroup>
      </Panel>
    );
  }
}
