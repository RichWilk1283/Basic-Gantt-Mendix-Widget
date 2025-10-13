import { getEarliestDate } from "./DateHelpers";

export function testRunner(): void {
    console.log(`Test Result for getEarliestDate(): ${getEarliestDateTest()}`);
}

function getEarliestDateTest(): string{
    var dateA: Date = new Date();
    dateA.setHours(0,0,0,0);
    var dateB: Date = new Date(dateA.getTime() + 1 * 24 * 60 * 60 * 1000);
    var dateC: Date = new Date(dateA.getTime() + 2 * 24 * 60 * 60 * 1000);

    var testRange: Date[] = [dateA, dateB, dateC];
    var actual: Date = getEarliestDate(testRange);

    var result: string = actual.getTime() === dateA.getTime() ? "Pass" : "Fail";
    return result;
}
