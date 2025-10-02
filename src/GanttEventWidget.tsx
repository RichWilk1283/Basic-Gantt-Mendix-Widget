import { ReactElement, createElement, useState, useEffect } from "react";
import { GanttEventWidgetContainerProps } from "../typings/GanttEventWidgetProps";

import "./ui/GanttEventWidget.css";

interface Event {
    name: string;
    colour: string;
    startDate: Date;
    endDate: Date;
    daysDuration: number;
}

function getDateRange(startingDate: Date, endingDate: Date): Date[] {
    const dates: Date[] = [];
    const currentDate = new Date(startingDate);
    currentDate.setHours(0,0,0,0);

    while (currentDate <= endingDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

function getDayOffset(startDate: Date, endDate: Date, inclusive: boolean = false): number {
    const start = new Date(startDate);
    start.setHours(0,0,0,0);
    const end = new Date(endDate);
    end.setHours(0,0,0,0);

    const diffInMs = end.getTime() - start.getTime();

    const diffDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return inclusive ? diffDays + 1 : diffDays;
}

export function GanttEventWidget({ data, nameAttribute, colourAttribute, startDateAttribute, endDateAttribute } : GanttEventWidgetContainerProps): ReactElement {
    //const eventArrayRaw = data.items;
    const [eventsArray, setEventsArray] = useState<Event[]>([]);

    useEffect (() => {
        if (data.items && nameAttribute && colourAttribute && startDateAttribute && endDateAttribute && data.status === "available") {
            const fetchedEvents: Event[] = data.items
            .map( event => {
                const name = nameAttribute.get(event).value;
                const colour = colourAttribute.get(event).value;
                const startDate = startDateAttribute.get(event).value;
                const endDate = endDateAttribute.get(event).value;

                if (name && colour && startDate && endDate){
                    return {
                        name,
                        colour,
                        startDate: new Date(startDate),
                        endDate: new Date(endDate),
                        daysDuration: getDayOffset(startDate, endDate, true)
                    };
                }
                return null;
            })
            .filter((event) : event is Event => event !== null);
            setEventsArray(fetchedEvents);
        } else {
            setEventsArray([]);
        }
    }, [data, nameAttribute, colourAttribute, startDateAttribute, endDateAttribute]);

    const earliestDate = eventsArray.length > 0
        ? new Date(Math.min(...eventsArray.map(event => event.startDate.getTime())))
        : new Date();
    
    const latestDate = eventsArray.length > 0
        ? new Date(Math.max(...eventsArray.map(event => event.endDate.getTime())))
        : new Date();
    
    //const daysBetweenCalc = Math.abs(earliestDate.getTime() - latestDate.getTime()); //Should not need this now as getDateRange gives an array and array.length would give an appropriate count also.
    //const daysBetween = Math.ceil(daysBetweenCalc / (1000 * 3600 * 24)); //Should not need this now as getDateRange gives an array and array.length would give an appropriate count also.
    const datesArray = getDateRange(earliestDate, latestDate);

    
    //Testing console logs.
    //console.log("eventArrayRaw: ", eventArrayRaw);
    console.log("eventsArray: ", eventsArray);
    //Testing console logs.

    return (
        <div>
            <p>1st Date: {earliestDate.toDateString()}</p>
            <p>Last Date: {latestDate.toDateString()}</p>
            <p>Length of date array {datesArray.length}</p>
            <table className="gantt-table">
                <thead>
                    <tr>
                        <th>Name:</th>
                        {datesArray.map((d, index) => {
                            return (
                                <th key={index}>
                                    {d.toDateString()}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {eventsArray.map((e, rowIndex) => {
                        const offset = getDayOffset(earliestDate, e.startDate);
                        return (
                            <tr key={rowIndex}>
                                <td>{e.name}</td>
                                {Array.from({length: offset}).map((_, i) => (
                                    <td key={`empty-${i}`} />
                                ))}
                                <td key={rowIndex} colSpan={e.daysDuration} style={{backgroundColor: e.colour}} className="gantt-event-cell">
                                    Name: {e.name}, Offset:{offset}.
                                </td>
                                {Array.from({length: datesArray.length - offset - e.daysDuration}).map((_, i) => (
                                    <td key={`post-${i}`} />
                                ))}
                            </tr>                            
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}
//  style={{backgroundColor: "green"}
                                // <td>{e.name}</td>
                                // <td>Offset: {e.daysDuration}</td>
                                // <td>{e.startDate.toUTCString()}</td>
                                // <td>{e.endDate.toUTCString()}</td>