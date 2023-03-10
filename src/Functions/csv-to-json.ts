function ConvertStaffCSVToJson(inputFile: any) {
    const convertedCsv: any = {};

    let budgetedHours = 0
    let costPerHour = 0

    const lines = inputFile.trim().split('\n');

    let mode = '';
    for (let line of lines) {

        const values = line.split(',').map((value: any) => value.trim());

        // Process the line based on its first value
        switch (values[0]) {
            case 'Budgeted hours':
                budgetedHours = parseInt(values[1]);
                break;
            case 'Cost per hour':
                costPerHour = parseInt(values[1]);
                break;
            case 'Employees':
                convertedCsv['EmployeeCount'] = parseInt(values[1]);
                break;
            case 'Shifts':
                convertedCsv['Shifts'] = [];
                mode = 'shifts';
                break;
            case 'Requests':
                convertedCsv['Requests'] = [];
                mode = 'requests';
                break;
            case 'Fixed Assignments':
                convertedCsv['FixedAssignments'] = [];
                mode = 'fixed_assignments';
                break;
            default:
                switch (mode) {
                    case 'shifts':
                        if (values[1] !== "") {
                            if (values[1] === 'Off') {
                                convertedCsv['Shifts'].push(values[1]);
                            } else {
                                const [start, end] = [values[1], values[2]]
                                convertedCsv['Shifts'].push(`${start}-${end}`);
                            }
                        }
                        break;
                    case 'requests':
                        if (values[1] !== '') {
                            const employee = parseInt(values[1])
                            const shift = parseInt(values[2])
                            const day = parseInt(values[3])
                            const want = values[4] === "Yes" ? -2 : 2
                            convertedCsv['Requests'].push([employee, shift, day, want]);
                        }
                        break;
                    case 'fixed_assignments':
                        if (values[1] !== '') {
                            const employee = parseInt(values[1]);
                            const shift = parseInt(values[2]);
                            const day = parseInt(values[3]);
                            convertedCsv['FixedAssignments'].push([employee, shift, day]);
                        }
                        break;
                }
                break;
        }
    }

    return { convertedCsv, costPerHour, budgetedHours }
}

function ConvertDemandCSVToJson(inputFile: any) {
    const data: any = {};

    const lines = inputFile.trim().split('\n');

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

    return data
}

export { ConvertStaffCSVToJson, ConvertDemandCSVToJson }