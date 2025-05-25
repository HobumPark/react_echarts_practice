import React, { useState, useEffect } from 'react';
import EChartsLineChart from '../components/EChartsLineChart';

const vehicleTypes = ['승용차', '버스', '트럭', '오토바이'];

const generateTimestamp = (baseTime, offsetMinutes) => {
  const date = new Date(baseTime.getTime() + offsetMinutes * 60000);
  return date.toISOString().slice(0, 16).replace('T', ' ');
};

const createInitialChartData = (index) => {
  const now = new Date();
  const fullTimestamps = Array.from({ length: 4 }, (_, i) =>
    generateTimestamp(now, i)
  );

  const series = [
    {
      name: `진입 차량 - ${vehicleTypes[index]}`,
      data: Array.from({ length: 4 }, () => Math.floor(Math.random() * 30) + 10),
    },
    {
      name: `진출 차량 - ${vehicleTypes[index]}`,
      data: Array.from({ length: 4 }, () => Math.floor(Math.random() * 25) + 5),
    },
  ];

  return {
    fullTimestamps,
    series,
    categories: [], // 필요 없어졌지만 EChartsLineChart prop 위해 유지
  };
};

const EChartsLineChartTestPage2 = () => {
  const [chartDatas, setChartDatas] = useState([
    createInitialChartData(0),
    createInitialChartData(1),
    createInitialChartData(2),
    createInitialChartData(3),
  ]);

  const addRandomDataToChart = (index) => {
    const now = new Date();
    setChartDatas((prev) =>
      prev.map((data, i) => {
        if (i !== index) return data;

        const nextMinute = data.fullTimestamps.length;
        const newTimestamp = generateTimestamp(now, nextMinute);

        return {
          ...data,
          fullTimestamps: [...data.fullTimestamps, newTimestamp],
          series: data.series.map((s) => ({
            ...s,
            data: [...s.data, Math.floor(Math.random() * 30) + 10],
          })),
        };
      })
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 4);
      console.log(`💡 랜덤 데이터 추가 → 차트 ${randomIndex + 1}`);
      addRandomDataToChart(randomIndex);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>라인 차트 테스트 페이지 (자동+수동 데이터 추가)</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
        }}
      >
        {chartDatas.map((data, idx) => (
          <div
            key={idx}
            style={{
              border: '1px solid #ccc',
              padding: 10,
              borderRadius: 8,
              backgroundColor: '#fafafa',
            }}
          >
            <EChartsLineChart
              title={`차트 ${idx + 1} - ${vehicleTypes[idx]}`}
              categories={[]} // 무시됨
              fullTimestamps={data.fullTimestamps}
              series={data.series}
              height={300}
            />
            <button
              onClick={() => addRandomDataToChart(idx)}
              style={{ marginTop: 10, width: '100%' }}
            >
              ▶ 차트 {idx + 1} 수동 추가
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EChartsLineChartTestPage2;
