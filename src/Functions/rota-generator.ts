import { TRotaGenerator } from 'src/Types/TRotaGenerator'

import { CreateSchedule, CreateScheduleWithPredictedValues } from 'src/Functions/create-schedule'
import { GetPredictions } from "src/Functions/get-predictions"

const ERROR_WOUT_SMART_PREDICT_MSG = "There was an issue fetching the predictions. \n Please try again later or use smart predict."
const ERROR_MSG = "There was an issue fetching the optimizer. \n Please try again later or upload manual demand."

function RotaGenerator({ staffDataFile, departmentNo, demandFile, smartPredict, setErrorMsg, setResponseText, setgeneratedRotaFile, setPredictedData, predictedData }: TRotaGenerator) {
    setResponseText("Generating..")
    if (smartPredict) {
        if (predictedData) {
            CreateScheduleWithPredictedValues(staffDataFile, predictedData, departmentNo)
                .then(response => response.text())
                .then(response => JSON.parse(response))
                .then(data => {
                    setResponseText(data.stats)
                    setgeneratedRotaFile(data.schedule)
                }
                ).catch((err: Error) => {
                    setResponseText("")
                    setErrorMsg(ERROR_WOUT_SMART_PREDICT_MSG)
                })

        } else {
            GetPredictions()
                .then(response => response.text())
                .then(response => JSON.parse(response))
                .then(predictedData => {
                    CreateScheduleWithPredictedValues(staffDataFile, predictedData, departmentNo)
                        .then(response => response.text())
                        .then(response => JSON.parse(response))
                        .then(data => {
                            setResponseText(data.stats)
                            setgeneratedRotaFile(data.schedule)
                            setPredictedData(predictedData)
                        }
                        )
                }).catch((err: Error) => {
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
                setResponseText("")
                setErrorMsg(ERROR_WOUT_SMART_PREDICT_MSG)
            })
    }
}

export { RotaGenerator }