import { PredictionTable } from 'src/Components/PredictionResponse/PredictionValues'
import { PredictionGraph } from 'src/Components/PredictionResponse/PredictionGraph'

const PredictionSection = ({ predictedData }: { predictedData: any }) => (
    <>
        <PredictionTable data={predictedData} />
        <PredictionGraph predictedData={predictedData} />
    </>
)

export { PredictionSection }