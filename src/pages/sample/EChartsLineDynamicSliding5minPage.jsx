import React, { useEffect, useState } from 'react';
import EChartsLineChart from '../../components/EChartsLineChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const EChartsLineDynamicSliding5minPage = () => {
  const [chartData, setChartData] = useState({
    categories: [], // ["HH:mm"]
    series: [{ name: 'RSRP', data: [] }],
    timestamps: [], // [Date]
  });

  const [isSliding, setIsSliding] = useState(true);
  const [windowSize, setWindowSize] = useState(5); // 단위: 분
  const [lastAddedMinute, setLastAddedMinute] = useState(null);

  const addNewData = () => {
    const now = new Date();
    const label = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    const RSRP = Math.floor(Math.random() * 30) + 10;

    setChartData((prev) => ({
      categories: [...prev.categories, label],
      series: [{ ...prev.series[0], data: [...prev.series[0].data, RSRP] }],
      timestamps: [...prev.timestamps, now],
    }));
  };

  // 초기 5분치 데이터 세팅
  const initChartData = () => {
    const baseTime = new Date();
    const newCategories = [];
    const newData = [];
    const newTimestamps = [];

    for (let i = 5; i >= 1; i--) {
      const time = new Date(baseTime.getTime() - i * 60 * 1000);
      newCategories.push(`${time.getHours()}:${String(time.getMinutes()).padStart(2, '0')}`);
      newData.push(Math.floor(Math.random() * 30) + 10);
      newTimestamps.push(time);
    }

    setChartData({
      categories: newCategories,
      series: [{ name: 'RSRP', data: newData }],
      timestamps: newTimestamps,
    });
  };

  useEffect(() => {
  initChartData(); // 최초 데이터 5분 세팅

  const interval = setInterval(() => {
    const now = new Date();
    const currentLabel = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

    // 현재 시각에 해당하는 라벨이 없으면 추가
    setChartData(prev => {
      if (!prev.categories.includes(currentLabel)) {
        const RSRP = Math.floor(Math.random() * 100) + 50;
        return {
          categories: [...prev.categories, currentLabel],
          series: [
            {
              ...prev.series[0],
              data: [...prev.series[0].data, RSRP]
            }
          ],
          timestamps: [...prev.timestamps, now]
        };
      }
      return prev; // 변경사항 없으면 기존 상태 유지
    });
  }, 1000);

  return () => clearInterval(interval);
}, []);

  const visibleData = (() => {
    if (!isSliding) return chartData;

    const now = new Date();
    const cutoff = new Date(now.getTime() - windowSize * 60 * 1000);

    const startIndex = chartData.timestamps.findIndex((ts) => ts >= cutoff);
    const sliceIndex = startIndex === -1 ? 0 : startIndex;

    return {
      categories: chartData.categories.slice(sliceIndex),
      series: chartData.series.map((s) => ({
        ...s,
        data: s.data.slice(sliceIndex),
      })),
    };
  })();

  const handleWindowSizeSelect = (e) => {
    setWindowSize(Number(e.target.value));
  };

  return (
    <div className="page-container">
      <h1>라인차트 슬라이딩 (최근 {windowSize}분 데이터 표시)</h1>

      <label className="window-size-label">
        시간 선택 (분):
        <select
          value={windowSize}
          onChange={handleWindowSizeSelect}
          disabled={!isSliding}
          className="window-size-select"
          style={{ marginLeft: 8 }}
        >
          <option value={1}>1분</option>
          <option value={2}>2분</option>
          <option value={3}>3분</option>
          <option value={4}>4분</option>
          <option value={5}>5분</option>
        </select>
      </label>

      <EChartsLineChart
        title="시간대별 RSRP 수치"
        categories={visibleData.categories}
        series={visibleData.series}
        windowSize={windowSize}
        height={500}
        yAxisMin={0}
        yAxisMax={150}
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

export default EChartsLineDynamicSliding5minPage;
