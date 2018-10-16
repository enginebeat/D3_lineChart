
var tData = [];

for(var i = 0; i <= 20; i++){
    tData.push({sampleNumber: i, sampleValue: Math.round( Math.random() * 10 ) });
}
//console.log(tData);

var tData1 = [];

for(var i = 0; i <= 20; i++){
    tData1.push({sampleNumber: i, sampleValue: Math.round( Math.random() * 10 ) });
}


/* 
    Loading Data from the API When DOM Content has been loaded
*/ 

document.addEventListener("DOMContentLoaded", (event) => {
    
    console.log(tData);
    drawChart(tData, tData1);
    //drawChart(parsedData);
        
});

function drawChart(data, data1) {
    var svgWidth = 700, svgHeight = 500;
    var margin = { top: 20, right: 20, bottom: 30, left: 50};
    var width = svgWidth - margin.left -margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var graph1 = d3.select('#graph1')
        .append('svg')
        .attr('class', 'svg1');

    graph1  .attr('width', svgWidth)    // setting size of the svg window by giving the container width & height
            .attr('height', svgHeight);

    var svg = d3.select('.svg1');

    /*
    var svg = d3.select('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);
    */
    
    var g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var x = d3.scaleLinear()
        .rangeRound([0, width]);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var line = d3.line()
        .x((d) => { return x(d.sampleNumber) })
        .y((d) => { return y(d.sampleValue) })
        //x.domain(d3.extent(data, (d) => { return d.sampleNumber }));    //extent returns the min and max value to create the scales.
        //y.domain(d3.extent(data, (d) => { return d.sampleValue }));

    var line1 = d3.line()
        .x((d) => { return x(d.sampleNumber) })
        .y((d) => { return y(d.sampleValue) })
        //x.domain(d3.extent(data1, (d) => { return d.sampleNumber }));    //extent returns the min and max value to create the scales.
        //y.domain(d3.extent(data1, (d) => { return d.sampleValue }));


    var allValues = data.concat(data1);
    console.log(allValues);
    x.domain(d3.extent(allValues, (d) => { return d.sampleNumber }));    //extent returns the min and max value to create the scales.
    y.domain(d3.extent(allValues, (d) => { return d.sampleValue }));

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

    g.append('path')
        .datum(data1)
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5)
        .attr('d', line1);
}

