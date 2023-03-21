import { testPredictedValues } from 'src/Test-Data/test-predicted-values'

import { CreateScheduleWithPredictedValues, CreateSchedule } from '../create-schedule'
import { testDemands } from '../../Test-Data/test-demands'
import { testPayload } from '../../Test-Data/test-payload'

describe('CreateScheduleWithPredictedValues', () => {
    it('sends the correct payload to the endpoint', async () => {
        // Mock the fetch function
        const mockFetch = jest.fn().mockReturnValueOnce({
            status: 200,
            json: { message: "Schedule created successfully" }
        })
        global.fetch = mockFetch

        // Call the function
        const response = await CreateScheduleWithPredictedValues(testPayload, testPredictedValues, 1)
        const response2 = await CreateSchedule(testPayload)

        testPayload.WeeklyCoverDemand = testDemands

        // Check that fetch was called with the correct arguments
        expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/create_schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...testPayload
            })
        })

        // Check that the response is correct
        expect(response.json).toEqual({ message: 'Schedule created successfully' })
    })
})


