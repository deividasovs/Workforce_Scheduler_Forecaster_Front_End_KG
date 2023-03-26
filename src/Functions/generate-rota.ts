import { TRotaGenerator } from 'src/Types/TRotaGenerator'

import { CreateSchedule } from 'src/Functions/create-schedule'
import { GetPredictions } from "src/Functions/get-predictions"

const ERROR_WOUT_SMART_PREDICT_MSG = "There was an issue fetching the predictions. \n Please try again later or use smart predict."
const ERROR_MSG = "There was an issue fetching the optimizer. \n Please try again later or upload manual demand."

interface IGenerateRotaResponse {
    errorMsg?: string,
    responseText: string,
    generatedRotaFile?: any,
}

async function GenerateRota({ staffDataFile, departmentNo, demandFile, smartPredict }: TRotaGenerator): Promise<IGenerateRotaResponse> {
    if (smartPredict) {
        try {
            const response = await GetPredictions();
            const predictedData = await response.json();
            const scheduleResponse = await CreateSchedule(staffDataFile, departmentNo, predictedData);
            const { stats, schedule } = await scheduleResponse.json();
            return { responseText: stats, generatedRotaFile: schedule };
        } catch (err) {
            return { errorMsg: ERROR_MSG, responseText: "error received" };
        }

    } else {
        staffDataFile['WeeklyCoverDemand'] = demandFile['WeeklyCoverDemand']
        try {
            const response = await CreateSchedule(staffDataFile);
            const data = await response.json();
            return { responseText: data.stats, generatedRotaFile: data.schedule };
        } catch (err) {
            return { errorMsg: ERROR_WOUT_SMART_PREDICT_MSG, responseText: "error received" };
        }
    }
}

export { GenerateRota }