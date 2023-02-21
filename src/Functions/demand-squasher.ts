import { TPredictions } from "src/Types"

function SquashDemand(payload: any, predictedValues: TPredictions) {
    // The first shift is not accounted for in the predicted values since it's an off shift
    // Timings are 10:00 - 18:00
    const demands: number[][] = []

    /// Make the demands array payload.shifts.length long and 7 days long

    for (var d = 0; d < 7; d++) {
        demands.push([])
        /// Skip the first shift, it's an off shift
        for (var i = 1; i < payload.Shifts.length; i++) {
            const startTime = payload.Shifts[i].split("-")[0]
            const endTime = payload.Shifts[i].split("-")[1]

            // Get the average demand between the startTime and the EndTime shift

            /// From the start time till the endTime, get the average demand
            const startHour = parseInt(startTime.split(":")[0])
            const endHour = parseInt(endTime.split(":")[0])

            let totalDemand = 0

            for (var h = startHour - 10; h < endHour - 10; h++) {
                totalDemand += predictedValues.dept1[(d * 8) + h]
            }

            /// Set the demand to equal to average returned demand for the shift
            demands[d].push(Math.round(totalDemand / (endHour - startHour)))
        }
    }

    return demands
}


export { SquashDemand }