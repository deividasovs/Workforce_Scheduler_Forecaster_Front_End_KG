import { ConvertStaffCSVToJson, ConvertDemandCSVToJson } from "../csv-to-json"

/*
    Example input:
    Employees,6,,,
    ,,,,
    Shifts,Start,End,,
    ,Off,Off,,
    ,09:00,15:00,,
    ,11:00,16:00,,
    ,15:00,20:00,,
    ,,,,
    ,,,,
    Requests,Employee,Shift,Day,Want
    ,0,0,3,Yes
    ,1,2,1,No
    ,,,,
    ,,,,
    ,,,,
    Fixed Assignments
    ,0,0,0,
    ,0,1,1,
    ,2,0,0,


    Example output:
    {
        "Employees": 6,
        "Shifts": [
            "Off",
            "09:00-15:00",
            "11:00-16:00",
            "15:00-20:00"
        ],
        "Requests": [
            [0,0,3,-2],
            [1,2,1,2]
        ],
        "Fixed Assignments": [
            [0,0,0],
            [0,1,1],
            [2,0,0]

        ]
    }
*/

const sampleInput =
    `
Employees,6,,,
,,,,
Shifts,Start,End,,
,Off,Off,,
,09:00,15:00,,
,11:00,16:00,,
,15:00,20:00,,
,,,,
,,,,
Requests,Employee,Shift,Day,Want
,0,0,3,Yes
,1,2,1,No
,,,,
,,,,
,,,,
Fixed Assignments
,0,0,0,
,0,1,1,
,2,0,0,
`


const sampleOutput = {
    "EmployeeCount": 6,
    "Shifts": [
        "Off",
        "09:00-15:00",
        "11:00-16:00",
        "15:00-20:00"
    ],
    "Requests": [
        [0, 0, 3, -2],
        [1, 2, 1, 2]
    ],
    "FixedAssignments": [
        [0, 0, 0],
        [0, 1, 1],
        [2, 0, 0]

    ]
}


describe('ConvertCSVToJson', () => {
    test('converts a csv string to json file', async () => {
        const output = ConvertStaffCSVToJson(sampleInput)
        //const jsonStr = JSON.stringify(output);
        expect(output.convertedCsv).toEqual(sampleOutput)
    })
})


const sampleDemandInput =
    `
Day,Demand for shift 1,Demand for shift 2,Demand for shift 3
Monday,1,2,1
Tuesday,2,1,1
Wednesday,1,1,1
Thursday,1,1,1
Friday,1,1,1
Saturday,1,1,1
Sunday,1,1,1
`

const sampleDemandOutput = {
    WeeklyCoverDemand: [
        [1, 2, 1],
        [2, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ]
}


describe('ConvertDemandCSVToJson', () => {
    test('converts a csv string to json file', () => {
        const output = ConvertDemandCSVToJson(sampleDemandInput)
        //const jsonStr = JSON.stringify(output);
        expect(output).toEqual(sampleDemandOutput)
    })
})
