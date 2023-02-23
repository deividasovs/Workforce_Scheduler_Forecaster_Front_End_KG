import { ConvertStaffCSVToJson } from "../csv-to-json"

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
    "Employees": 6,
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
    "Fixed Assignments": [
        [0, 0, 0],
        [0, 1, 1],
        [2, 0, 0]

    ]
}


describe('ConvertCSVToJson', () => {
    test('converts a csv string to json file', async () => {
        const output = ConvertStaffCSVToJson(sampleInput)
        //const jsonStr = JSON.stringify(output);
        expect(output).toEqual(sampleOutput)
    })
})