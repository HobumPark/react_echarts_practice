import React, { useEffect, useState } from 'react';
import EChartsBarChart from '../components/EChartsBarChart';

const generateLargeData = (count) => {
  const categories = Array.from({ length: count }, (_, i) => `상품${i + 1}`);
  // 2개 시리즈 데이터 생성 (랜덤값)
  const series = [
    {
      name: '2023년 판매량',
      data: Array.from({ length: count }, () => Math.floor(Math.random() * 100)),
    },
    {
      name: '2024년 판매량',
      data: Array.from({ length: count }, () => Math.floor(Math.random() * 100)),
    },
  ];
  return { categories, series };
};

const EChartsBarChartTestPage = () => {
  const [chartData, setChartData] = useState({
    categories: [],
    series: [],
  });

  const loadSimpleData = () => {
    setChartData({
      categories: ['셔츠', '카디건', '치마', '청바지', '운동화', '양말'],
      series: [
        { name: '2023년 판매량', data: [5, 20, 36, 10, 10, 20] },
        { name: '2024년 판매량', data: [7, 25, 30, 15, 20, 25] },
      ],
    });
  };

  const loadLargeData = (count) => {
    setChartData(generateLargeData(count));
  };

  // 초기 데이터 로드
  useEffect(() => {
    loadSimpleData();
  }, []);

  return (
    <div>
      <h1>막대 차트 테스트 페이지 (다중 막대, 대용량 테스트)</h1>

      <div style={{ marginBottom: 20 }}>
        <button onClick={loadSimpleData}>간단한 데이터 (6개)</button>{' '}
        <button onClick={() => loadLargeData(5000)}>대용량 5000개 데이터</button>{' '}
        <button onClick={() => loadLargeData(10000)}>대용량 10000개 데이터</button>
      </div>

      <EChartsBarChart
        title="상품 판매량 비교"
        categories={chartData.categories}
        series={chartData.series}
        width="100%"
        height={500}
      />
    </div>
  );
};

export default EChartsBarChartTestPage;
