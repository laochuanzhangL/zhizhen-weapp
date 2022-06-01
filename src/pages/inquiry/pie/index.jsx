import { Component } from "react";
import { View } from "@tarojs/components";
import Taro, { getCurrentInstance } from "@tarojs/taro";

import "./index.scss";
import { EChart } from "echarts-taro3-react";

export default class Index extends Component {
  state = {
    detail: []
  };
  componentDidMount() {
    let data = getCurrentInstance().router.params.data;
    console.log(JSON.parse(data));
    data = JSON.parse(data);
    // console.log(getCurrentInstance().router.params)
    let arr = [];
    let arr1 = [];

    for (let key in data) {
      console.log(key); // name age
      console.log(data[key]); // cookie 18
      if (data[key].get_probability.toFixed(3) >= 0.001) {
        let value = data[key].get_probability.toFixed(3);
        let name = data[key].name;
        let detail = data[key].detail;
        arr.push({ value, name });
        arr1.push({ name, detail });
      }
    }

    this.setState({
      detail: arr1
    });

    const option = {
      title: {
        text: "疾病预测",
        left: "center"
      },
      tooltip: {
        trigger: "item"
      },
      // legend: {
      //   orient: 'vertical',
      //   left: 'left'
      // },
      series: [
        {
          // name: 'Access From',
          type: "pie",
          radius: "50%",
          data: arr,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            },
            normal: {
              color: function(params) {
                //自定义颜色
                var colorList = [
                  "#00FFFF",
                  "#00FF00",
                  "#FFFF00",
                  "#FF8C00",
                  "#FF0000",
                  "#FE8463"
                ];
                return colorList[params.dataIndex];
              }
            }
          }
        }
      ]
    };
    this.pieChart.refresh(option);
    console.log(option);
  }

   //pieChart: any;
  refPieChart = node => (this.pieChart = node);

  goDetail(value) {
    Taro.navigateTo({
      url: `/pages/inquiry/detail/index?name=${value.name}&introduce=${value.introduce}&department=${value.department}&easy_get=${value.easy_get}&treat_period=${value.treat_period}&drug=${value.drug}&can_eat=${value.can_eat}&not_eat=${value.not_eat}&prevent=${value.prevent}&symptom=${value.symptom}&cause=${value.cause}&treat_detail=${value.treat_detail}`
    });
  }

  render() {
    return (
      <View className="pie-chart">
        <EChart  ref={this.refPieChart} canvasId="pie-chart" />
        {// this.state.detail.length==0?'':
        this.state.detail.map(item => {
          return (
            <View
              key={item.name}
              className="detail-item"
              onClick={() => this.goDetail(item.detail)}
            >
              {item.name}
            </View>
          );
        })}
      </View>
    );
  }
}
