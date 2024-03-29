/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const data = [
  { name: 'Page A', pv: 255 },
  { name: 'Page B', pv: 452 },
  { name: 'Page C', pv: 154 },
  { name: 'Page D', pv: 85 },
  { name: 'Page E', pv: 545 },
  { name: 'Page F', pv: 438 },
  { name: 'Page G', pv: 523 },
  { name: 'Page H', pv: 226 },
  { name: 'Page I', pv: 112 },
  { name: 'Page J', pv: 101 },
];

class Cost extends PureComponent {
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
    const { t, cost } = this.props;

    return (
      <Col md={12} xl={3} lg={6} xs={12}>
        <Card>
          <CardBody className="dashboard__card-widget">
            <div className="card__title">
              <h5 className="bold-text">{t('dashboard.cost')}</h5>
            </div>
            <div className="dashboard__sales-report dashboard__cost-details">
              <div className="progress-wrap progress-wrap--small">
                <p className="dashboard__sales-report-title">CURRENT</p>
                <p className="dashboard__sales-report-now">{cost}</p>
              </div>
              <div className="progress-wrap progress-wrap--small progress-wrap--pink">
                <p className="dashboard__sales-report-title">PREDICTED</p>
                <p className="dashboard__sales-report-now dashboard__stats-predicted">{cost}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default withTranslation('common')(Cost);
