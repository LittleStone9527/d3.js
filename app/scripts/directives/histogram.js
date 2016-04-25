'use strict';

/**
 * @ngdoc directive
 * @name d3jsApp.directive:histogram
 * @description
 * # histogram
 */
angular.module('d3jsApp')
  .directive('histogram', function () {
    return {
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        //画布大小
        var width  = 600;
        var height = 600;
        //添加画布
        var svg = d3.select(".body")
          .append("svg")
          .attr("width", width)
          .attr("height", height);

        //定义画布周边的空白
        var padding = { left:30, right:30, top:20, bottom:20};

        //定义数组
        var myData = [10,20,30,40,23,34,14,4];

        //x轴比例尺
        var xScale = d3.scale.ordinal()
          .domain(d3.range(myData.length))
          .rangeRoundBands([0, width - padding.left - padding.right]);//接收一个最小值和一个最大值，然后根据输入值域的长度自动将其切分成相等的块

        //y轴比例尺
        var yScale = d3.scale.linear()
          .domain([0, d3.max(myData)])
          .range([height - padding.top - padding.bottom, 0]);

        //定义x轴
        var xAxis = d3.svg.axis()
          .scale(xScale)
          .orient("bottom");//x 轴刻度的方向向下

        //定义y轴
        var yAxis = d3.svg.axis()
          .scale(yScale)
          .orient("left");//y 轴的向左

        //添加x轴
        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate("+ padding.left + "," + (height - padding.bottom)+")")
          .call(xAxis);

        //添加y轴
        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + padding.left + "," + padding.top+")")
          .call(yAxis);

        //添加矩形之间的空白
        var rectPadding = 4;
        //添加矩形
        var rect = svg.selectAll(".MyRect")
          .data(myData)
          .enter()
          .append("rect")
          .attr("class", "MyRect")
          .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
          .attr("x", function(d,i){
            return xScale(i) + rectPadding/2
          })
          .attr("y", function(d){
            return yScale(d);
          })
          .attr("width", xScale.rangeBand() - rectPadding)
          .attr("height", function(d){
            return height - padding.top - padding.bottom-yScale(d);
          });

      }
    };
  });
