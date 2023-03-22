///https://mui.com/material-ui/react-table/

import { Typography, Paper } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import { TPredictions } from "src/Types"

const PredictionTable = ({ data }: { data: TPredictions }) => {

    let dayOfWeek = 1
    const weekday = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const newTableRows = []

    const columns = [
        { field: 'day', headerName: 'Day' },
        { field: 'time', headerName: 'Time' },
        { field: 'transaction_count', headerName: 'Transactions' },
        { field: 'dept1', headerName: 'Department 1' },
        { field: 'dept2', headerName: 'Department 2' },
        { field: 'dept3', headerName: 'Department 3' },
        { field: 'dept4', headerName: 'Department 4' },
    ]

    var time = 10

    for (let i = 0; i < data.transaction_count.length; i++) {

        const newRow =
        {
            id: i,
            day: weekday[dayOfWeek - 1],
            time: `${time}:00`,
            transaction_count: data.transaction_count[i],
            dept1: data.dept1[i],
            dept2: data.dept2[i],
            dept3: data.dept3[i],
            dept4: data.dept4[i]
        }

        time++

        if (time > 18) {
            time = 10
            dayOfWeek += 1
        }

        newTableRows.push(
            newRow
        )
    }

    return (
        <>
            <Typography variant="h6">Next week's predicted demand</Typography>
            <Paper>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={newTableRows}
                        columns={columns}
                        columnBuffer={7}
                        disableSelectionOnClick
                        pageSize={5}
                    />
                </div>
            </Paper>
        </>
    )

}

export { PredictionTable }