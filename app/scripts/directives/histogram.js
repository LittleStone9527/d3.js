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
        //var svg = d3.select(".body")
        var svg = d3.select(element[0])
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
          //.attr("class", "MyRect")
          .attr("fill", "steelblue")//如果添加交互，填充的颜色不要写在css里面
          .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
          .attr("x", function(d,i){
            return xScale(i) + rectPadding/2
          })
          .attr("width", xScale.rangeBand() - rectPadding)

          //添加交互效果
          .on("mouseover",function(d,i){
            d3.select(this)
              .attr("fill","yellowgreen");
          })
          .on("mouseout",function(d,i){
            d3.select(this)
              .transition()
              .duration(500)
              .attr("fill","steelblue");
          })

          //加入过渡效果，设置开始位置为最小值
          .attr("y", function(d){
            var minPos = yScale.domain()[0];
            return yScale(minPos);
          })
          //设置最小高度为 0
          .attr("height", function(d){
            return 0;
          })
        //此处开始添加过渡动画效果
          .transition()
          .duration(2000)
          .delay(function(d,i){
            return i * 200;
          })
          .ease("bounce")
          .attr("y", function(d){
            return yScale(d);
          })
          .attr("height", function(d){
            return height - padding.top - padding.bottom - yScale(d);
          });

        //添加文字
        var texts = svg.selectAll(".MyText")
          .data(myData)
          .enter()
          .append("text")
          .attr("class", "MyText")
          .attr("transform", "translate(" + 0 + "," + padding.top + ")")
          .attr("x", function(d, i){
            return xScale(i) + rectPadding/2;
          })

          //开始时设置文字的开始位置为最小值
          .attr("y", function(d){
            var minPos = yScale.domain()[0];
            return yScale(minPos);
          })
          .attr("dx", function(){
            return (xScale.rangeBand() - rectPadding/2);
          })
          .attr("dy", function(d){
            return 20;
          })
          .text(function(d){
            return d;
          })
          .transition()
          .delay(function(d, i){
            return i * 200;
          })
          .duration(2000)
          .ease("bounce")
          .attr("y", function(d){
            return yScale(d);
          });
      }
    };
  });
