export const startDate = (endDate, interval) => {
    //Takes the object end date converts it in milliseconds and subtract with interval (days) * millisecond in a day
    //Returns the start date 
    return new Date(endDate.getTime() - interval * 86400000)
}