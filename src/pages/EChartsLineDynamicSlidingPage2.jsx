import React, { useEffect, useState } from 'react';
import EChartsLineChart from '../components/EChartsLineChart';

const WINDOW_SIZE = 10;

const EChartsLineDynamicSlidingPage2 = () => {
  const [chartData, setChartData] = useState({
    categories: [],
    series: [
      { name: '진입 차량 수', data: [] },
      { name: '진출 차량 수', data: [] },
    ],
  });

  const [isSliding, setIsSliding] = useState(true); // 슬라이딩 여부 상태

  // 데이터 추가 타이머
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newLabel = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      const newEntry = Math.floor(Math.random() * 30) + 10;
      const newExit = Math.floor(Math.random() * 25) + 5;

      setChartData((prev) => ({
        categories: [...prev.categories, newLabel],
        series: [
          { ...prev.series[0], data: [...prev.series[0].data, newEntry] },
          { ...prev.series[1], data: [...prev.series[1].data, newExit] },
        ],
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 보여줄 데이터 (슬라이딩 여부에 따라)
  const visibleData = {
    categories: isSliding
      ? chartData.categories.slice(-WINDOW_SIZE)
      : chartData.categories,
    series: chartData.series.map((s) => ({
      ...s,
      data: isSliding ? s.data.slice(-WINDOW_SIZE) : s.data,
    })),
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>라인차트 슬라이딩 (최신 데이터 10개만 보여주기)</h1>

      <EChartsLineChart
        title="시간대별 차량 진입/진출 수"
        categories={visibleData.categories}
        series={visibleData.series}
        windowSize={WINDOW_SIZE}
        height={500}
        sliding={isSliding}
      />

      <button onClick={() => setIsSliding((prev) => !prev)}>
        {isSliding ? '중지' : '재생'}
      </button>
    </div>
  );
};

export default EChartsLineDynamicSlidingPage2;
