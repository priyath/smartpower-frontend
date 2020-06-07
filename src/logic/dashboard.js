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
        gauge.value = readingValue;
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
            gauge.startValue = threshold.startvalue;
            gauge.endValue = threshold.endvalue;
            gauge.tickInterval = threshold.ticinterval;
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

export const getYearMonth = (date) => {
    const year = date && date.getFullYear() ? date.getFullYear() : '2020';
    let month = date&& date.getMonth() ? (parseInt(date.getMonth())+1) : 1;
    month = month < 10 ? '0' + month : month;

    return year + '-' + month;
}

export const getCompKeys = (data) => {
    let keys = [];
    try {
        const fromDataSet = data.fromDateEnergyData;
        const toDataSet = data.toDateEnergyData;

        const arraySize = fromDataSet.length > toDataSet.length ? fromDataSet.length : toDataSet.length;
        for (let i = 0; i < arraySize; i++) {
            keys[i] = i + 1;
        }
        return keys;
    } catch (e){
        console.log('Something went wrong during key generation. ', e);
        return keys;
    }
}

export const getCompData = (data) => {
    return data.map(el => {
        return el.totalEnergy;
    });
}

export const getTickInterval = (start, end, tick) => {
    if (isNaN(start) || isNaN(end) || isNaN(tick) || (start >= end) || (tick <= 0)) return [
        0,10,20,30,40,50,60,70,80,90,100
    ];
    let ticks = [start];
    let counter = parseInt(start);
    end = parseInt(end);
    tick = parseInt(tick);

    while (counter <= end){
        ticks.push(counter);
        counter = counter + tick;
    }
    return ticks;
}

export const lowerThresholdColor = 'rgba(253,189,5,0.5)';
export const upperThresholdColor = 'rgba(187,62,62, 0.6)';
export const idealRangeColor = 'rgba(94,173,94,0.75)';

export const getHighlights = (gauge) => {
    const upperThreshold = gauge.upperThreshold;
    const lowerThreshold = gauge.lowerThreshold;
    const startValue = gauge.startValue;
    const endValue = gauge.endValue;

    return [
        {
        "from": startValue,
        "to": lowerThreshold,
        "color": lowerThresholdColor
        },
        {
            "from": lowerThreshold,
            "to": upperThreshold,
            "color": idealRangeColor
        },
        {
            "from": upperThreshold,
            "to": endValue,
            "color": upperThresholdColor
        }
    ]
}
