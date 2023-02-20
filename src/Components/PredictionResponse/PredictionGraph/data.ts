import { TPredictions } from "src/Types"


///TODO: Change predicted_data to something else
const predicted_data = (data: TPredictions): any[] => {
    // return today's day of the week
    const today = new Date().getDay()

    return [
        { date: today, value: agglomorateData(0, data.transaction_count) },
        { date: today + 1, value: agglomorateData(7, data.transaction_count) },
        { date: today + 2, value: agglomorateData(15, data.transaction_count) },
        { date: today + 3, value: agglomorateData(23, data.transaction_count) },
        { date: today + 4, value: agglomorateData(31, data.transaction_count) },
        { date: today + 5, value: agglomorateData(39, data.transaction_count) },
        { date: today + 6, value: agglomorateData(47, data.transaction_count) }
    ]
}

/// Hour increments are 8, so for each day, we need to add 8 to the index to get the next day's data

function agglomorateData(startAt: number, transction_count: any[]): number {
    const endAt = startAt + 8
    let res = 0

    transction_count.slice(startAt, endAt).map((d: any) => {
        res += d
    })


    return res
}


export { predicted_data }