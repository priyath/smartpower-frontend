import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Panel from '../../../shared/components/Panel';
import SummaryTable from "./SummaryTable";
import LocationTable from "./LocationTable";

const LocationInfo = ({ t, branchName, consumption, branchDetails }) => (
    <Panel md={12} lg={6} xl={4} title={branchName}>
      <div className="dashboard__stat dashboard__stat--budget">
        <div className="dashboard__stat-main">
          <p className="dashboard__stat-main-title">Branch Information</p>
          <p className="dashboard__stat-main-number">{consumption}</p>
          <hr />
        </div>
          {branchName ? <LocationTable branchDetails={branchDetails} branchName={branchName}/> : <SummaryTable branchDetails={branchDetails}/>}
      </div>
    </Panel>
);

LocationInfo.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(LocationInfo);
