import { SquashDemand } from '../demand-squasher'

import { testPredictedValues } from 'src/Test-Data/test-predicted-values'
import { testDemands } from '../../Test-Data/test-demands'
import { testPayload } from '../../Test-Data/test-payload'

describe('CreateScheduleWithPredictedValues', () => {
    test('sends the correct payload to the endpoint', async () => {
        // Mock the fetch function
        const mockFetch = jest.fn().mockReturnValueOnce({
            status: 200,
            json: () => Promise.resolve({ message: 'Schedule created successfully' })
        })
        global.fetch = mockFetch

        // Call the function
        const response = SquashDemand(testPayload, testPredictedValues, 1)

        const expectedDemands = testDemands

        expect(response).toEqual(expectedDemands)
    })
})


