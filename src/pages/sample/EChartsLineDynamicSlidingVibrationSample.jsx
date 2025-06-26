// EChartsLineDynamicSlidingVibrationSample.jsx
import React, { useEffect, useState } from 'react';
import EChartsLineChart from '../../components/EChartsLineChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const EChartsLineDynamicSlidingVibrationSample = () => {
  const [chartData, setChartData] = useState({
    categories: [],
    series: [
      { name: '진동 데이터', data: [], color: 'blue' },  // 그래프 1개만
    ],
  });

  const [isSliding, setIsSliding] = useState(true);
  const [windowSize, setWindowSize] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newLabel = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      // 진동 데이터 생성 (예: 0~100 사이 랜덤값)
      const newVibration = Math.floor(Math.random() * 250) + 1000;

      // 임계값 50 넘으면 콘솔 경고
      const thresholdValue = 1175;
      if (newVibration > thresholdValue) {
        console.warn(`[임계점 초과] 진동 데이터 ${newVibration} > ${thresholdValue}`);
      }

      setChartData((prev) => ({
        categories: [...prev.categories, newLabel],
        series: [
          { ...prev.series[0], data: [...prev.series[0].data, newVibration] },
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
      <h1>라인차트(임계선) - 진동 데이터</h1>

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
        title="시간대별 진동 데이터"
        categories={visibleData.categories}
        series={visibleData.series}
        windowSize={windowSize}
        height={500}
        sliding={isSliding}
        thresholds={[
          { name: 'Danger', value: 1175, color: 'red', lineType: 'solid' },
        ]}
        yAxisName="진동"
        yAxisNameLocation="end"
        yAxisMin={1000}
        yAxisMax={1250}
        smooth={false}  // boolean false로 넘기기
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

export default EChartsLineDynamicSlidingVibrationSample;
