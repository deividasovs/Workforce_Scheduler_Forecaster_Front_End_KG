import { SquashDemand } from '../demand-squasher'

import { testPredictedValues } from 'src/Test-Data/test-predicted-values'
import { testDemands } from '../../Test-Data/test-demands'
import { testPayload } from '../../Test-Data/test-payload'

describe('SquashDemand', () => {
    it('squashes returned demand for different departments correctly', async () => {
        const response = SquashDemand(testPayload, testPredictedValues, 1)
        const expectedDemands = testDemands
        expect(response).toEqual(expectedDemands)
        const responseDept2 = SquashDemand(testPayload, testPredictedValues, 2)
        const responseDept3 = SquashDemand(testPayload, testPredictedValues, 3)
        const responseDept4 = SquashDemand(testPayload, testPredictedValues, 4)
        const def = SquashDemand(testPayload, testPredictedValues, 5)
    })
})