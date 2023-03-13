import { AppLayout } from "src/Components/AppLayout"
import { PredictionTable } from 'src/Components/PredictionResponse/PredictionValues'
import { PredictionGraph } from 'src/Components/PredictionResponse/PredictionGraph'

const PredictionsPage = ({ predictedData }: { predictedData: any }) => {
    return (
        <AppLayout content={
            <>
                <PredictionTable data={predictedData} />
                <PredictionGraph predictedData={predictedData} />
            </>
        } />
    )
}

export { PredictionsPage }