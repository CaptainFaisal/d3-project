import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
window.onload = () => {

    const chartContainer = document.getElementById("chart");
    d3.csv("assets/datasets/HEALTH_MORTALITY_CLEANED.csv").then(data => {
        chartContainer.appendChild(chart(data));
    })
}

const chart = (aapl) => {
    // Declare the chart dimensions and margins.
    const width = 928;
    const height = 500;
    const marginTop = 20;
    const marginRight = 30;
    const marginBottom = 30;
    const marginLeft = 40;

    // Declare the x (horizontal position) scale.
    const x = d3.scaleUtc(d3.extent(aapl, d => d["Week number"]), [marginLeft, width - marginRight]);

    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear([0, d3.max(aapl, d => d["Value"])], [height - marginBottom, marginTop]);

    // Declare the line generator.
    const line = d3.line()
        .x(d => x(d["Week number"]))
        .y(d => y(d["Value"]));

    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    // Add the x-axis.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    // Add the y-axis, remove the domain line, add grid lines and a label.
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).ticks(height / 40))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("Health Mortality Rate"));

    // Append a path for the line.
    svg.append("path")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line(aapl));

    return svg.node();
}