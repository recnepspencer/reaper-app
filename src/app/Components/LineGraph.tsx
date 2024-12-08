import React from "react";
import Plot from "react-plotly.js";

interface LineGraphProps {
    data: any;
    layout: any;
}

class LineGraph extends React.Component {
    render() {
        return (
            <Plot
                data={this.props.data}
                layout={this.props.layout}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
            />
        );
    }
}