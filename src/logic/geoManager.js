export const generateBranchConfigRows = (thresholdData) => {
    console.log('threshold data: ', thresholdData);
    return thresholdData.map(entry => {
        return {
            id: entry.location,
            location: entry.location,
            lat: entry.lat,
            lng: entry.lng,
            contactName: entry.primary_name,
            contactEmail: entry.primaryemail,
            contactPhone: entry.primary_mobile,
        }
    })
}
