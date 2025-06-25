import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

// 상단 props에 추가
const EChartsLineChart = ({
  title = '',
  categories = [],
  fullTimestamps = [], // ✅ 추가
  series = [],
  height = 400,
  windowSize = 10,
  sliding = false,
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    chartInstance.current = echarts.init(chartRef.current);
    return () => chartInstance.current?.dispose();
  }, []);

  useEffect(() => {
  const allCategories = fullTimestamps.length > 0 ? fullTimestamps : categories;
  if (!chartInstance.current || allCategories.length === 0) return;

  const total = allCategories.length;

  // 🔹 slicing: 실제로 보일 데이터
  const visibleCategories = sliding
    ? allCategories.slice(-windowSize)
    : allCategories;

  const visibleSeries = series.map((s) => ({
    ...s,
    data: sliding ? s.data.slice(-windowSize) : s.data,
    type: 'line',
    smooth: true,
    showSymbol: false,
  }));

  chartInstance.current.setOption({
    title: { text: title, left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: visibleCategories,
    },
    yAxis: { type: 'value' },
    series: visibleSeries,
    dataZoom: sliding
  ? [
      {
        type: 'slider',
        start: 0,
        end: 100,
        realtime: true,
        showDataShadow: false,  // 
      },
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
    ]
  : [
      {
        type: 'slider',
        realtime: true,
        showDataShadow: false,  // 
        // ✅ start, end 없음
      },
      {
        type: 'inside',
        // ✅ start, end 없음
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
}, [categories, fullTimestamps, series, windowSize, sliding, title]);

  return <div ref={chartRef} style={{ width: '100%', height }} />;
};

export default EChartsLineChart;
