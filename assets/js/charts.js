import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import pie from './pie_chart.js';
import line_chart from './line_chart.js';
import plot from './scatter_plot.js';
window.onload = () => {
    console.log("Line Chart");
    const chartContainer = document.getElementsByClassName("container")[0];
    d3.csv("assets/datasets/HEALTH_MORTALITY_CLEANED.csv").then(data => {
        chartContainer.appendChild(line_chart(data));
    })
    console.log("Pie Chart");
    d3.csv("assets/datasets/HEALTH_HCQI.csv").then(data => {
        const iterData = []
        const chartContainer = document.getElementsByClassName("container")[1];
        data.map(d => {
            if (iterData.some(e => e.name === d["Indicator"])) {
                iterData.find(e => e.name === d["Indicator"]).value += 1
            } else {
                iterData.push({ name: d["Indicator"], value: 1 })
            }
        })
        chartContainer.appendChild(pie(iterData));
    })
    console.log("Scatter Plot");
    d3.csv("assets/datasets/HEALTH_HCQI.csv").then(data => {
        const chartContainer = document.getElementById("Scatter_Plot");
        chartContainer.appendChild(plot(data));
    })
}
