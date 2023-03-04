import { useState, useEffect } from 'react';

import { TableContainer, TableHead, TableRow, TableBody, TableCell, Typography } from '@mui/material';

import { StaffCost } from './StaffCost';

const RotaViewer = ({ rotaFile }: { rotaFile: any }) => {
    const [tableData, setTableData] = useState<string[][]>([]);

    useEffect(() => {
        // convert csv to 2d array
        const csvData = rotaFile
        const rows = csvData.split("\n");
        rows.shift();
        const tableData = rows.map((row: any) => row.split(","));
        setTableData(tableData);
    }, []);


    return (
        <div>
            <Typography variant="h6">Next week's rota</Typography>
            <TableContainer>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Mon</TableCell>
                        <TableCell>Tue</TableCell>
                        <TableCell>Wed</TableCell>
                        <TableCell>Thurs</TableCell>
                        <TableCell>Fri</TableCell>
                        <TableCell>Sat</TableCell>
                        <TableCell>Sun</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        tableData.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {row.map((cell: any, cellIndex: any) => (
                                    <TableCell key={`${rowIndex}-${cellIndex}`}>{cell}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                </TableBody>
            </TableContainer>

            <StaffCost />
        </div>
    )
}

export { RotaViewer }