'use strict';

/**
 * @ngdoc directive
 * @name d3jsApp.directive:axis
 * @description
 * # axis
 */
angular.module('d3jsApp')
  .directive('axis', function () {
    return {
      restrict: 'EA',
      link: function (scope, element, attrs) {
        //定义画布尺寸并且添加画布
        var width = 800;
        var height = 400;
        //var svg = d3.select(".body")
        var svg = d3.select(element[0])
          .append("svg")
          .attr("width", width)
          .attr("height", height);

        //定义数据
        var myData = [2.5, 2.1, 1.7, 1.3, 0.9];
        //定义线性比例尺
        var linear = d3.scale.linear()
          .domain([0, d3.max(myData)])
          .range([0, 250]);

        var rectHeight = 25;//每个矩形所占的像素高度（包括空白）
        svg.selectAll("rect")
          .data(myData)
          .enter()
            .append("rect")
            .attr("x", 20)
            .attr("y", function(d, i){
              return i*rectHeight;
            })
            .attr("width", function(d){
              return linear(d)
            })
            .attr("height", rectHeight - 2)
            .attr("fill", "lightblue");

        var axis = d3.svg.axis()//D3的坐标轴组件，能在svg中生成坐标轴
          .scale(linear)//使用定义好的比例尺
          .orient("bottom")//定义刻度的方向
          .ticks(7);//指定刻度的数量

        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(20,130)")
          .call(axis);
      }
    };
  });
