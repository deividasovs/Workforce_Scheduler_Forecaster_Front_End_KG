const ENDPOINT = 'https://dq5qsn7osnst46q5ae5eekbqhi0vekue.lambda-url.eu-west-1.on.aws'

async function GetPredictions() {
    const predictions = await fetch(ENDPOINT, {
        method: 'GET',
    })
    return predictions
}

export { GetPredictions }