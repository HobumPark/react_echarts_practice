import React, { useEffect, useState } from 'react';
import EChartsLineChart from '../components/EChartsLineChart';

const generateLargeLineData = (count) => {
  const categories = Array.from({ length: count }, (_, i) => `월${i + 1}`);
  const series = [
    {
      name: '매출 2023',
      data: Array.from({ length: count }, () => Math.floor(Math.random() * 1000)),
    },
    {
      name: '매출 2024',
      data: Array.from({ length: count }, () => Math.floor(Math.random() * 1000)),
    },
  ];
  return { categories, series };
};

const EChartsLineChartTestPage = () => {
  const [chartData, setChartData] = useState({
    categories: [],
    series: [],
  });

  const loadSimpleData = () => {
    setChartData({
      categories: ['1월', '2월', '3월', '4월', '5월', '6월'],
      series: [
        { name: '매출 2023', data: [150, 230, 224, 218, 135, 147] },
        { name: '매출 2024', data: [180, 250, 210, 200, 160, 170] },
      ],
    });
  };

  const loadLargeData = (count) => {
    setChartData(generateLargeLineData(count));
  };

  useEffect(() => {
    loadSimpleData();
  }, []);

  return (
    <div>
      <h1>라인 차트 테스트 페이지 (줌/팬 포함, 대용량 테스트)</h1>
      <div style={{ marginBottom: 20 }}>
        <button onClick={loadSimpleData}>간단한 데이터 (6개)</button>{' '}
        <button onClick={() => loadLargeData(5000)}>대용량 5000개 데이터</button>{' '}
        <button onClick={() => loadLargeData(10000)}>대용량 10000개 데이터</button>
      </div>

      <EChartsLineChart
        title="월별 매출 추이"
        categories={chartData.categories}
        series={chartData.series}
        width="100%"
        height={600}
      />
    </div>
  );
};

export default EChartsLineChartTestPage;
