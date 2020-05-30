export const transformBranchSummaryData = (data) => {
    let branchSummaryMap = {};
    return data.map(el => {
        return branchSummaryMap[el.location] = {
            energyConsumption: el.totalEnergy,
            alertCount: 0,
        };
    })
}
