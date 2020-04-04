import React from 'react';
import { connect } from 'react-redux';
import {
  AreaChart, Area, Line, XAxis, YAxis, LineChart, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Panel from '../../../shared/components/Panel';
import getTooltipStyles from '../../../shared/helpers';
import { useEffect, useState } from 'react';

const HeartBeat = ({ t, dir, themeName, heartbeat }) => {

  return (<Panel md={12} lg={12} xl={7} sm={12} xs={12} title={t('dashboard.live_heartbeat')}>
    <div dir="ltr">
      <ResponsiveContainer height={500} className="dashboard__area">
        <AreaChart
            data={heartbeat.data}
            margin={{
              top: 0, right: 0, left: -15, bottom: 0,
            }}
        >
          <XAxis dataKey="name" tickLine={false} reversed={false}/>
          <YAxis tickLine={false} orientation={dir === 'rtl' ? 'right' : 'left'}/>
          <CartesianGrid vertical={false}/>
          <Tooltip {...getTooltipStyles(themeName, 'defaultItems')} />
          <Area type="monotone" dataKey="uv" stroke="#24d6a3" fill="#4ce1b6" fillOpacity={0.2}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </Panel>);
};

HeartBeat.propTypes = {
  t: PropTypes.func.isRequired,
  dir: PropTypes.string.isRequired,
  themeName: PropTypes.string.isRequired,
};

export default connect(state => ({ themeName: state.theme.className }))(withTranslation('common')(HeartBeat));
