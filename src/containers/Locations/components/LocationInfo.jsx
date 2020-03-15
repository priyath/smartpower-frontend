import React from 'react';
import { connect } from 'react-redux';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Panel from '../../../shared/components/Panel';
import getTooltipStyles from '../../../shared/helpers';

const data = [
  { name: '12.03', uv: 4000 },
  { name: '13.03', uv: 3000 },
  { name: '14.03', uv: 2000 },
  { name: '15.03', uv: 2780 },
  { name: '16.03', uv: 1890 },
  { name: '17.03', uv: 2390 },
  { name: '18.03', uv: 3490 },
  { name: '19.03', uv: 3490 },
  { name: '20.03', uv: 3490 },
  { name: '21.03', uv: 3490 },
];

const LocationInfo = ({ t, dir, themeName }) => (
    <Panel md={12} lg={12} xl={4} sm={12} xs={12} title={t('locations.location_info')}>
      <div dir="ltr">
      </div>
    </Panel>
);

LocationInfo.propTypes = {
  t: PropTypes.func.isRequired,
  dir: PropTypes.string.isRequired,
  themeName: PropTypes.string.isRequired,
};

export default connect(state => ({ themeName: state.theme.className }))(withTranslation('common')(LocationInfo));
