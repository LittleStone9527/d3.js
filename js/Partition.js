var width = 960,
    height = 700,
    radius = Math.min(width, height) / 2;

var x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

var y = d3.scale.linear()
    .range([0, radius]);

var color = d3.scale.category20c();

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

var partition = d3.layout.partition()
    .value(function(d) { return d.size; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

d3.json("flare.json", function(error, root) {
  var g = svg.selectAll("g")
      .data(partition.nodes(root))
    .enter().append("g")

    //添加鼠标移入，移除操作
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseout", mouseout)

    //鼠标移入变为手型
    .style("cursor", "pointer");

  var path = g.append("path")
    .attr("d", arc)
    .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
    .on("click", click);

  var text = g.append("text")
    .attr("transform", function(d) { return "rotate(" + computeTextRotation(d) + ")"; })
    .attr("x", function(d) { return y(d.y); })
    .attr("dx", "6") // margin
    .attr("dy", ".35em") // vertical-align
    .text(function(d) { return d.name; });

  function click(d) {
    // fade out all text elements
    text.transition().attr("opacity", 0);

    path.transition()
      .duration(750)
      .attrTween("d", arcTween(d))
      .each("end", function(e, i) {
          // check if the animated element's data e lies within the visible angle span given in d
          if (e.x >= d.x && e.x < (d.x + d.dx)) {
            // get a selection of the associated text element
            var arcText = d3.select(this.parentNode).select("text");
            // fade in the text element and recalculate positions
            arcText.transition().duration(750)
              .attr("opacity", 1)
              .attr("transform", function() { return "rotate(" + computeTextRotation(e) + ")" })
              .attr("x", function(d) { return y(d.y); });
          }
      });
  }

  //鼠标移入移出事件函数
  var popUp = d3.select(".popUp"); //popUp:鼠标移入时出现的提示框
  function mouseover(d){
    //读取数据
    popUp.html
    (
      "<h2>" + d.name + "</h2>" +
      "<h3>" + d.size + "</h3>"
    );


    /*设置鼠标移入的时候提示框popUp出现的位置*/
    popUp.style("left", (d3.event.pageX)+"px");
    popUp.style("top", (d3.event.pageY)+"px");
    //判断浏览器是否是IE9版本
    if(navigator.userAgent.indexOf("MSIE 9.0")>0)
    {
      popUp.style("display","block");
      popUp.style("opacity", 1);//解决IE9鼠标移出图表提示框消失后，再次移入不显示的问题
    }else{
      popUp.style("display", "block");
    }
  }
  function mousemove(d){
    /*提示框popUp随鼠标移动*/
    popUp.style("left", (d3.event.pageX+10)+"px");//提示框位于鼠标左边
    popUp.style("top", (d3.event.pageY+20)+"px");//提示框位于鼠标的下面
  }

  function mouseout(d){
    //判断浏览器是否是IE9版本
    if(navigator.userAgent.indexOf("MSIE 9.0")>0)
    {
      popUp.style("display", "none");
      popUp.style("opacity", 0);//解决IE9鼠标移出图表 提示框不消失的问题
    }else{
      popUp.style("display", "none");
    }
  }

});

d3.select(self.frameElement).style("height", height + "px");

// Interpolate the scales!
function arcTween(d) {
  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      yd = d3.interpolate(y.domain(), [d.y, 1]),
      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
  return function(d, i) {
    return i
        ? function(t) { return arc(d); }
        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
  };
}

function computeTextRotation(d) {
  return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
}