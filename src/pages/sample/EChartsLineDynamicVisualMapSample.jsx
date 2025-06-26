import React, { useEffect, useState } from 'react';
import EChartsLineChart from '../../components/EChartsLineChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const EChartsLineDynamicVisualMapSample = () => {
  const [chartData, setChartData] = useState({
    categories: [],
    series: [{ name: 'RSRP', data: [] }],
  });

  const [isSliding, setIsSliding] = useState(true);
  const [windowSize, setWindowSize] = useState(10);

  const generateRandomSLSS = () => {
    const count = 5;
    const selectedIndex = Math.floor(Math.random() * count);

    return Array.from({ length: count }, (_, i) => ({
      ID: 1,
      IND: 1,
      RSRP: parseFloat((Math.random() * 50).toFixed(1)), // 0.0 ~ 50.0
      Incoverage: 1,
      selected: i%5 === selectedIndex,
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newLabel = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      const SLSS = generateRandomSLSS();
      const selectedItem = SLSS.find((item) => item.selected) || SLSS[0]; // fallback

      const rsrpPoint = {
        value: selectedItem.RSRP,
        selected: selectedItem.selected,  // 이 부분 추가
      };

      
      const segments = [];
      const { categories, series } = chartData;
      const data = [...series[0].data, rsrpPoint]; // 새로 추가된 데이터 포함

      for (let i = 1; i < data.length; i++) {
        segments.push({
          name: 'RSRP segment',
          type: 'line',
          data: [
            [categories[i - 1], data[i - 1].value],
            [newLabel, data[i].value],
          ],
          lineStyle: {
            color: data[i].selected ? 'red' : 'green',
            width: 2,
          },
          showSymbol: false,
        });
      }

      setChartData({
        categories: [...categories, newLabel],
        series: segments,
      });

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
      <h1>라인차트 슬라이딩 (SLSS의 selected RSRP 값 실시간 반영)</h1>

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
        title="SLSS RSRP 시각화"
        categories={visibleData.categories}
        series={visibleData.series}
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

export default EChartsLineDynamicVisualMapSample;
