// EChartsScatterDynamicSlidingPage.jsx
import React, { useEffect, useState } from 'react';
import EChartsScatterChart from '../../components/EChartsScatterChart'; // 산점도 컴포넌트
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import './EChartsLineDynamicSlidingPage2.css';

const EChartsScatterDynamicSlidingPage = () => {
  const [chartData, setChartData] = useState({
    series: [
      { name: '진입 차량 수', data: [] }, // data: [[time, y]]
      { name: '진출 차량 수', data: [] },
    ],
  });

  const [isSliding, setIsSliding] = useState(true);
  const [windowSize, setWindowSize] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const label = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(
        now.getSeconds()
      ).padStart(2, '0')}`;

      const entryValue = Math.floor(Math.random() * 30) + 10;
      const exitValue = Math.floor(Math.random() * 25) + 5;

      setChartData((prev) => ({
        series: [
          { ...prev.series[0], data: [...prev.series[0].data, [label, entryValue]] },
          { ...prev.series[1], data: [...prev.series[1].data, [label, exitValue]] },
        ],
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const visibleSeries = chartData.series.map((s) => ({
    ...s,
    data: isSliding ? s.data.slice(-windowSize) : s.data,
  }));

  const handleWindowSizeChange = (e) => {
    let val = Number(e.target.value);
    if (isNaN(val) || val < 1) val = 1;
    if (val > chartData.series[0].data.length) val = chartData.series[0].data.length;
    setWindowSize(val);
  };

  return (
    <div className="page-container">
      <h1>산점도 슬라이딩 (최신 데이터 {windowSize}개만 보여주기)</h1>

      <label className="window-size-label">
        보여줄 최신 데이터 개수(N):
        <input
          type="number"
          value={windowSize}
          min="2"
          max={chartData.series[0].data.length || 10}
          onChange={handleWindowSizeChange}
          disabled={!isSliding}
          className="window-size-input"
        />
      </label>

      <EChartsScatterChart
        title="시간대별 차량 진입/진출 수 (산점도)"
        series={visibleSeries}
        windowSize={windowSize}
        height={500}
        sliding={isSliding}
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

export default EChartsScatterDynamicSlidingPage;
