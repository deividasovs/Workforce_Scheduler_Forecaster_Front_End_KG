const ENDPOINT = 'http://localhost:8080/predict' /// Test Endpoint


// TODO: Change Type, merge this and send-payload function
async function GetPredictions() {
    // Send payload to endpoint
    const response = await fetch(ENDPOINT, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    })

    return response
}


export { GetPredictions }