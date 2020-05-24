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

export const getUniqueDataPoints = (realtimeData) => {
    return realtimeData.filter((el,idx,arr) => {
        return arr.findIndex(arrEl=>{
            return (arrEl.controlid === el.controlid)
        }) === idx
    });
}

// function to update all guages with real-time data
export const updateGaugeRealtimeData = (gauges, realtimeData) => {
    const realtimeDateUnique = getUniqueDataPoints(realtimeData);

    return gauges.map((gauge) => {
        const realtimeData = realtimeDateUnique.filter(obj => {
            return parseInt(obj.controlid) === gauge.id;
        })[0];
        const readingValue = realtimeData ? realtimeData.readingvalue : 0;
        gauge.realtimeData.push(readingValue);
        gauge.realtimeData.shift();
        return gauge;
    });
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
    updated.peak = updated.todayPeakKW ? updated.todayPeakKW : 0;
    updated.consumption = updated.todayEnergy ? updated.todayEnergy : 0;
    return extend({},existing,updated);
};

export const getThresholdFromScantype = (thresholdData, scanType) => {
    for(let i=0; i < thresholdData.length; i++){
        if (thresholdData[i].scantypeid === scanType){
            return thresholdData[i];
        }
    }
    return null;
}

export const updateGaugesWithThresholdInfo = (gauges, thresholdData) => {
    return gauges.map(gauge => {
        const threshold = getThresholdFromScantype(thresholdData, gauge.title);
        if (threshold) {
            gauge.upperThreshold = threshold.upperthreshold;
            gauge.lowerThreshold = threshold.lowerthreshold;
        }
        return gauge;
    })
};

export const getThresholdData = (value) => {
    let data = [];
    for (let i=0; i < 10; i++){
        data.push(value);
    }
    return data;
}

export const getScaleValues = (min, max) => {

}
