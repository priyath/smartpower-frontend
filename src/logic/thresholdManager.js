export const generateThresholdRows = (thresholdData) => {
    return thresholdData.map(entry => {
        return {
            id: entry.scantypeid,
            gauge: entry.scantypeid,
            lowerThreshold: entry.lowerthreshold,
            upperThreshold: entry.upperthreshold,
        }
    })
}
