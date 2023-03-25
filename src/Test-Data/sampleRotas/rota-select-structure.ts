import { sampleGeneratedRotaDept1Wk1, sampleGeneratedRotaDept1Wk2, sampleGeneratedRotaDept2Wk1, sampleGeneratedRotaDept2Wk2, sampleGeneratedRotaDept3Wk1, sampleGeneratedRotaDept3Wk2, sampleGeneratedRotaDept4Wk1, sampleGeneratedRotaDept4Wk2 } from "src/Test-Data/sampleRotas";

interface IRotaSelectStructure {
    [dept: string]: {
        [wk: string]: string
    }
}

const rotaSelectStructure: IRotaSelectStructure = {
    "dept1":
    {
        "wk1": sampleGeneratedRotaDept1Wk1,
        "wk2": sampleGeneratedRotaDept1Wk2,
    },
    "dept2":
    {
        "wk1": sampleGeneratedRotaDept2Wk1,
        "wk2": sampleGeneratedRotaDept2Wk2,
    },
    "dept3":
    {
        "wk1": sampleGeneratedRotaDept3Wk1,
        "wk2": sampleGeneratedRotaDept3Wk2,
    },
    "dept4":
    {
        "wk1": sampleGeneratedRotaDept4Wk1,
        "wk2": sampleGeneratedRotaDept4Wk2,
    }
}

export { rotaSelectStructure }