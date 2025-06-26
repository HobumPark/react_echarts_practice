// EChartsLineDynamicSlidingSlopeSample.jsx
import React, { useEffect, useState } from 'react';
import EChartsLineChart from '../../components/EChartsLineChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const EChartsLineDynamicSlidingSlopeSample = () => {
  const [chartData, setChartData] = useState({
    categories: [],
    series: [
        { name: '기울기 데이터 Blue', data: [], color: 'blue' },
        { name: '기울기 데이터 Orange', data: [], color: 'orange' },
        { name: '기울기 데이터 Green', data: [], color: 'green' },
    ],
  });

  const [isSliding, setIsSliding] = useState(true);
  const [windowSize, setWindowSize] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
        const now = new Date();
        const newLabel = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        // -1.5 ~ 1.5 랜덤 기울기 값
        const newBlue = +(Math.random() * 3 - 1.5).toFixed(3);
        const newOrange = +(Math.random() * 3 - 1.5).toFixed(3);
        const newGreen = +(Math.random() * 3 - 1.5).toFixed(3);

        // 공통 임계값 설정
        const thresholds = [
        { name: 'Blue 상한선', value: 1, color: 'blue', direction: 'over' },
        { name: 'Blue 하한선', value: -1, color: 'blue', direction: 'under' },
        { name: 'Orange 상한선', value: 1, color: 'orange', direction: 'over' },
        { name: 'Orange 하한선', value: -1, color: 'orange', direction: 'under' },
        { name: 'Green 상한선', value: 1, color: 'green', direction: 'over' },
        { name: 'Green 하한선', value: -1, color: 'green', direction: 'under' },
        ];

        // 경고 메시지
        thresholds.forEach((t) => {
        let valToCheck = null;
        if (t.color === 'blue') valToCheck = newBlue;
        else if (t.color === 'orange') valToCheck = newOrange;
        else if (t.color === 'green') valToCheck = newGreen;

        if (valToCheck !== null) {
            if (t.direction === 'over' && valToCheck > t.value) {
            console.warn(`[임계점 초과] ${t.name}: ${valToCheck} > ${t.value}`);
            } else if (t.direction === 'under' && valToCheck < t.value) {
            console.warn(`[임계점 미만] ${t.name}: ${valToCheck} < ${t.value}`);
            }
        }
        });

        setChartData((prev) => ({
        categories: [...prev.categories, newLabel],
        series: [
            { ...prev.series[0], data: [...prev.series[0].data, newBlue] },
            { ...prev.series[1], data: [...prev.series[1].data, newOrange] },
            { ...prev.series[2], data: [...prev.series[2].data, newGreen] },
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

  // 임계점들을 ECharts markLine 데이터로 변환
  // 임계점 배열을 series별로 분리해서 각각 markLine에 넣도록
  // markLine 설정
    const markLinesByColor = {
    blue: [
        { name: '상한선', value: 1, color: 'blue', lineType: 'solid' },
        { name: '하한선', value: -1, color: 'blue', lineType: 'solid' },
    ],
    orange: [
        { name: '상한선', value: 1, color: 'orange', lineType: 'dashed' },
        { name: '하한선', value: -1, color: 'orange', lineType: 'dashed' },
    ],
    green: [
        { name: '상한선', value: 1, color: 'green', lineType: 'dotted' },
        { name: '하한선', value: -1, color: 'green', lineType: 'dotted' },
    ],
    };

  // series 배열에 markLine 넣기 위해 series별로 markLine 데이터 생성
  const seriesWithMarkLines = visibleData.series.map((s) => ({
    ...s,
    markLine: {
      silent: true,
      symbol: ['none', 'none'],
      symbolSize: [0, 0],
      data: (markLinesByColor[s.color] || []).map((t) => ({
        name: t.name,
        yAxis: t.value,
        lineStyle: {
          color: t.color,
          type: t.lineType,
          width: 2,
        },
        label: {
          show: true,
          formatter: t.name,
          position: 'middle',
          color: t.color,
          fontWeight: 'bold',
          backgroundColor: 'rgba(255,255,255,0.7)',
          borderColor: t.color,
          borderWidth: 1,
          padding: [2, 6],
          borderRadius: 4,
        },
      })),
    },
  }));

  return (
    <div className="page-container">
      <h1>라인차트(임계선) - 진동 데이터 3개</h1>

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
        title="시간대별 기울기 데이터 3종"
        categories={visibleData.categories}
        series={seriesWithMarkLines}
        windowSize={windowSize}
        height={500}
        sliding={isSliding}
        yAxisName="기울기"
        yAxisNameLocation="end"
        yAxisMin={-1.5}
        yAxisMax={1.5}
        smooth={false}
        thresholds={[
            { name: 'X상한선', value: 1, color: 'blue', lineType: 'solid' },
            { name: 'X하한선', value: -1, color: 'blue', lineType: 'solid' },
            { name: 'Y상한선', value: 1, color: 'orange', lineType: 'dashed' },
            { name: 'Y하한선', value: -1, color: 'orange', lineType: 'dashed' },
            { name: 'Z상한선', value: 1, color: 'green', lineType: 'dotted' },
            { name: 'Z하한선', value: -1, color: 'green', lineType: 'dotted' },
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

export default EChartsLineDynamicSlidingSlopeSample;
