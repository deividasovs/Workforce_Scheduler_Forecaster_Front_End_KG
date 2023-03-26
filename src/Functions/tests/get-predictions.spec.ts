import { GetPredictions } from '../get-predictions';

describe('GetPredictions', () => {
    let mockFetch = jest.fn()

    beforeEach(() => {
        mockFetch = jest.fn().mockReturnValue({
            status: 200,
            message: "Predictions"
        })
        global.fetch = mockFetch
    });

    it('Gets called correctly', async () => {
        await GetPredictions();
        expect(mockFetch).toHaveBeenCalledWith(
            'https://dq5qsn7osnst46q5ae5eekbqhi0vekue.lambda-url.eu-west-1.on.aws', {
            method: 'GET',
        })
    });

    it('should return the correct response', async () => {
        const response = await GetPredictions();
        expect(response).toBeDefined();
        expect(response.status).toBe(200);
    });
});