'use strict';

/**
 * @ngdoc directive
 * @name d3jsApp.directive:cluster
 * @description
 * # cluster
 */
angular.module('d3jsApp')
  .directive('cluster', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      replace: 'true',
      link: function postLink(scope, element, attrs) {
        var width = 600;
        var height = 600;

        //var svg = d3.select(".body")
        var svg = d3.select(element[0])
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(40, 0)");

        var cluster = d3.layout.cluster()
          .size([width, height - 200]);
        var diagonal = d3.svg.diagonal().projection(function () {
          return [dy, dx]
        });

        d3.json("city.json", function (error, root) {
          var nodes = cluster.nodes(root);
          var links = cluster.links(nodes);

          var link = svg.selectAll(".link")
            .data(links)
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", diagonal);

          var node = svg.selectAll(".node")
            .data(links)
            .enter()
            .attr("class", "node")
            .attr("transform", function (d) {
              return "translate(" + d.y + "," + "d.x" + ")";
            });

          node.append("circle")
            .attr("r", 4.5);

          node.append("text")
            .attr("dx", function (d) {
              return d.children ? -8 : 8
            })
            .attr("dy", 3)
            .style("text-anchor", function (d) {
              return d.children ? "end" : "start";
            })
            .text(function (d) {
              return d.name
            });

        });

      }
    };
  });
