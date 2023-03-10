import { useState } from "react"

import { CircularProgress } from "@mui/material"

import { AppLayout } from "src/Components/AppLayout"
import { PredictionTable } from 'src/Components/PredictionResponse/PredictionValues'
import { PredictionGraph } from 'src/Components/PredictionResponse/PredictionGraph'

import { GetPredictions } from "src/Functions"

import { FORECAST_PAGE_NAME } from "src/consts"

import { samplePredictedData } from "src/Test-Data/predicted-data-return"


const PredictionsPage = ({ predictedData }: { predictedData?: any }) => {

    const [newPredictedData, setNewPredictedData] = useState<any>(predictedData)

    if (!newPredictedData) {
        console.log("Fetching predicted data")
        setNewPredictedData(samplePredictedData) // If in test mode
        /* GetPredictions()
             .then(response => response.text())
             .then(response => JSON.parse(response))
             .then(predictedData => {
                 setNewPredictedData(predictedData)
             }).catch((error) => {
                 console.log(error)
                 //TODO: Change this to some error popup
                 document.body.appendChild(document.createTextNode(error))
             })
             */
    }

    return (
        <AppLayout
            title={FORECAST_PAGE_NAME}
            content={
                <>
                    {newPredictedData ?
                        <>
                            <PredictionTable data={newPredictedData} />
                            <PredictionGraph predictedData={newPredictedData} />
                        </>
                        :
                        <>
                            Getting predictions...
                            <br />
                            <br />
                            <CircularProgress />
                        </>
                    }
                </>
            } />
    )
}

export { PredictionsPage }