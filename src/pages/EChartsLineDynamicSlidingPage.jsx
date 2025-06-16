import React, { useEffect, useState } from 'react';
import EChartsLineChart from '../components/EChartsLineChart';

const WINDOW_SIZE = 10;

const EChartsLineDynamicSlidingPage = () => {
  const [chartData, setChartData] = useState({
    categories: [],
    series: [
      { name: '진입 차량 수', data: [] },
      { name: '진출 차량 수', data: [] },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prev) => {
        const now = new Date();
        //now.setSeconds(0, 0);
        const newLabel = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        const newEntry = Math.floor(Math.random() * 30) + 10;
        const newExit = Math.floor(Math.random() * 25) + 5;

        return {
          categories: [...prev.categories, newLabel],
          series: [
            { ...prev.series[0], data: [...prev.series[0].data, newEntry] },
            { ...prev.series[1], data: [...prev.series[1].data, newExit] },
          ],
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>라인차트 슬라이딩 (최신 데이터 10개만 보여주기)</h1>
      <EChartsLineChart
        title="시간대별 차량 진입/진출 수"
        categories={chartData.categories}
        series={chartData.series}
        windowSize={WINDOW_SIZE}
        height={500}
      />
    </div>
  );
};

export default EChartsLineDynamicSlidingPage;
