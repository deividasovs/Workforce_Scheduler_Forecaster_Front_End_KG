import { testPredictedValues } from 'src/Test-Data/test-predicted-values'

import { CreateSchedule } from '../create-schedule'
import { testDemands } from '../../Test-Data/test-demands'
import { testPayload } from '../../Test-Data/test-payload'

describe('CreateScheduleWithPredictedValues', () => {
    it('sends the correct payload to the endpoint', async () => {
        const mockFetch = jest.fn().mockReturnValueOnce({
            status: 200,
            json: { message: "Schedule created successfully" }
        })
        global.fetch = mockFetch

        const response = await CreateSchedule(testPayload, 1, testPredictedValues)

        testPayload.WeeklyCoverDemand = testDemands

        expect(mockFetch).toHaveBeenCalledWith('https://9mq1l963r9.execute-api.eu-west-1.amazonaws.com/Prod/create_schedule/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...testPayload
            })
        })

        expect(response.json).toEqual({ message: 'Schedule created successfully' })
    })
})


