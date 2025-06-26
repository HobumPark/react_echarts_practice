import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const EChartsLineDynamicChangeColorSample = () => {
  const [chartData, setChartData] = useState({
    categories: [],
    values: [],
    selectedFlags: [],
  });

  const [isSliding, setIsSliding] = useState(true);
  const [windowSize, setWindowSize] = useState(10);
  const [dataZoomRange, setDataZoomRange] = useState({ start: 0, end: 100 });

  useEffect(() => {
  const interval = setInterval(() => {
    const now = new Date();
    const newLabel = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const newRSRPValue = +(Math.random() * 80 - 120).toFixed(1);

    setChartData(prev => {
      const newCount = prev.categories.length + 1;
      const isSelected = newCount % 5 === 0;

      const newCategories = [...prev.categories, newLabel];
      const newValues = [...prev.values, newRSRPValue];
      const newSelectedFlags = [...prev.selectedFlags, isSelected];

      console.log('Added data:', {
        index: newCount,
        label: newLabel,
        value: newRSRPValue,
        selected: isSelected,
        windowSize,
        isSliding,
        dataZoomRange,
      });

      // 슬라이딩 중일 때만 dataZoomRange 조정
      if (isSliding) {
        if (newCategories.length <= windowSize) {
          setDataZoomRange({ start: 0, end: 100 });
        } else {
          const startPercent = ((newCategories.length - windowSize) / newCategories.length) * 100;
          setDataZoomRange({ start: startPercent, end: 100 });
        }
      }

      return {
        categories: newCategories,
        values: newValues,
        selectedFlags: newSelectedFlags,
      };
    });
  }, 1000);

  return () => clearInterval(interval);
}, [isSliding, windowSize, dataZoomRange]);


  // 사용자가 dataZoom 직접 조작 시 (중지 상태에서만)
  const onDataZoom = (params) => {
    if (!isSliding) {
      const batch = params.batch && params.batch[0];
      if (batch) {
        setDataZoomRange({ start: batch.start, end: batch.end });
      }
    }
  };

  const handleWindowSizeChange = (e) => {
    let val = Number(e.target.value);
    if (isNaN(val) || val < 1) val = 1;
    if (val > chartData.categories.length) val = chartData.categories.length || 10;
    setWindowSize(val);
  };

  const visibleData = {
    categories: chartData.categories,
    values: chartData.values,
    selectedFlags: chartData.selectedFlags,
  };

  const getOption = () => {
    const segments = [];
    for (let i = 1; i < visibleData.values.length; i++) {
      segments.push({
        name: 'RSRP 데이터',
        type: 'line',
        data: [
          [visibleData.categories[i - 1], visibleData.values[i - 1]],
          [visibleData.categories[i], visibleData.values[i]],
        ],
        lineStyle: {
          color: visibleData.selectedFlags[i] ? 'red' : 'green',
          width: 2,
        },
        showSymbol: false,
        hoverAnimation: false,
      });
    }

    return {
      title: { text: '시간대별 RSRP 데이터' },
      tooltip: { trigger: 'axis' },
      dataZoom: [
        {
          type: 'slider',
          show: true,
          xAxisIndex: 0,
          handleSize: '80%',
          zoomLock: false,
        },
        {
          type: 'inside',
          xAxisIndex: 0,
        },
      ],
      xAxis: {
        type: 'category',
        data: visibleData.categories,
      },
      yAxis: {
        type: 'value',
        min: -130,
        max: -30,
        name: 'RSRP (dBm)',
        nameLocation: 'end',
      },
      series: segments,
    };
  };

  return (
    <div className="page-container">
      <h1>라인차트(RSRP 강조) - selected 조건에 따라 선 색상 변경</h1>

      <label className="window-size-label">
        보여줄 최신 데이터 개수(N):
        <input
          type="number"
          value={windowSize}
          min="2"
          max={chartData.categories.length || 10}
          onChange={handleWindowSizeChange}
          disabled={isSliding}
          className="window-size-input"
          style={{ marginLeft: 6, width: 60 }}
        />
      </label>

      <ReactECharts
        option={getOption()}
        style={{ height: '500px', width: '100%' }}
        onEvents={{ datazoom: onDataZoom }}
        notMerge={true}
        lazyUpdate={true}
        windowSize={windowSize}
        sliding={isSliding}
      />

      <button
        className="play-pause-button"
        onClick={() => setIsSliding(prev => !prev)}
        aria-label={isSliding ? '중지' : '재생'}
        style={{ marginTop: 12 }}
      >
        <FontAwesomeIcon icon={isSliding ? faPause : faPlay} />
      </button>
    </div>
  );
};

export default EChartsLineDynamicChangeColorSample;
