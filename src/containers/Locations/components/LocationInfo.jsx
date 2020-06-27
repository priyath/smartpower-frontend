import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Panel from '../../../shared/components/Panel';
import SummaryTable from "./SummaryTable";
import LocationTable from "./LocationTable";

const LocationInfo = ({ t, branchName, consumption, branchDetails, panelTitle }) => (
    <Panel md={12} lg={6} xl={4} title={panelTitle}>
      <div className="dashboard__stat dashboard__stat--budget">
          {branchName ? <LocationTable branchDetails={branchDetails} branchName={branchName}/> : <SummaryTable branchDetails={branchDetails}/>}
      </div>
    </Panel>
);

LocationInfo.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(LocationInfo);
