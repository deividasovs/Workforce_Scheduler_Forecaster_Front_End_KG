import { TPredictions } from "src/Types"

function SquashDemand(payload: any, predictedValues: TPredictions, departmentNo: number) {
    let department = predictedValues.dept1;

    switch (departmentNo) {
        case 1:
            department = predictedValues.dept1;
            break;
        case 2:
            department = predictedValues.dept2;
            break;
        case 3:
            department = predictedValues.dept3;
            break;
        case 4:
            department = predictedValues.dept4;
            break;

        default:
            //console.log("Error department number")
            break;
    }

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

            const startHour = parseInt(startTime.split(":")[0])
            const endHour = parseInt(endTime.split(":")[0])

            let totalDemand = 0

            for (var h = startHour - 10; h < endHour - 10; h++) {
                totalDemand += department[(d * 8) + h]
            }

            let avgDemand = Math.round(totalDemand / (endHour - startHour))
            if (Number.isNaN(avgDemand)) {
                avgDemand = 0
            }
            demands[d].push(avgDemand)
        }
    }

    return demands
}

export { SquashDemand }