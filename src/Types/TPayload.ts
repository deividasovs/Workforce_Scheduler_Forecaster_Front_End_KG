type TPayload = {
    EmployeeCount: number,
    Shifts: string[], // ["O", "09:00-15:00", "11:00-16:00", "15:00-20:00"],
    Requests: number[][], // [[3, 0, 5, -2] -> Employee 3 wants the 0 shift on Saturday. -2 = want, 2 = dont want
    FixedAssignments: number[][], // [1, 0, 1] -> Employee 1 is assigned to shift 0 on Tuesday
    WeeklyCoverDemand: number[][] //[3, 2,3] -> shift1 demand = 3, shift2 demand = 2, shift3 demand = 3
}

export type { TPayload }