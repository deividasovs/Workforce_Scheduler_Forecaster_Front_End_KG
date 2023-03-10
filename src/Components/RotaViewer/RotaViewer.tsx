import { useState, useEffect } from 'react';

import { TableContainer, TableHead, TableRow, TableBody, TableCell, Typography } from '@mui/material';

import { StaffCost } from './StaffCost';
import { CalculateStaffCost } from 'src/Functions/calculate-staff-cost';

const RotaViewer = ({ rotaFile, staffCostPerHour, hourBudget }: { rotaFile: any, staffCostPerHour: number, hourBudget: number }) => {
    const [tableData, setTableData] = useState<string[][]>([]);
    const [actualStaffHours, setActualStaffHours] = useState<number>(0);

    useEffect(() => {
        // convert csv to 2d array
        const csvData = rotaFile
        const rows = csvData.split("\n");
        rows.shift();
        const tableData = rows.map((row: any) => row.split(","));
        const totalStaffHours = CalculateStaffCost(tableData);
        setActualStaffHours(totalStaffHours);
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

            <StaffCost cost={staffCostPerHour} hourBudget={hourBudget} actualHours={actualStaffHours} />
        </div>
    )
}

export { RotaViewer }