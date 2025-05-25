import React from 'react';
import ReactECharts from 'echarts-for-react';

/**
 * @param {{
 *  title?: string,
 *  categories: string[], // 사용되지 않게 됨
 *  fullTimestamps?: string[],
 *  series: { name: string, data: number[] } | { name: string, data: number[] }[],
 *  width?: string | number,
 *  height?: string | number,
 * }} props
 */
const EChartsLineChart = ({
  title = '라인 차트',
  categories,
  fullTimestamps,
  series,
  width = '100%',
  height = 400,
}) => {
  const seriesArray = Array.isArray(series) ? series : [series];

  const isTimeSeries = fullTimestamps && fullTimestamps.length > 0;

  const option = {
    title: {
      text: title,
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: seriesArray.map((s) => s.name),
    },
    xAxis: isTimeSeries
      ? {
          type: 'time',
        }
      : {
          type: 'category',
          data: categories,
        },
    yAxis: {
      type: 'value',
    },
    series: seriesArray.map((s) => ({
      name: s.name,
      type: 'line',
      showSymbol: false,
      data: isTimeSeries
        ? s.data.map((value, i) => [fullTimestamps[i], value])
        : s.data,
    })),
    dataZoom: [
      {
        type: 'slider',
        start: 0,
        end: categories.length > 20 ? 20 : 100,
        handleSize: '80%',
      },
      {
        type: 'inside',
        start: 0,
        end: categories.length > 20 ? 20 : 100,
      },
    ],
  };

  return <ReactECharts option={option} style={{ width, height }} />;
};

export default EChartsLineChart;
