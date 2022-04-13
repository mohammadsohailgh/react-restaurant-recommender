import React from 'react'

function RadarChart() {

    var w = 450;
var h = 300;
var radius = 100;

var interpStyleNum = 0;

var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("class", "svg");

var coordinates = new Array();

for (var i = 0; i < 6; i++){
var coord = {};
coord.x = w/3 + radius * Math.cos(2 * Math.PI * i / 6);
coord.y = h/2 + radius * Math.sin(2 * Math.PI * i / 6);   
coordinates.push(coord);

//add some labels
var textcoord = {};
textcoord.x = w/3 + (radius + 20) * Math.cos(2 * Math.PI * i / 6);
textcoord.y = h/2 + (radius + 20) * Math.sin(2 * Math.PI * i / 6); 


var axisText = svg.append("text")
  .text(i)
  .attr("x", textcoord.x)
  .attr("y", textcoord.y)
  .attr("dy", 4)
  .attr("text-anchor", "middle")
  .style("font-family", "Kotta One");
}

var axes = new Array();
var points = new Array();
var lineLengthsEl = new Array();




//draw axes from which we can calculate line points
for (var i = 0; i < coordinates.length; i++){
axes[i] = svg.append("path")
                            .attr("d", "M " + w/3 + " " + h/2 + " L " + coordinates[i].x + " " + coordinates[i].y + "")
                            .attr("stroke", "grey")
                            .attr("stroke-width", 2)
                            .attr("fill", "none");

lineLengthsEl[i] = axes[i].node();

        }

var lineLengths = lineLengthsEl[0].getTotalLength();

//variables
var myVariables = new Array();

   for (var i = 0; i < axes.length; i++) {
       myVariables[i] = roundNumber();
   }


//get points on each line
for (var i = 0; i < axes.length; i++){
      points[i] = new Array();
    for (var j = 0; j <5; j++){
    points[i].push(lineLengthsEl[i].getPointAtLength(j*lineLengths/5));
    }
}



var path = svg.append("path")
.data([[[points[0][myVariables[0]].x, points[0][myVariables[0]].y],
           [points[1][myVariables[1]].x, points[1][myVariables[1]].y],
           [points[2][myVariables[2]].x, points[2][myVariables[2]].y],
           [points[3][myVariables[3]].x, points[3][myVariables[3]].y],
           [points[4][myVariables[4]].x, points[4][myVariables[4]].y],
           [points[5][myVariables[5]].x, points[5][myVariables[5]].y]]])
    .attr("d", d3.svg.line()
    .interpolate("cardinal-closed"))
    .attr("stroke", "#E63995")
    .attr("stroke-width", "2")
    .attr("fill", "#E63995")
    .style("opacity", 0.75);

var buttonBackground = svg.append("rect")
                          .attr("x", 300)
                          .attr("y", 30)
                          .attr("width", 145)
                          .attr("height", 165)
                          .style("fill", "#E1F2F2");

var interpButtonBackground = svg.append("rect")
                          .attr("x", 300)
                          .attr("y", 210)
                          .attr("width", 145)
                          .attr("height", 90)
                          .style("fill", "#E1F2F2");

var cardButton = svg.append("rect")
                          .attr("x", 310)
                          .attr("y", 220)
                          .attr("width", 125)
                          .attr("height", 20)
                          .style("fill", "#15A3BF");

                            svg.append("text")
                            .text("Cardinal")
                            .attr("x", 310+125/2)
                            .attr("y", 220+15)
                            .attr("text-anchor", "middle")
                            .attr("fill", "white");
                          
                          svg.append("rect")
                          .attr("x", 310)
                          .attr("y", 220)
                          .attr("width", 125)
                          .attr("height", 20)
                          .attr("opacity", 0)
                          .on("click", function (){
                            interpStyleNum = 0;
                            update(points, 0, interpStyleNum);
                        });

var basButton = svg.append("rect")
                          .attr("x", 310)
                          .attr("y", 245)
                          .attr("width", 125)
                          .attr("height", 20)
                          .style("fill", "#15A3BF");

                            svg.append("text")
                            .text("Basis")
                            .attr("x", 310+125/2)
                            .attr("y", 245+15)
                            .attr("text-anchor", "middle")
                            .attr("fill", "white");
                          
                          svg.append("rect")
                          .attr("x", 310)
                          .attr("y", 245)
                          .attr("width", 125)
                          .attr("height", 20)
                          .attr("opacity", 0)
                          .on("click", function (){
                            interpStyleNum = 1;
                            update(points, 0, interpStyleNum);
                        });

var linButton = svg.append("rect")
                          .attr("x", 310)
                          .attr("y", 270)
                          .attr("width", 125)
                          .attr("height", 20)
                          .style("fill", "#15A3BF");

                            svg.append("text")
                            .text("Linear")
                            .attr("x", 310+125/2)
                            .attr("y", 270+15)
                            .attr("text-anchor", "middle")
                            .attr("fill", "white");
                          
                          svg.append("rect")
                          .attr("x", 310)
                          .attr("y", 270)
                          .attr("width", 125)
                          .attr("height", 20)
                          .attr("opacity", 0)
                          .on("click", function (){
                            interpStyleNum = 2;
                            update(points, 0, interpStyleNum);
                        });





  var theNumPlus = new Array();
  var theNumMinus = new Array();

//make buttons
for (var i = 0; i < axes.length; i++){
    makeplusbutton(i);
    makeminusbutton(i);
    maketext(i);
}
//run initial test
for (var i = 0; i < axes.length; i++){
  update(points, i, interpStyleNum)
}



function maketext(theNum){

                        svg.append("text")
                            .text("value " + i)
                            .attr("x", 370)
                            .attr("y", theNum * 25 + 54)
                            .style("font-family", "Kotta One")
                            .attr("fill", "grey");

}

function makeplusbutton(theNum){
                     theNumPlus[theNum] = svg.append("circle")
                        .attr("cx", 350)
                        .attr("cy", theNum * 25 + 50)
                        .attr("r", 8)
                        .attr("fill", "#76EEAE")
                        .attr("stroke", "#4BC986");

                      var uptext =  svg.append("text")
                            .text("+")
                            .attr("x", 350)
                            .attr("y", theNum * 25 + 54)
                            .attr("text-anchor", "middle")
                            .attr("fill", "white");

                        svg.append("circle")
                        .attr("cx", 350)
                        .attr("cy", theNum * 25 + 50)
                        .attr("r", 8)
                        .attr("opacity", 0)
                        .on("click", function (){
                            if(myVariables[theNum] < 4){
                            myVariables[theNum]++;
                        } 
                            update(points, theNum, interpStyleNum);});
}

function makeminusbutton(theNum){
                       theNumMinus[theNum] = svg.append("circle")
                        .attr("cx", 325)
                        .attr("cy", theNum * 25 + 50)
                        .attr("r", 8)
                        .attr("fill", "#EE7678")
                        .attr("stroke", "#ED474A");

                 var downtext = svg.append("text")
                            .text("-")
                            .attr("x", 325)
                            .attr("y", theNum * 25 + 54)
                            .attr("text-anchor", "middle")
                            .attr("fill", "white");

                            svg.append("circle")
                        .attr("cx", 325)
                        .attr("cy", theNum * 25 + 50)
                        .attr("r", 8)
                        .attr("opacity", 0)
                        .on("click", function (){
                            if(myVariables[theNum] > 0){
                            myVariables[theNum]--;
                        } 
                            update(points, theNum, interpStyleNum);});
}

function update(data, myNum, interpStyle) {
  if (interpStyle == 0){
    path.data([[[points[0][myVariables[0]].x, points[0][myVariables[0]].y],
           [points[1][myVariables[1]].x, points[1][myVariables[1]].y],
           [points[2][myVariables[2]].x, points[2][myVariables[2]].y],
           [points[3][myVariables[3]].x, points[3][myVariables[3]].y],
           [points[4][myVariables[4]].x, points[4][myVariables[4]].y],
           [points[5][myVariables[5]].x, points[5][myVariables[5]].y]]])
            .transition()
            .attr("d", d3.svg.line()
            .interpolate("cardinal-closed"));

            cardButton.transition()
                      .style("fill", "#777");
            basButton.transition()
                      .style("fill", "#15A3BF");
            linButton.transition()
                      .style("fill", "#15A3BF");


    } else if (interpStyle == 1){ 
       path.data([[[points[0][myVariables[0]].x, points[0][myVariables[0]].y],
           [points[1][myVariables[1]].x, points[1][myVariables[1]].y],
           [points[2][myVariables[2]].x, points[2][myVariables[2]].y],
           [points[3][myVariables[3]].x, points[3][myVariables[3]].y],
           [points[4][myVariables[4]].x, points[4][myVariables[4]].y],
           [points[5][myVariables[5]].x, points[5][myVariables[5]].y]]])
            .transition()
            .attr("d", d3.svg.line()
            .interpolate("basis-closed"));

                        cardButton.transition()
                      .style("fill", "#15A3BF");
            basButton.transition()
                      .style("fill", "#777");
            linButton.transition()
                      .style("fill", "#15A3BF");

    } else {
        path.data([[[points[0][myVariables[0]].x, points[0][myVariables[0]].y],
           [points[1][myVariables[1]].x, points[1][myVariables[1]].y],
           [points[2][myVariables[2]].x, points[2][myVariables[2]].y],
           [points[3][myVariables[3]].x, points[3][myVariables[3]].y],
           [points[4][myVariables[4]].x, points[4][myVariables[4]].y],
           [points[5][myVariables[5]].x, points[5][myVariables[5]].y]]])
            .transition()
            .attr("d", d3.svg.line()
            .interpolate("linear"));

                                    cardButton.transition()
                      .style("fill", "#15A3BF");
            basButton.transition()
                      .style("fill", "#15A3BF");
            linButton.transition()
                      .style("fill", "#777");

    }

            if (myVariables[myNum] <= 0){
              theNumMinus[myNum].transition()
                                .attr("fill", "#777")
                                .attr("stroke", "#999");
            } else {
             theNumMinus[myNum].transition()
                        .attr("fill", "#EE7678")
                        .attr("stroke", "#ED474A"); 
            }

                        if (myVariables[myNum] >= 4){
              theNumPlus[myNum].transition()
                                .attr("fill", "#777")
                                .attr("stroke", "#999");
            } else {
             theNumPlus[myNum].transition()
                        .attr("fill", "#76EEAE")
                        .attr("stroke", "#4BC986");
            }
}

function roundNumber(){
 return Math.round(Math.random()*4);
}

  return (
    <div>RadarChart</div>
  )
}

export default RadarChart