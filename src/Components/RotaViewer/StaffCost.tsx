const StaffCost = ({ cost, actualHours, hourBudget }: { cost: number, actualHours: number, hourBudget: number }) => {

    return (
        <>
            <p>  Staffing budget: €{hourBudget * cost}  - {hourBudget}hrs </p>
            <p>  Staffing cost: €{actualHours * cost} - {actualHours}hrs</p>
        </>
    )
}

export { StaffCost }