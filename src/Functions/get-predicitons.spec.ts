import { GetPredictions } from './get-predicitons';

// Unit Test Code
describe('GetPredictions', () => {
    it('should return a response', async () => {
        const response = await GetPredictions();
        expect(response).toBeDefined();
    });

    it('should return a response with status 200', async () => {
        const response = await GetPredictions();
        expect(response.status).toBe(200);
    });

    it('should return a json object', async () => {
        const response = await GetPredictions();
        expect(response.json()).toBeDefined();
    });

    it('should have the correct endpoint url', async () => {
        const response = await GetPredictions();
        expect(