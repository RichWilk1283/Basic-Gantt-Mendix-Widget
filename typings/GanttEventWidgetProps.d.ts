/**
 * This file was generated from GanttEventWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ListValue, ListAttributeValue } from "mendix";

export interface GanttEventWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    data: ListValue;
    nameAttribute?: ListAttributeValue<string>;
    colourAttribute?: ListAttributeValue<string>;
    startDateAttribute?: ListAttributeValue<Date>;
    endDateAttribute?: ListAttributeValue<Date>;
    myBoolean: boolean;
}

export interface GanttEventWidgetPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    data: {} | { caption: string } | { type: string } | null;
    nameAttribute: string;
    colourAttribute: string;
    startDateAttribute: string;
    endDateAttribute: string;
    myBoolean: boolean;
}
