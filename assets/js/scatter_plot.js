import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
const plot = (data) => {

    // Specify the chart’s dimensions.
    const width = 928;
    const height = 600;
    const marginTop = 20;
    const marginRight = 30;
    const marginBottom = 30;
    const marginLeft = 40;
    // Create the horizontal (x) scale, positioning N/A values on the left margin.
    const uniqueIndicators = [...new Set(data.map(d => d["Indicator"]))];
    const x = d3.scalePoint()
        .domain(uniqueIndicators)
        .range([0, uniqueIndicators.length*10])
    // Create the vertical (y) scale, positioning N/A values on the bottom margin.
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d["Value"])]).nice()
        .range([height - marginBottom, marginTop])
        .unknown(height - marginBottom);
  
    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height])
        .property("value", []);
  
    // Append the axes.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("x", width - marginRight)
            .attr("y", -4)
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "end")
            .text("Indicators"));
  
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove())
        .call(g => g.select(".tick:last-of-type text").clone()
            .attr("x", 4)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text("Rates"));
  
    // Append the dots.
    const dot = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(data)
      .join("circle")
        .attr("transform", d => `translate(${x(d["Indicator"])},${y(d["Value"])})`)
        .attr("r", 3);
  
    return svg.node();
  }
export default plot;