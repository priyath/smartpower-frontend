import React from 'react';
import { PieChart, Pie } from 'recharts';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Panel from '../../../shared/components/Panel';

const data01 = [{ value: 50, fill: '#4ce1b6' },
  { value: 50, fill: '#eeeeee' }];

const LocationInfo = ({ t, branchName, consumption }) => (
    <Panel md={12} lg={6} xl={4} title={branchName}>
      <div className="dashboard__stat dashboard__stat--budget">
        <div className="dashboard__stat-main">
          <p className="dashboard__stat-main-title">kW consumption: 1st - 25th January</p>
          <p className="dashboard__stat-main-number">{consumption}</p>
          <hr />
        </div>
      </div>
    </Panel>
);

LocationInfo.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(LocationInfo);
