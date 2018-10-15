const api = 'https://api.coindesk.com/v1/bpi/historical/close.json7start=2017-12-31&end=2018-04-01';

/* 
    Loading Data from the API When DOM Content has been loaded
*/ 

document.addEventListener("DOMContentLoaded", (event) => {
    fetch(api)
        .then((response) => { return response.json(); })
        .then((data) => {
            console.log(data);
            var parsedData = parseData(data);
            console.log(parsedData);
            drawChart(parsedData);
        })
        .catch((err) => { console.log(err); })
});


function parseData(data) {
    var arr = [];
    for (var i in data.bpi) {
        arr.push({
            date: new Date(i), //Date
            value: +data.bpi[i] // convert string to number
        });
    }
    console.log(arr);
    return arr;
}

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

    var x = d3.scaleTime()
        .rangeRound([0, width]);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var line = d3.line()
        .x((d) => { return x(d.date) })
        .y((d) => { return y(d.value) })
        x.domain(d3.extent(data, (d) => { return d.date }));    //extent returns the min and max value to create the scales.
        y.domain(d3.extent(data, (d) => { return d.value }));

    g.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x))
        .select('.domain')
        .remove();

    g.append('g')
        .call(d3.axisLeft(y))
        .append('text')
        .attr('fill', '#000')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.7em')
        .attr('text-anchor', 'end')
        .text('Price ($)');

    g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5)
        .attr('d', line);

    
}

