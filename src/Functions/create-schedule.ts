import { SquashDemand } from "./demand-squasher"
import { TPredictions } from "src/Types"


const ENDPOINT = 'http://localhost:3000/create_schedule' /// Test Endpoint

async function CreateSchedule(payload: any) {
    // Send payload to endpoint
    const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    return response
}


async function CreateScheduleWithPredictedValues(payload: any, predictedValues: TPredictions) {
    console.log("Creating Schedule with predicted values")

    console.log("Predicted Values:")
    console.log(predictedValues)

    console.log("The payload is:")
    console.log(payload)

    // If payload object contains a WeeklyCoverDemand key, then delete that key
    if (payload.WeeklyCoverDemand) {
        delete payload.WeeklyCoverDemand
    }

    /// BIG TODO: Might have to run workforce scheduler n times due to predicting multiple depts
    /// It currently only schedules 1 dept
    const demands = SquashDemand(payload, predictedValues)



    // Add predicted values to payload 
    payload['WeeklyCoverDemand'] = demands



    // Send payload to endpoint    
    const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    return response
}


export { CreateSchedule, CreateScheduleWithPredictedValues }