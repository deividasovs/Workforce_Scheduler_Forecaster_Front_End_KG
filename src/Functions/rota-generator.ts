import { CreateSchedule, CreateScheduleWithPredictedValues } from 'src/Functions/create-schedule'
import { GetPredictions } from "src/Functions/get-predictions"

function RotaGenerator(staffDataFile: any, demandFile: any, smartPredict: boolean, setErrorMsg: any, setResponseText: any, setgeneratedRotaFile: any, setPredictedData: any) {
    if (smartPredict) {
        if (staffDataFile === undefined) {
            setErrorMsg("Please upload staff data")
            return
        }
        console.log("Predicting and generating...")

        GetPredictions()
            .then(response => response.text())
            .then(response => JSON.parse(response))
            .then(predictedData => {
                //setPredictedData(data)
                CreateScheduleWithPredictedValues(staffDataFile, predictedData)
                    .then(response => response.text())
                    .then(response => JSON.parse(response))
                    .then(data => {
                        setResponseText(data.stats)
                        setgeneratedRotaFile(data.schedule)
                        setPredictedData(predictedData)
                    }
                    ).catch((err: Error) => { setErrorMsg("There was an issue fetching the optimizer: " + err) })
            }).catch((err: Error) => { setErrorMsg("There was an issue fetching the predictions: " + err) })
    } else {
        if (staffDataFile === undefined) {
            setErrorMsg("Please upload staff data")
            return
        }

        if (demandFile === undefined) {
            setErrorMsg("Please upload demand file or use smart predict")
            return
        }

        staffDataFile['WeeklyCoverDemand'] = demandFile['WeeklyCoverDemand']
        CreateSchedule(staffDataFile)
            .then(response => response.text())
            .then(response => JSON.parse(response))
            .then(data => {
                setResponseText(data.stats)
                setgeneratedRotaFile(data.schedule)
            }
            ).catch((err: Error) => { setErrorMsg("There was an issue fetching the predictions: " + err) })
    }
}

export { RotaGenerator }