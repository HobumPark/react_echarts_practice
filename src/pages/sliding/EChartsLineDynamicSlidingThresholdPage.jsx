// EChartsLineDynamicSlidingPage2.jsx
import React, { useEffect, useState } from 'react';
import EChartsLineChart from '../../components/EChartsLineChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import './EChartsLineDynamicSlidingPage2.css';

const EChartsLineDynamicSlidingThresholdPage = () => {
  const [chartData, setChartData] = useState({
    categories: [],
    series: [
      { name: '진입 차량 수', data: [] },
      { name: '진출 차량 수', data: [] },
    ],
  });

  const [isSliding, setIsSliding] = useState(true);
  const [windowSize, setWindowSize] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newLabel = `${now.getHours()}:${String(now.getMinutes()).padStart(
        2,
        '0'
      )}:${String(now.getSeconds()).padStart(2, '0')}`;

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

  const visibleData = {
    categories: isSliding
      ? chartData.categories.slice(-windowSize)
      : chartData.categories,
    series: chartData.series.map((s) => ({
      ...s,
      data: isSliding ? s.data.slice(-windowSize) : s.data,
    })),
  };

  const handleWindowSizeChange = (e) => {
    let val = Number(e.target.value);
    if (isNaN(val) || val < 1) val = 1;
    if (val > chartData.categories.length) val = chartData.categories.length;
    setWindowSize(val);
  };

    return (
    <div className="page-container">
      <h1>라인차트(임계선) 영역 슬라이딩 (최신 데이터 {windowSize}개만 보여주기)</h1>

      <label className="window-size-label">
        보여줄 최신 데이터 개수(N):
        <input
          type="number"
          value={windowSize}
          min="2"
          max={chartData.categories.length || 10}
          onChange={handleWindowSizeChange}
          disabled={!isSliding}
          className="window-size-input"
        />
      </label>

      <EChartsLineChart
        title="시간대별 차량 진입/진출 수"
        categories={visibleData.categories}
        series={visibleData.series}
        windowSize={windowSize}
        height={500}
        sliding={isSliding}
        thresholds={[
            { name: 'X Danger', value: 30, lineStyle:{ color: 'red', type:'dashed', width:3 } },
            { name: 'X Danger', value: 10, lineStyle:{ color: 'red', type:'dashed', width:3 } },
        ]}
      />

      <button
        className="play-pause-button"
        onClick={() => setIsSliding((prev) => !prev)}
        aria-label={isSliding ? '중지' : '재생'}
      >
        <FontAwesomeIcon icon={isSliding ? faPause : faPlay} />
      </button>
    </div>
  );
};

export default EChartsLineDynamicSlidingThresholdPage;
