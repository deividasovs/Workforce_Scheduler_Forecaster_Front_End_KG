
import { SquashDemand } from "./demand-squasher"
import { TPredictions } from "src/Types"

const ENDPOINT = 'https://9mq1l963r9.execute-api.eu-west-1.amazonaws.com/Prod/create_schedule/ '

async function CreateSchedule(payload: any) {
    const scheduleResponse = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    return scheduleResponse
}


async function CreateScheduleWithPredictedValues(payload: any, predictedValues: TPredictions, departmentNo: number) {
    if (payload.WeeklyCoverDemand) {
        delete payload.WeeklyCoverDemand
    }

    const shiftDemands = SquashDemand(payload, predictedValues, departmentNo)

    // Add predicted values to payload 
    payload['WeeklyCoverDemand'] = shiftDemands

    // Send payload to endpoint    
    const scheduleResponse = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    return scheduleResponse
}

export { CreateSchedule, CreateScheduleWithPredictedValues }