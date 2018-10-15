
var tData = [];

for(var i = 0; i <= 20; i++){
    tData.push({sampleNumber: i, sampleValue: Math.round( Math.random() * 10 ) });
}
//console.log(tData);


/* 
    Loading Data from the API When DOM Content has been loaded
*/ 

document.addEventListener("DOMContentLoaded", (event) => {
    
    console.log(tData);
    drawChart(tData);
    //drawChart(parsedData);
        
});

function drawChart(data) {
    var svgWidth = 600, svgHeight = 400;
    var margin = { top: 20, right: 20, bottom: 30, left: 50};
    var width = svgWidth - margin.left -margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svg = d3.select('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);
    
    var g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var x = d3.scaleLinear()
        .rangeRound([0, width]);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var line = d3.line()
        .x((d) => { return x(d.sampleNumber) })
        .y((d) => { return y(d.sampleValue) })
        x.domain(d3.extent(data, (d) => { return d.sampleNumber }));    //extent returns the min and max value to create the scales.
        y.domain(d3.extent(data, (d) => { return d.sampleValue }));

    g.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x))
        .select('.domain');
        //.remove();

    g.append('g')
        .call(d3.axisLeft(y))
        .append('text')
        .attr('fill', '#000')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.7em')
        .attr('text-anchor', 'end')
        .text('Value (A)');

    g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5)
        .attr('d', line);

}