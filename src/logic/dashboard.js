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

//test function
export const randomizeData = (data) => {
    data.map(row => {
        row.uv = 250*(2 + Math.round(Math.random()));
        console.log(row.uv);
        return row;
    });
    return data;
};
