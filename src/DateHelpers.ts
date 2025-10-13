
export function getDateRange(startingDate: Date, endingDate: Date): Date[] {
    const dates: Date[] = [];
    const currentDate = new Date(startingDate);
    currentDate.setHours(0,0,0,0);

    while (currentDate <= endingDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

export function getEarliestDate(dateRange: Date[]): Date {
    const earliestDate = dateRange.length > 0
    ? new Date(Math.min(...dateRange.map(event => event.getTime())))
    : new Date();

    return earliestDate;
}

export function getLatestDate(dateRange: Date[]): Date {
    const latestDate = dateRange.length > 0
    ? new Date(Math.max(...dateRange.map(event => event.getTime())))
    : new Date();

    return latestDate;
}

export function getDayOffset(startDate: Date, endDate: Date, inclusive: boolean = false): number {
    const start = new Date(startDate);
    start.setHours(0,0,0,0);
    const end = new Date(endDate);
    end.setHours(0,0,0,0);

    const diffInMs = end.getTime() - start.getTime();

    const diffDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return inclusive ? diffDays + 1 : diffDays;
}

export function formatDate(date: Date) {
    const month = (date.getMonth() + 1);
    const day = date.getDate()
    const year = date.getFullYear();

    return [day, month, year].join('/');
}