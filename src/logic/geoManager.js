export const generateBranchConfigRows = (thresholdData) => {
    return thresholdData.map(entry => {
        return {
            location: entry.location,
            lat: entry.lat,
            lng: entry.lng,
        }
    })
}
