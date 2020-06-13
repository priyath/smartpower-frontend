export const transformBranchSummaryData = (data) => {
    let branchSummaryMap = {};
    return data.map(el => {
        return branchSummaryMap[el.location] = {
            energyConsumption: Math.round((el.totalEnergy + Number.EPSILON) * 10000)/10000,
            alertCount: el.alertCount,
            location: el.location,
        };
    })
}
