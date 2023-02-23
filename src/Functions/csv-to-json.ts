function ConvertStaffCSVToJson(inputFile: any) {
    // Open the input file for reading
    //const input = fs.readFileSync('input.txt', 'utf8');

    // Initialize the JSON object
    const data: any = {};

    // Split the input into lines
    const lines = inputFile.trim().split('\n');

    // Process each line
    let mode = '';
    for (let line of lines) {
        // Remove leading/trailing whitespace and split into an array of values
        const values = line.split(',').map((value: any) => value.trim());

        // Process the line based on its first value
        switch (values[0]) {
            case 'Employees':
                data['EmployeeCount'] = parseInt(values[1]);
                break;
            case 'Shifts':
                data['Shifts'] = [];
                mode = 'shifts';
                break;
            case 'Requests':
                data['Requests'] = [];
                mode = 'requests';
                break;
            case 'Fixed Assignments':
                data['FixedAssignments'] = [];
                mode = 'fixed_assignments';
                break;
            default:
                switch (mode) {
                    case 'shifts':
                        if (values[1] !== "") {
                            if (values[1] === 'Off') {
                                data['Shifts'].push(values[1]);
                            } else {
                                const [start, end] = [values[1], values[2]]
                                data['Shifts'].push(`${start}-${end}`);
                            }
                        }
                        break;
                    case 'requests':
                        if (values[1] !== '') {
                            const employee = parseInt(values[1])
                            const shift = parseInt(values[2])
                            const day = parseInt(values[3])
                            const want = values[4] === "Yes" ? -2 : 2
                            data['Requests'].push([employee, shift, day, want]);
                        }
                        break;
                    case 'fixed_assignments':
                        if (values[1] !== '') {
                            const employee = parseInt(values[1]);
                            const shift = parseInt(values[2]);
                            const day = parseInt(values[3]);
                            data['FixedAssignments'].push([employee, shift, day]);
                        }
                        break;
                }
                break;
        }
    }

    // Return the output
    return data
}

/*
Given a csv file with this file structure, convert it to json

Input:
Day,Demand for shift 1,Demand for shift 2,Demand for shift 3
Monday,1,2,1
Tuesday,1,1,1
Wednesday,1,1,1
Thursday,1,1,1
Friday,1,2,1
Saturday,1,1,2
Sunday,1,1,1


Output:
    "WeeklyCoverDemand": [
        [1, 2, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 2, 1],
        [1, 1, 2],
        [1, 1, 1]
    ]
*/

function ConvertDemandCSVToJson(inputFile: any) {

    // Initialize the JSON object
    const data: any = {};

    // Split the input into lines
    const lines = inputFile.trim().split('\n');

    // Process each line
    let mode = '';
    for (let line of lines) {
        // Remove leading/trailing whitespace and split into an array of values
        const values = line.split(',').map((value: any) => value.trim());

        // Process the line based on its first value
        switch (values[0]) {
            case 'Day':
                data['WeeklyCoverDemand'] = [];
                mode = 'demand';
                break;
            default:
                switch (mode) {
                    case 'demand':
                        if (values[1] !== "") {
                            const day = []
                            for (let i = 1; i < values.length; i++) {
                                day.push(parseInt(values[i]))
                            }
                            data['WeeklyCoverDemand'].push(day)
                        }
                        break;
                }
                break;
        }
    }


    console.log(data)

    return data

}

export { ConvertStaffCSVToJson, ConvertDemandCSVToJson }