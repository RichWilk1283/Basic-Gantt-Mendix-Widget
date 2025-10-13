import { getEarliestDate } from "./DateHelpers";

export function testRunner(): void {
    console.log(`Test Result for getEarliestDate(): ${getEarliestDateTest()}`);
}

function getEarliestDateTest(): string{
    const dateA: Date = new Date();
    dateA.setHours(0,0,0,0);
    const dateB: Date = new Date(dateA.getTime() + 1 * 24 * 60 * 60 * 1000);
    const dateC: Date = new Date(dateA.getTime() + 2 * 24 * 60 * 60 * 1000);

    const testRange: Date[] = [dateA, dateB, dateC];
    const actual: Date = getEarliestDate(testRange);

    const result: string = actual.getTime() === dateA.getTime() ? "Pass" : "Fail";
    return result;
}
