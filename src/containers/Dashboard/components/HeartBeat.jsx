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

const getRandom = () => {
  return Math.floor((Math.random() * 1000) + 1);
};

const getData = () => {
  return [
    { name: '1', uv: 500 },
    { name: '2', uv: 500 },
    { name: '3', uv: 500 },
    { name: '4', uv: 500 },
    { name: '5', uv: 500 },
    { name: '6', uv: 500 },
    { name: '7', uv: 500 },
    { name: '8', uv: 500 },
    { name: '9', uv: 500 },
    { name: '10', uv: 2 },
  ];
};

const HeartBeat = ({ t, dir, themeName }) => {

  const [value, setValue] = useState(getData());

  const onClickHandler = () => {
    let data = value;
    let count = parseInt(data[data.length - 1].name) + 1;
    const newEntry = { name: count.toString(), uv: getRandom() };
    data.push(newEntry);
    data.shift();
    setValue(data.slice());
  };

  return (<Panel md={12} lg={12} xl={7} sm={12} xs={12} title={t('dashboard.live_heartbeat')}>
    <button onClick={onClickHandler}>Simulate</button>
    <div dir="ltr">
      <ResponsiveContainer height={500} className="dashboard__area">
        <AreaChart
            data={value}
            margin={{
              top: 0, right: 0, left: -15, bottom: 0,
            }}
        >
          <XAxis dataKey="name" tickLine={false} reversed={dir === 'rtl'}/>
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
