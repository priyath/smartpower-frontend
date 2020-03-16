/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {Card, CardBody, Col, ListGroup, ListGroupItem} from 'reactstrap';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import MultiSelectDropdown from "../../../shared/components/MultiSelectDropdown";

const data = [
  { name: 'Page A', uv: 4000 },
  { name: 'Page B', uv: 3000 },
  { name: 'Page C', uv: 2000 },
  { name: 'Page D', uv: 2780 },
  { name: 'Page E', uv: 1890 },
  { name: 'Page F', uv: 2390 },
  { name: 'Page G', uv: 3490 },
  { name: 'Page H', uv: 2000 },
  { name: 'Page I', uv: 2780 },
  { name: 'Page J', uv: 1890 },
];

class TodayStatus extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  handleClick = (item) => {
    const index = data.indexOf(item.payload);
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const { activeIndex } = this.state;
    const activeItem = data[activeIndex];
    const { t } = this.props;

    return (
      <Col md={12} xl={4} lg={6} xs={12}>
        <Card>
          <CardBody className="dashboard__card-widget">
            <div className="card__title">
              <h5 className="bold-text">{t('dashboard.today_status')}</h5>
            </div>
            <ListGroup>
              <ListGroupItem>Peak kW Today 10,731 kW at 12:30 a.m</ListGroupItem>
              <ListGroupItem>Low Voltage Today 115.5 V at 12:30 a.m</ListGroupItem>
              <ListGroupItem>High Voltage Today 125.2 V at 12:30 a.m</ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default withTranslation('common')(TodayStatus);
