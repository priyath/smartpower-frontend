import { extend } from 'lodash';

export const updateGaugeSelection = (gauges, selectedGauge) => {
    const gaugeIndex = selectedGauge - 1;
    const currentSelection = gauges[gaugeIndex].selected;

    //already selected gauge clicked. we dont want a scenario where no gauge is selected.
    if (currentSelection) return gauges;

    gauges.map(gauge => {
        gauge.selected = false;
        return gauge;
    });
    gauges[gaugeIndex].selected = true;

    return gauges;
};

// function to update all guages with real-time data
export const updateGaugeRealtimeData = (gauges, realtimeData) => {
    realtimeData.slice().reverse().map((data) => {
        const gaugeIdx = data.controlid - 1;
        const gauge = gauges[gaugeIdx];

        gauge.realtimeData.shift();
        gauge.realtimeData.push(data.readingvalue);
        gauge.value = data.readingvalue;

        return gauge;
    });
    return gauges;
};

//test function
export const randomizeData = (data) => {
    data.map(row => {
        row.uv = 250*(2 + Math.round(Math.random()));
        console.log(row.uv);
        return row;
    });
    return data;
};

//test function
export const getTodayStats = (existing, updated) => {
    updated.minVoltage = updated.minVoltage ? updated.minVoltage : 0;
    updated.maxVoltage = updated.maxVoltage ? updated.maxVoltage : 0;
    return extend({},existing,updated);
};
