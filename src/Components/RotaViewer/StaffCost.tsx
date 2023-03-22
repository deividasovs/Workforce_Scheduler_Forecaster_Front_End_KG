const StaffCost = ({ cost, actualHours, hourBudget }: { cost: number, actualHours: number, hourBudget: number }) => (
    <>
        <p> Budget: €{hourBudget * cost}  - {hourBudget}hrs </p>
        <p> Cost: €{actualHours * cost} - {actualHours}hrs</p>
    </>
)

export { StaffCost }