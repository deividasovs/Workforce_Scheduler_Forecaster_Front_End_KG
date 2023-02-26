const ENDPOINT = 'http://localhost:8080/predict' /// Test Endpoint


// TODO: Change Type, merge this and send-payload function
async function GetPredictions() {
    // Send payload to endpoint
    const predictions = await fetch(ENDPOINT, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    })

    return predictions
}


export { GetPredictions }