import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

const EChartsLineDynamicChangeColorSample2 = () => {
  const [chartData, setChartData] = useState({
    categories: [],
    values: [],
    selectedFlags: [], // isSelected 여부 배열
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const label = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      const newRSRP = +(Math.random() * 80 - 120).toFixed(1); // -120 ~ -40
      const isSelected = Math.random() < 0.3; // 30% 확률로 선택된 데이터라고 가정

      setChartData((prev) => ({
        categories: [...prev.categories, label],
        values: [...prev.values, newRSRP],
        selectedFlags: [...prev.selectedFlags, isSelected],
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getOption = () => {
    const segments = [];
    for (let i = 1; i < chartData.values.length; i++) {
      const isSelected = chartData.selectedFlags[i]; // i번째 점 기준으로 선 색 결정 (원하는 로직에 맞게 조절 가능)
      segments.push({
        name: 'RSRP segment',
        type: 'line',
        data: [
          [chartData.categories[i - 1], chartData.values[i - 1]],
          [chartData.categories[i], chartData.values[i]],
        ],
        lineStyle: {
          color: isSelected ? 'red' : 'green',
          width: 2,
        },
        showSymbol: false,
        hoverAnimation: false,
      });
    }

    return {
      title: { text: '선 색상 강조 (selected true: 빨강, false: 녹색)' },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: chartData.categories },
      yAxis: { type: 'value', min: -130, max: -30, name: 'RSRP (dBm)' },
      series: segments,
    };
  };

  return (
    <div>
      <h2>isSelected에 따라 점 색상만 빨강/녹색 변경</h2>
      <ReactECharts option={getOption()} style={{ height: 500 }} notMerge lazyUpdate />
    </div>
  );
};

export default EChartsLineDynamicChangeColorSample2;
