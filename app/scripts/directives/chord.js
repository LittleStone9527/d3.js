'use strict';

/**
 * @ngdoc directive
 * @name d3jsApp.directive:chord
 * @description
 * # chord
 */
angular.module('d3jsApp')
  .directive('chord', function () {
    return {
      template: '<div></div>',
      restrict: 'EA',
      replace: true,
      link: function postLink(scope, element, attrs) {

        //定义相关变量
        var width = 600;
        var height = 600;
        var innerRadius = width / 2 * 0.7;
        var outerRadius = innerRadius * 1.1;
        var color20 = d3.scale.category20c();

        var svg = d3.select(".body")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        //初始数据
        var city_name = ["北京", "上海", "广州", "深圳", "香港"];

        var population = [
          [1000, 3045, 4567, 1234, 3714],
          [3214, 2000, 2060, 124, 3234],
          [8761, 6545, 3000, 8045, 647],
          [3211, 1067, 3214, 4000, 1006],
          [2146, 1034, 6745, 4764, 5000]
        ];

        //弦图的布局
        var chord_layout = d3.layout.chord()
          .padding(0.03)//节点之间的间隔
          .sortSubgroups(d3.descending)//排序
          .matrix(population);//输入矩阵

        var groups = chord_layout.groups();//点
        var chords = chord_layout.chords();//线

        /*console.log(groups);
         console.log(chords);*/

        //绘制节点
        var outer_arc = d3.svg.arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius);

        var g_outer = svg.append("g");
        g_outer.selectAll("path")
          .data(groups)
          .enter()
          .append("path")
          .style("fill", function(d){ return color20(d.index);})
          .style("stroke", function(d){ return color20(d.index);})
          .attr("d", outer_arc);



      }
    };
  });
