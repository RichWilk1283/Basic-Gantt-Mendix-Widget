import { ReactElement, createElement, useState, useEffect } from "react";
import { GanttEventWidgetContainerProps } from "../typings/GanttEventWidgetProps";
import { getDateRange, getDayOffset, formatDate } from "./DateHelpers";
import { testRunner } from "./DateHelpersUTests";

import "./ui/GanttEventWidget.css";

interface Event {
    name: string;
    colour: string;
    startDate: Date;
    endDate: Date;
    daysDuration: number;
}

export function GanttEventWidget({ data, nameAttribute, colourAttribute, startDateAttribute, endDateAttribute, myBoolean } : GanttEventWidgetContainerProps): ReactElement {
    const runUnitTests: boolean = true;
    const consoleLogging: boolean = true;

    if (runUnitTests === true){
        testRunner();
    }

    const darkModeSetting: string = myBoolean ? "Dark" : "Light";
    const darkModeBackgroundColour: string = myBoolean ? "black" : "white";
    const darkModeTextColour: string = myBoolean ? "white" : "black";

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
    
    const datesArray = getDateRange(earliestDate, latestDate);

    //Test console logs.
    if (consoleLogging === true){
        console.log("eventsArray: ", eventsArray);
    }
    //Test console logs.

    return (
        <div>
            <div className="darkmode-banner" style={{backgroundColor: darkModeBackgroundColour}}>
                <p style={{color: darkModeTextColour}}>Current Dark Mode Setting: {darkModeSetting}</p>
            </div>
            <table className="gantt-table">
                <thead>
                    <tr>
                        <th className="first-col">Name:</th>
                        {datesArray.map((d, index) => {
                            return (
                                <th className="sideways-text normal-col" key={index}>
                                    {formatDate(d)}
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
                                <td className="first-col">{e.name}</td>
                                {Array.from({length: offset}).map((_, i) => (
                                    <td className="normal-col" key={`empty-${i}`} />
                                ))}
                                <td key={rowIndex} colSpan={e.daysDuration} style={{backgroundColor: e.colour}} className="gantt-event-cell normal-col">
                                    Name: {e.name}
                                </td>
                                {Array.from({length: datesArray.length - offset - e.daysDuration}).map((_, i) => (
                                    <td className="normal-col" key={`post-${i}`} />
                                ))}
                            </tr>                            
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}