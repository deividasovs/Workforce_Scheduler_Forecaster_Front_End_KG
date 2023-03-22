import { samplePredictedData } from 'src/Test-Data/predicted-data-return'
import { sampleGeneratedRota } from 'src/Test-Data/sampleRotas/sample-generated-rota'
import { sampleRotaStatistics } from 'src/Test-Data/sample-rota-statistics'

function TestRotaGenerator(setResponseText: any, setgeneratedRotaFile: any, setPredictedData: any) {
    setResponseText("Generating..")
    setResponseText(sampleRotaStatistics)
    setgeneratedRotaFile(sampleGeneratedRota)
    setPredictedData(samplePredictedData)
}

export { TestRotaGenerator }