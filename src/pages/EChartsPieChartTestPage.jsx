import React, { useEffect, useState, useRef } from 'react';
import EChartsPieChart from '../components/EChartsPieChart';

const initialData = [
  { value: 1048, name: '셔츠' },
  { value: 735, name: '청바지' },
  { value: 580, name: '운동화' },
  { value: 484, name: '양말' },
  { value: 300, name: '치마' },
];

const newCategoryNames = ['모자', '가방', '스웨터', '재킷', '벨트'];

const EChartsPieChartTestPage = () => {
  const [chartData, setChartData] = useState([]);
  const newCategoryIndex = useRef(0);

  useEffect(() => {
    // 초기 데이터 세팅
    setChartData(initialData);
  }, []);

  // 1초마다 랜덤으로 데이터 값 변경 (실시간 시뮬레이션)
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => {
        if (prevData.length === 0) return prevData;

        // 기존 데이터 중 하나를 랜덤 선택해서 value 변경
        const indexToUpdate = Math.floor(Math.random() * prevData.length);
        const updatedData = prevData.map((item, idx) =>
          idx === indexToUpdate
            ? { ...item, value: Math.floor(Math.random() * 1500) + 100 } // 100~1600 사이 랜덤값
            : item
        );
        return updatedData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 수동으로 새 카테고리 항목 추가
  const addNewCategory = () => {
    setChartData((prevData) => {
      if (newCategoryIndex.current >= newCategoryNames.length) return prevData; // 더 이상 추가할 이름 없음
      const newItem = {
        name: newCategoryNames[newCategoryIndex.current],
        value: Math.floor(Math.random() * 1000) + 100,
      };
      newCategoryIndex.current += 1;
      return [...prevData, newItem];
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>파이 차트 테스트 페이지 (실시간 + 수동 추가)</h1>
      <button onClick={addNewCategory} disabled={newCategoryIndex.current >= newCategoryNames.length} style={{ marginBottom: 20 }}>
        ➕ 새 카테고리 항목 추가
      </button>
      <EChartsPieChart
        title="상품 카테고리 비율"
        seriesName="카테고리"
        data={chartData}
        width="800px"
        height={500}
      />
    </div>
  );
};

export default EChartsPieChartTestPage;
