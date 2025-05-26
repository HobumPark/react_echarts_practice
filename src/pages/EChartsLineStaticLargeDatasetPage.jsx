import React, { useEffect, useState } from 'react';
import EChartsLineChart from '../components/EChartsLineChart';

// 1분 단위 시간 생성 + fullTimestamp
const generateTrafficLineData = (count, startDate = new Date()) => {
  const categories = [];
  const fullTimestamps = [];

  for (let i = 0; i < count; i++) {
    const date = new Date(startDate.getTime() + i * 60000);
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    categories.push(`${hour}:${minute}`);
    fullTimestamps.push(date.toISOString().slice(0, 16).replace('T', ' '));
  }

  const series = [
    {
      name: '진입 차량 수',
      data: Array.from({ length: count }, () => Math.floor(Math.random() * 30) + 10),
    },
    {
      name: '진출 차량 수',
      data: Array.from({ length: count }, () => Math.floor(Math.random() * 25) + 5),
    },
  ];

  return { categories, series, fullTimestamps };
};

const EChartsLineChartTestPage = () => {
  const [chartData, setChartData] = useState({
    categories: [],
    series: [],
    fullTimestamps: [],
  });

  const loadSimpleData = () => {
    setChartData({
      categories: ['00:00', '00:01', '00:02', '00:03', '00:04', '00:05'],
      fullTimestamps: [
        '2025-05-25 00:00',
        '2025-05-25 00:01',
        '2025-05-25 00:02',
        '2025-05-25 00:03',
        '2025-05-25 00:04',
        '2025-05-25 00:05',
      ],
      series: [
        { name: '진입 차량 수', data: [15, 20, 22, 18, 25, 19] },
        { name: '진출 차량 수', data: [10, 15, 14, 19, 20, 13] },
      ],
    });
  };

  const loadLargeData = (count) => {
    setChartData(generateTrafficLineData(count));
  };

  useEffect(() => {
    loadSimpleData();
  }, []);

  return (
    <div>
      <h1>라인 차트 테스트 페이지 (줌/팬 포함, 대용량 테스트)</h1>
      <div style={{ marginBottom: 20 }}>
        <button onClick={loadSimpleData}>간단한 데이터 (6개)</button>{' '}
        <button onClick={() => loadLargeData(1440)}>1일치 데이터 (1440분)</button>{' '}
        <button onClick={() => loadLargeData(10000)}>7일치 데이터 (10000분)</button>
      </div>

      <EChartsLineChart
        title="시간대별 차량 진입/진출 수"
        categories={chartData.categories}
        series={chartData.series}
        fullTimestamps={chartData.fullTimestamps}
        width="100%"
        height={600}
      />
    </div>
  );
};

export default EChartsLineChartTestPage;
