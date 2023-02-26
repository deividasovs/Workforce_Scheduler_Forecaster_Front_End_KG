import { GetPredictions } from '../get-predictions';

// Unit Test Code
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

        expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/predict', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        })
    });

    it('should the correct response', async () => {
        const response = await GetPredictions();

        expect(response).toBeDefined();
        expect(response.status).toBe(200);
        //expect(response.message).toEqual("Predictions"); FIX ME
    });
});