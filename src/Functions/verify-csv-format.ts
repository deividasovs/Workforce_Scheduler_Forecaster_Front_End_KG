function verifyCSVLayout(csvFile: any, isDemand: boolean) {
    if (isDemand) {
        if (!(/Day,Demand/.test(csvFile)) && !(/[\s\S\n]*Monday[\s\S\n]*Sunday/.test(csvFile))) {
            return false
        }
    }
    else {
        if (!(/Department[\S\s\n]*\nBudgeted hours[\S\s\n]*Cost per hour[\S\s\n]*Requests[\S\s\n]*Fixed Assignments/.test(csvFile))) {
            return false
        }
    }
    return true
}

export { verifyCSVLayout }

