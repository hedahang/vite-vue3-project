<template>
  <div class="chart-demo">
    <h2>ECharts 图表示例</h2>
    <div class="charts-container">
      <!-- 柱状图 -->
      <div class="chart-item">
        <h3>柱状图示例</h3>
        <v-chart class="chart" :option="barChartOption" autoresize />
      </div>

      <!-- 折线图 -->
      <div class="chart-item">
        <h3>折线图示例</h3>
        <v-chart class="chart" :option="lineChartOption" autoresize />
      </div>

      <!-- 饼图 -->
      <div class="chart-item">
        <h3>饼图示例</h3>
        <v-chart class="chart" :option="pieChartOption" autoresize />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart, LineChart, PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart from "vue-echarts";

// 注册必要的组件
use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

// 柱状图配置
const barChartOption = ref({
  title: {
    text: "月度销售数据",
    left: "center",
  },
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    data: ["一月", "二月", "三月", "四月", "五月", "六月"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "销售额",
      type: "bar",
      data: [120, 200, 150, 80, 70, 110],
      itemStyle: {
        color: "#5470c6",
      },
    },
  ],
});

// 折线图配置
const lineChartOption = ref({
  title: {
    text: "访问量趋势",
    left: "center",
  },
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "访问量",
      type: "line",
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      smooth: true,
      itemStyle: {
        color: "#91cc75",
      },
    },
  ],
});

// 饼图配置
const pieChartOption = ref({
  title: {
    text: "数据占比",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "数据来源",
      type: "pie",
      radius: "50%",
      data: [
        { value: 1048, name: "搜索引擎" },
        { value: 735, name: "直接访问" },
        { value: 580, name: "邮件营销" },
        { value: 484, name: "联盟广告" },
        { value: 300, name: "视频广告" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});
</script>

<style scoped lang="scss">
.chart-demo {
  margin: 2rem 0;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;

  h2 {
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .charts-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;

    .chart-item {
      background-color: #fff;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      h3 {
        margin-bottom: 1rem;
        text-align: center;
        color: #333;
      }

      .chart {
        width: 100%;
        height: 400px;
      }
    }
  }

  @media (max-width: 768px) {
    .charts-container {
      grid-template-columns: 1fr;
    }
  }
}
</style>
