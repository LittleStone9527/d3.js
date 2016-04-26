'use strict';

/**
 * @ngdoc directive
 * @name d3jsApp.directive:pie
 * @description
 * # pie
 */
angular.module('d3jsApp')
  .directive('pie', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        //设置画布宽度和高度
        var width = 600;
        var height = 600;

        //设置数据源
        var myData = [ 30 , 10 , 43 , 55 , 13 ];

        //svg
        //var svg = d3.select(".body")
        var svg = d3.select(element[0])
          .append("svg")
          .attr("width", width)
          .attr("height", height);

        //定义一个布局
        var pie = d3.layout.pie();

        //将数据作为pie的参数，并且将返回值（经pie转换后的数据)赋值给pieData
        var pieData = pie(myData);

        //开始绘制
        var outerRadius = 200;//外径
        var innerRadius = 0;//内径，为0时中间没有空白
        var arc = d3.svg.arc()//弧生成器
          .innerRadius(innerRadius)//设置内径
          .outerRadius(outerRadius);//设置外径

        //定义一个颜色比例尺，它能根据传入的索引号获取相应的颜色值
        var color = d3.scale.category20c();

        //在 <svg> 里添加足够数量的分组元素（g），每一个分组用于存放一段弧的相关元素
        var arcs = svg.selectAll("g")
          .data(pieData)
          .enter()
          .append("g")
          .attr("transform", "translate("+width/2+","+(width/2) +")");

        //添加<path>
        arcs.append("path")
          .attr("fill", function(d, i){
            return color(i);
          })
          .attr("d", function(d){
            return arc(d);
          });

        //在每一个弧线中心添加比例尺
        arcs.append("text")
          .attr("transform", function(d){
            return "translate("+arc.centroid(d)+")"
          })
          .attr("class", "MyText")
          .text(function(d){
            return d.data;
          });
      }
    };
  });
