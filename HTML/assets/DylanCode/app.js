var svgWidth = 1000;
var svgHeight = 400;
// 960 and 600, respectively

var margin = {
    top: 50,
    right: 40,
    bottom: 90,
    left: 100
  };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg3 = d3
  .select("#scatter3")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup3 = svg3.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Initialize default axis Parameters
var chosenXAxis3 = "poverty";
var chosenYAxis3 = "obesity"


// pull in data
d3.csv("assets/DylanCode/assets/data/mergedata2.csv")
  .then(function(data) {

    data.forEach(function(data) {
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
      data.abbr = data.abbr;
      data.state = data.state;
      console.log(data.healthcare);
    });

    // Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(data, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([4, d3.max(data, d => d.healthcare)])
      .range([height, 0]);

    // Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
    // ==============================
    chartGroup3.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup3.append("g")
      .call(leftAxis);

    //  Create Circles
    // ==============================
    var circlesGroup3 = chartGroup3.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".8")

    // Create text labels for circles
    var textGroup3 = chartGroup3.selectAll(".label")
     .data(data)
     .enter()
     .append("text")
     .attr("class", "label")
     .attr("text-anchor", "middle")
     .text(function(d) {return d.abbr;})
     .attr("x", d => xLinearScale(d.poverty))
     .attr("y", d => yLinearScale(d.healthcare)+6)
     .attr("fill", "white")
     .attr("font-size", "12px")
     .attr("font-family","Arial");
  
    // Initialize tool tip... not sure if I need this
    // ==============================
   var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([25, 0])
      .html(function(d) {
        return (`${d.abbr}`);
      });

    // Create tooltip in the chart
    // ==============================
     chartGroup3.call(toolTip);

    // Create event listeners to display and hide the tooltip... not sure if I need this
    // ==============================
    circlesGroup3.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

    // Create axes labels
    chartGroup3.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup3.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top })`)
      .attr("class", "axisText")
      .text("Poverty (%)");
  });

