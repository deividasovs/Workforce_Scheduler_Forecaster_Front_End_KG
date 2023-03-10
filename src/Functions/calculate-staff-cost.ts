const CalculateStaffCost = (staffData: any): number => {
    let totalHours = 0;

    staffData.forEach((row: any) => {
        row.forEach((cell: any) => {
            if (cell.includes("-")) {
                const hours = cell.split('-')
                const startingHour = parseInt(hours[0].split(":")[0])
                const endingHour = parseInt(hours[1].split(":")[0])
                totalHours += endingHour - startingHour
            }
        });
    });

    return totalHours;
}

export { CalculateStaffCost }