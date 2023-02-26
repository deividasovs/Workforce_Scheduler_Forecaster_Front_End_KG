import { CreateScheduleWithPredictedValues } from "../create-schedule"
import { GetPredictions } from "../get-predictions"

type TSchedulePredictionResponse = {
    prediction: any,
    response: string,
    rota: any
}

/// Pass all the usestates to this function too
async function CreateScheduleWithPredictedValuesWrapper({ staffDataFile, }: { staffDataFile: any }): Promise<TSchedulePredictionResponse> {
    let predictedData = undefined
    let responseText = ""
    let rotaFile = undefined

    await GetPredictions()
        .then(response => response.text())
        .then(response => JSON.parse(response))
        .then(data => {
            //setPredictedData(data)
            CreateScheduleWithPredictedValues(staffDataFile, data)
                .then(response => response.text())
                .then(response => JSON.parse(response))
                .then(data => {
                    console.log(data.schedule)

                    rotaFile = data.schedule
                    responseText = data.stats
                    predictedData = data
                }
                )//.catch((err: Error) => { return err })
        })
    //.catch((err: Error) => { return err }) Making it so error is checked from main page -> Will be changed when UseState is passed here

    return {
        prediction: predictedData,
        response: responseText,
        rota: rotaFile
    }
}


export { CreateScheduleWithPredictedValuesWrapper }