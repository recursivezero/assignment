const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const projection = d3.geoMercator()
    .center([78.9629, 22.5937])
    .scale(1000)
    .translate([window.innerWidth / 2, window.innerHeight / 2]);

const path = d3.geoPath().projection(projection);

d3.json("data/india_state_geo.json").then(function(data) {
    svg.selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "state");
});
