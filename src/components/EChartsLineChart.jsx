import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const EChartsLineChart = ({
  title = '',
  categories = [],
  series = [],
  height = 400,
  windowSize = 10,
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    chartInstance.current = echarts.init(chartRef.current);
    return () => chartInstance.current?.dispose();
  }, []);

  useEffect(() => {
    if (!chartInstance.current || categories.length === 0) return;

    const total = categories.length;
    const start = total > windowSize ? ((total - windowSize) / total) * 100 : 0;

    chartInstance.current.setOption({
      title: { text: title, left: 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: categories,
      },
      yAxis: { type: 'value' },
      series: series.map((s) => ({
        ...s,
        type: 'line',
        smooth: true,
        showSymbol: false,
      })),
      dataZoom: [
        {
          type: 'slider',
          start,
          end: 100,
          realtime: true,
        },
        {
          type: 'inside',
          start,
          end: 100,
        },
      ],
      grid: {
        left: '5%',
        right: '5%',
        bottom: '10%',
        top: '15%',
        containLabel: true,
      },
    });
  }, [categories, series, windowSize]);

  return <div ref={chartRef} style={{ width: '100%', height }} />;
};

export default EChartsLineChart;
