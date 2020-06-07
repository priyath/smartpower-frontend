export const generateBranchConfigRows = (thresholdData) => {
    return thresholdData.map(entry => {
        return {
            id: entry.location,
            location: entry.location,
            lat: entry.lat,
            lng: entry.lng,
        }
    })
}
