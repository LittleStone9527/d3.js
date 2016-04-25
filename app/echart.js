/**
 * Created by Suboat on 2016/4/25.
 */

option = {
  tooltip : {
    trigger: 'axis'
  },
  legend: {
    data:['累计','新增']
  },
  toolbox: {
    show : true,
    feature : {
      dataView : {show: false, readOnly: true},
      magicType : {show: true, type: 'bar'},
      restore : {show: false},
      saveAsImage : {show: false}
    }
  },
  calculable : true,
  xAxis : [
    {
      type : 'category',
      data : ['左区','右区']
    }
  ],
  yAxis : [
    {
      type : 'value'
    }
  ],
  series : [
    {
      name:'累计',
      type:'bar',
      data:[20.0, 40],
      itemStyle:{
        normal: {
          color: '#E87C25'
        }
      },
      markPoint : {
        data : [
          {name : '左累计', value : 20, xAxis: 0, yAxis: 20},
          {name : '右累计', value : 40.9, xAxis: 1, yAxis: 40}
        ]
      }
    },
    {
      name:'新增',
      type:'bar',
      data:[2.6, 5.9],
      itemStyle:{
        normal: {
          color: '#78797B'
        }
      },
      markPoint : {
        data : [
          {name : '左新增', value : 2.6, xAxis: 0, yAxis: 2.6},
          {name : '右新增', value : 5.9, xAxis: 1, yAxis: 5.9}
        ]
      }
    }
  ]
};


