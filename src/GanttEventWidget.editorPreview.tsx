import { ReactElement, createElement } from "react";
import { GanttEventWidgetPreviewProps } from "../typings/GanttEventWidgetProps";

export function preview({ }: GanttEventWidgetPreviewProps): ReactElement {
return (
        <div style={{ display: "flex", flexDirection: "row", overflowX: "auto" }}>
            {Array.from({ length: 30 }, (_, i) => i).map(i => (
                <div
                    key={i}
                    style={{
                        backgroundColor: "lightgrey",
                        width: "30px",
                        height: "30px",
                        margin: "2px",
                        textAlign: "center",
                        lineHeight: "30px",
                        border: "1px solid #ccc"
                    }}
                >
                    {i + 1}
                </div>
            ))}
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/GanttEventWidget.css");
}
