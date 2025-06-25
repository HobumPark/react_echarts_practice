import React, { useEffect, useState } from 'react';
import EChartsDualAxisLineChart from '../../components/EChartsDualLineChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import './EChartsDualLineDynamicSlidingPage.css';

const EChartsDualAxisDynamicPage = () => {
  const [seriesData, setSeriesData] = useState([
    { name: '패킷 에러율', data: [], yAxisIndex: 0 },
    { name: 'TX 거리', data: [], yAxisIndex: 1 },
  ]);
  const [isSliding, setIsSliding] = useState(true);
  const [windowSize, setWindowSize] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeLabel = `${now.getHours()}:${String(now.getMinutes()).padStart(
        2,
        '0'
      )}:${String(now.getSeconds()).padStart(2, '0')}`;

      const newErrorRate = parseFloat((Math.random() * 5).toFixed(2)); // 0~5% 에러율
      const newTxDistance = Math.floor(Math.random() * 200) + 100; // 100~300m TX 거리

      setSeriesData((prev) => [
        {
          ...prev[0],
          data: [...prev[0].data, [timeLabel, newErrorRate]],
        },
        {
          ...prev[1],
          data: [...prev[1].data, [timeLabel, newTxDistance]],
        },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 슬라이딩 시 보여줄 데이터만 자름
  const visibleSeries = seriesData.map((s) => ({
    ...s,
    data: isSliding ? s.data.slice(-windowSize) : s.data,
  }));

  const handleWindowSizeChange = (e) => {
    let val = Number(e.target.value);
    if (isNaN(val) || val < 1) val = 1;
    if (val > seriesData[0].data.length) val = seriesData[0].data.length;
    setWindowSize(val);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">이중 Y축 라인차트 (패킷 에러율 vs TX 거리)</h1>

      <label className="window-size-label">
        보여줄 최신 데이터 개수(N):
        <input
          type="number"
          value={windowSize}
          min="2"
          max={seriesData[0].data.length || 10}
          onChange={handleWindowSizeChange}
          disabled={!isSliding}
          className="window-size-input"
        />
      </label>

      <EChartsDualAxisLineChart
        title="시간대별 패킷 에러율 및 TX 거리"
        series={visibleSeries}
        windowSize={windowSize}
        height={500}
        sliding={isSliding}
      />

      <div className="button-container">
        <button
          className="play-pause-button"
          onClick={() => setIsSliding((prev) => !prev)}
          aria-label={isSliding ? '중지' : '재생'}
        >
          <FontAwesomeIcon icon={isSliding ? faPause : faPlay} />
        </button>
      </div>
    </div>
  );
};

export default EChartsDualAxisDynamicPage;
