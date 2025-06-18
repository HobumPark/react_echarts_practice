import React, { useEffect, useState } from 'react';
import EChartsLineChart from '../components/EChartsLineChart';

const WINDOW_SIZE = 600; // 10분 = 600초

const EChartsLineDynamicSlidingPage2 = () => {
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
        const newLabel = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        const newEntry = Math.floor(Math.random() * 30) + 10;
        const newExit = Math.floor(Math.random() * 25) + 5;

        // 600개까지만 유지 (10분)
        const newCategories = [...prev.categories, newLabel].slice(-WINDOW_SIZE);
        const newEntryData = [...prev.series[0].data, newEntry].slice(-WINDOW_SIZE);
        const newExitData = [...prev.series[1].data, newExit].slice(-WINDOW_SIZE);

        return {
          categories: newCategories,
          series: [
            { ...prev.series[0], data: newEntryData },
            { ...prev.series[1], data: newExitData },
          ],
        };
      });
    }, 1000); // 1초마다 갱신

    return () => clearInterval(interval);
  }, []);

   // 누적값 계산
  const totalEntry = chartData.series[0].data.reduce((sum, val) => sum + val, 0);
  const totalExit = chartData.series[1].data.reduce((sum, val) => sum + val, 0);
  const dataCount = chartData.categories.length;  // 시계열 데이터 개수

  return (
    <div style={{ padding: 20 }}>
      <h1>📈 실시간 라인차트 (최근 10분 슬라이딩)</h1>
      <div style={{ marginBottom: 10 }}>
        <strong>누적 진입 차량 수:</strong> {totalEntry} &nbsp;&nbsp;
        <strong>누적 진출 차량 수:</strong> {totalExit} &nbsp;&nbsp;
        <strong>데이터 개수:</strong> {dataCount} &nbsp;&nbsp;
      </div>
      <EChartsLineChart
        title="시간대별 차량 진입/진출 수"
        categories={chartData.categories}
        series={chartData.series}
        height={500}
        windowSize={WINDOW_SIZE}  // 여기에 600 넘겨주기
      />
    </div>
  );
};

export default EChartsLineDynamicSlidingPage2;
