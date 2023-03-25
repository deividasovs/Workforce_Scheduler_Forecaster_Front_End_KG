const StaffCost = ({ cost, actualHours, hourBudget }: { cost: number, actualHours: number, hourBudget: number }) => (
    <>
        <p> Budget: €{(hourBudget * cost).toFixed(2)
        }  - {hourBudget}hrs </p>
        <p> Cost: €{(actualHours * cost).toFixed(2)} - {actualHours}hrs</p>
    </>
)

export { StaffCost }