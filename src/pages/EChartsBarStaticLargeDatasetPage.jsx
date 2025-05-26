import React, { useEffect, useState } from 'react';
import EChartsBarChart from '../components/EChartsBarChart';

// 1분 단위로 시간 생성 (예: "00:00", "00:01", ...)
const generateTimeLabels = (count) => {
  return Array.from({ length: count }, (_, i) => {
    const hour = String(Math.floor(i / 60)).padStart(2, '0');
    const minute = String(i % 60).padStart(2, '0');
    return `${hour}:${minute}`;
  });
};

// 진입/진출 차량 데이터 생성
const generateTrafficData = (count, startDate = new Date()) => {
  const categories = [];
  const fullTimestamps = [];

  for (let i = 0; i < count; i++) {
    const date = new Date(startDate.getTime() + i * 60000); // 1분씩 증가
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    categories.push(`${hour}:${minute}`);
    fullTimestamps.push(date.toISOString().slice(0, 16).replace('T', ' ')); // "YYYY-MM-DD HH:mm"
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


  const EChartsStaticLargeDatasetPage = () => {
    const [chartData, setChartData] = useState({
      categories: [],
      series: [],
    });

    const loadSimpleData = () => {
    setChartData({
      categories: ['00:00', '00:01', '00:02', '00:03', '00:04', '00:05'],
      series: [
        { name: '진입 차량 수', data: [12, 18, 22, 17, 25, 20] },
        { name: '진출 차량 수', data: [9, 15, 10, 20, 14, 18] },
      ],
      fullTimestamps: [
        '2025-05-25 00:00',
        '2025-05-25 00:01',
        '2025-05-25 00:02',
        '2025-05-25 00:03',
        '2025-05-25 00:04',
        '2025-05-25 00:05',
      ],
    });
  };


  const loadLargeData = (count) => {
    setChartData(generateTrafficData(count));
  };

  useEffect(() => {
    loadSimpleData();
  }, []);

  return (
    <div>
      <h1>막대 차트 테스트 페이지 (줌/팬 포함, 대용량 테스트)</h1>

      <div style={{ marginBottom: 20 }}>
        <button onClick={loadSimpleData}>간단한 데이터 (6개)</button>{' '}
        <button onClick={() => loadLargeData(1440)}>1일치 데이터 (1440분)</button>{' '}
        <button onClick={() => loadLargeData(10000)}>7일치 데이터 (10000분)</button>
      </div>

      <EChartsBarChart
        title="시간대별 진입/진출 차량 수"
        categories={chartData.categories}
        series={chartData.series}
        fullTimestamps={chartData.fullTimestamps}
        width="100%"
        height={500}
      />
    </div>
  );
};

export default EChartsStaticLargeDatasetPage;
