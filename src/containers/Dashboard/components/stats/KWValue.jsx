/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const data = [
  { name: 'Page A', amt: 2400 },
  { name: 'Page B', amt: 2210 },
  { name: 'Page C', amt: 2290 },
  { name: 'Page D', amt: 2000 },
  { name: 'Page E', amt: 2181 },
  { name: 'Page F', amt: 2500 },
  { name: 'Page G', amt: 2100 },
  { name: 'Page H', amt: 2290 },
  { name: 'Page I', amt: 2000 },
  { name: 'Page J', amt: 2181 },
];

class KWValue extends PureComponent {
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
    const { t, todayStats } = this.props;

    return (
      <Col md={12} xl={4} lg={6} xs={12}>
        <Card>
          <CardBody className="dashboard__card-widget">
            <div className="card__title">
              <h5 className="bold-text">{t('dashboard.current_month_kwh_value')}</h5>
            </div>
            <div className="dashboard__sales-report dashboard__cost-details">
              <div className="progress-wrap progress-wrap--small">
                <p className="dashboard__sales-report-title">CONSUMED</p>
                <p className="dashboard__sales-report-now">{todayStats.consumption}</p>
              </div>
              <div className="progress-wrap progress-wrap--small progress-wrap--pink">
                <p className="dashboard__sales-report-title">MONTH PREDICTION</p>
                <p className="dashboard__sales-report-now dashboard__stats-predicted">{todayStats.predConsumption}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default withTranslation('common')(KWValue);
