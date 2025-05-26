import React, { useEffect, useState } from 'react';
import EChartsPieChart from '../components/EChartsPieChart';

const initialData = [
  { value: 1048, name: '승용차' },
  { value: 735, name: '트럭' },
  { value: 580, name: '버스' },
  { value: 484, name: '오토바이' },
];

const newCategoryNames = ['대형트럭'];

const EChartsPieChartTestPage = () => {
  const [chartData, setChartData] = useState([]);
  const [newCategoryIndex, setNewCategoryIndex] = useState(0);

  // 초기 데이터 설정
  useEffect(() => {
    setChartData(initialData);
  }, []);

  // 1초마다 데이터 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => {
        if (prevData.length === 0) return prevData;

        const indexToUpdate = Math.floor(Math.random() * prevData.length);
        const updatedData = prevData.map((item, idx) =>
          idx === indexToUpdate
            ? { ...item, value: Math.floor(Math.random() * 1500) + 100 }
            : item
        );
        return updatedData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 새 카테고리 추가
  const addNewCategory = () => {
    if (newCategoryIndex >= newCategoryNames.length) return;

    const newItem = {
      name: newCategoryNames[newCategoryIndex],
      value: Math.floor(Math.random() * 1000) + 100,
    };

    setChartData((prevData) => [...prevData, newItem]);
    setNewCategoryIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>파이 차트 테스트 페이지 (실시간 + 수동 추가)</h1>
      <button
        onClick={addNewCategory}
        disabled={newCategoryIndex >= newCategoryNames.length}
        style={{ marginBottom: 20 }}
      >
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
