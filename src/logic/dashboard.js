export const updateGaugeSelection = (gauges, selectedGauge) => {
    const currentSelection = gauges[selectedGauge].selected;

    //already selected gauge clicked. we dont want a scenario where no gauge is selected.
    if (currentSelection) return gauges;

    gauges.map(gauge => {
        gauge.selected = false;
        return gauge;
    });
    gauges[selectedGauge].selected = true;

    return gauges;
};