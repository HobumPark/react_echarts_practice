import React, { useState, useEffect } from 'react';
import EChartsBarChart from '../components/EChartsBarChart';

// 차량 종류 리스트
const vehicleTypes = ['승용차', '트럭', '버스', '오토바이'];

// 초기 차트 데이터 생성
const createInitialChartData = (index) => {
  const now = new Date();
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const label = `${hour}:${minute}`;
  const fullTimestamp = now.toISOString().slice(0, 16).replace('T', ' '); // "YYYY-MM-DD HH:mm"

  return {
    vehicleType: vehicleTypes[index],
    categories: [label],
    fullTimestamps: [fullTimestamp],
    series: [
      {
        name: '진입 차량 수',
        data: [Math.floor(Math.random() * 30) + 10],
      },
      {
        name: '진출 차량 수',
        data: [Math.floor(Math.random() * 25) + 5],
      },
    ],
  };
};


// 시간 증가 유틸
const getNextTime = (prevTimeStr) => {
  const [hour, minute] = prevTimeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hour, minute + 1, 0, 0);
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  const label = `${h}:${m}`;
  const full = date.toISOString().slice(0, 16).replace('T', ' ');
  return { label, full };
};

const EChartsBarChartTestPage2 = () => {
  const [chartDatas, setChartDatas] = useState(
    Array.from({ length: 4 }, (_, i) => createInitialChartData(i))
  );

  const addRandomDataToChart = (index) => {
  setChartDatas((prev) =>
    prev.map((data, i) => {
      if (i !== index) return data;

      const lastTime = data.categories[data.categories.length - 1];
      const { label: nextTime, full: nextFullTimestamp } = getNextTime(lastTime);

      return {
        ...data,
        categories: [...data.categories, nextTime],
        fullTimestamps: [...data.fullTimestamps, nextFullTimestamp],
        series: [
          {
            ...data.series[0],
            data: [...data.series[0].data, Math.floor(Math.random() * 30) + 10],
          },
          {
            ...data.series[1],
            data: [...data.series[1].data, Math.floor(Math.random() * 25) + 5],
          },
        ],
      };
    })
  );
};

  // 1초마다 무작위 차트에 데이터 추가
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 4);
      console.log(`💡 ${vehicleTypes[randomIndex]} 차트에 랜덤 데이터 추가`);
      addRandomDataToChart(randomIndex);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>막대 차트 테스트 페이지 (자동+수동 데이터 추가)</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
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
            <EChartsBarChart
              title={`${data.vehicleType} 통행량`}
              categories={data.categories}
              series={data.series}
              fullTimestamps={data.fullTimestamps} // ✅ 전달
              height={300}
            />
            <button
              onClick={() => addRandomDataToChart(idx)}
              style={{ marginTop: 10, width: '100%' }}
            >
              ▶ {data.vehicleType} 수동 데이터 추가
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EChartsBarChartTestPage2;
