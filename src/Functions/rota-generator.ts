import { CreateSchedule, CreateScheduleWithPredictedValues } from 'src/Functions/create-schedule'
import { GetPredictions } from "src/Functions/get-predictions"

const ERROR_WOUT_SMART_PREDICT_MSG = "There was an issue fetching the predictions. \n Please try again later or use smart predict."
const ERROR_MSG = "There was an issue fetching the optimizer. \n Please try again later or upload manual demand."


/// TODO: Clean this up bigtime!
function RotaGenerator(staffDataFile: any, demandFile: any, smartPredict: boolean, setErrorMsg: any, setResponseText: any, setgeneratedRotaFile: any, setPredictedData: any, predictedData: any) {
    setResponseText("Generating..")
    if (smartPredict) {
        console.log("Predicting and generating...")
        console.log(predictedData)

        if (predictedData) {
            CreateScheduleWithPredictedValues(staffDataFile, predictedData)
                .then(response => response.text())
                .then(response => JSON.parse(response))
                .then(data => {
                    setResponseText(data.stats)
                    setgeneratedRotaFile(data.schedule)
                    console.log(data.schedule)
                    console.log(data.stats)
                }
                ).catch((err: Error) => {
                    console.log(err)
                    setResponseText("")
                    setErrorMsg(ERROR_WOUT_SMART_PREDICT_MSG)
                })

        } else {
            GetPredictions()
                .then(response => response.text())
                .then(response => JSON.parse(response))
                .then(predictedData => {
                    CreateScheduleWithPredictedValues(staffDataFile, predictedData)
                        .then(response => response.text())
                        .then(response => JSON.parse(response))
                        .then(data => {
                            setResponseText(data.stats)
                            setgeneratedRotaFile(data.schedule)
                            setPredictedData(predictedData)
                        }
                        )
                }).catch((err: Error) => {
                    console.log(err)
                    setResponseText("")
                    setErrorMsg(ERROR_MSG)
                })
        }

    } else {
        staffDataFile['WeeklyCoverDemand'] = demandFile['WeeklyCoverDemand']
        CreateSchedule(staffDataFile)
            .then(response => response.text())
            .then(response => JSON.parse(response))
            .then(data => {
                setResponseText(data.stats)
                setgeneratedRotaFile(data.schedule)
            }
            ).catch((err: Error) => {
                console.log(err)
                setResponseText("")
                setErrorMsg(ERROR_WOUT_SMART_PREDICT_MSG)
            })
    }
}

export { RotaGenerator }