import { CreateScheduleWithPredictedValuesWrapper } from 'src/Functions/wrappers/CreateScheduleWithPredictedWrapper'
import { CreateSchedule } from 'src/Functions/create-schedule'

function RotaGenerator(staffDataFile: any, demandFile: any, smartPredict: boolean, setErrorMsg: any, setResponseText: any, setgeneratedRotaFile: any, setPredictedData: any) {
    if (smartPredict) {
        if (staffDataFile === undefined) {
            setErrorMsg("Please upload staff data")
            return
        }

        console.log("Predicting and generating...")
        CreateScheduleWithPredictedValuesWrapper(staffDataFile = { staffDataFile })
            .then(data => {
                console.log("Setting data")
                console.log(data.response)
                console.log(data.rota)
                console.log(data.prediction)
                setResponseText(data.response)
                setgeneratedRotaFile(data.rota)
                setPredictedData(data.prediction)
            }).catch(err => {
                setErrorMsg(err.toString() + " : Please try again")
                console.log(err)
            })

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
            ).catch(err => setResponseText(err.toString() + " : Please try again"))
    }
}

export { RotaGenerator }