import React, { useEffect, useState } from 'react';
import EChartsLineChart from '../../components/EChartsLineChart';

const EChartsLineDynamicSlidingPage = () => {
  const [chartData, setChartData] = useState({
    categories: [],
    series: [
      { name: '진입 차량 수', data: [] },
      { name: '진출 차량 수', data: [] },
    ],
  });

  const [windowSize, setWindowSize] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prev) => {
        const now = new Date();
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

  // 슬라이딩 윈도우에 맞게 데이터 자르기
  const slicedData = {
    categories: chartData.categories.slice(-windowSize),
    series: chartData.series.map((serie) => ({
      ...serie,
      data: serie.data.slice(-windowSize),
    })),
  };

  const handleWindowSizeChange = (e) => {
    let val = Number(e.target.value);
    if (isNaN(val) || val < 2) val = 2;
    if (val > chartData.categories.length) val = chartData.categories.length || 10;
    setWindowSize(val);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>라인차트 슬라이딩 (최신 데이터 {windowSize}개만 보여주기)</h1>
      
      <label style={{ display: 'block', marginBottom: 12 }}>
        보여줄 최신 데이터 개수 (N):&nbsp;
        <input
          type="number"
          value={windowSize}
          min={2}
          max={chartData.categories.length || 10}
          onChange={handleWindowSizeChange}
          style={{ width: 60 }}
        />
      </label>

      <EChartsLineChart
        title="시간대별 차량 진입/진출 수"
        categories={slicedData.categories}
        series={slicedData.series}
        windowSize={windowSize}
        height={500}
      />
    </div>
  );
};

export default EChartsLineDynamicSlidingPage;
