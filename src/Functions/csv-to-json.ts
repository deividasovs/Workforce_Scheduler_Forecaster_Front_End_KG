

function ConvertCSVToJson(inputFile: any) {
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
                data['Employees'] = parseInt(values[1], 10);
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
                data['Fixed Assignments'] = [];
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
                            data['Fixed Assignments'].push([employee, shift, day]);
                        }
                        break;
                }
                break;
        }
    }

    // Return the output
    return data
}

export { ConvertCSVToJson }