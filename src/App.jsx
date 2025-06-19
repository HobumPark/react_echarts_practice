import { useState } from 'react'
import './App.css'
import EChartsBarStaticLargeDatasetPage from './pages/EChartsBarStaticLargeDatasetPage'
import EChartsBarDynamicMultiChartControlPage from './pages/EChartsBarDynamicMultiChartControlPage'
import EChartsLineStaticLargeDatasetPage from './pages/EChartsLineStaticLargeDatasetPage'
import EChartsLineDynamicMultiChartControlPage from './pages/EChartsLineDynamicMultiChartControlPage'
import EChartsPieDynamicControlPage from './pages/EChartsPieDynamicControlPage'
import EChartsLineDynamicSlidingPage from './pages/EChartsLineDynamicSlidingPage'
import EChartsLineDynamicSlidingPage2 from './pages/EChartsLineDynamicSlidingPage2'
import CarBoardDynamic from './pages/board/CarBoardDynamic'
import PedBoardDynamic from './pages/board/PedBoardDynamic'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ChartNav from './pages/ChartNav'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        {/* 상단 탭 네비게이션 */}
        <ChartNav/>
        <Routes>
          <Route path="/" element={<EChartsBarStaticLargeDatasetPage />} />
          <Route path="/bar/large" element={<EChartsBarStaticLargeDatasetPage />} />
          <Route path="/bar/dynamic" element={<EChartsBarDynamicMultiChartControlPage />} />
          <Route path="/line/large" element={<EChartsLineStaticLargeDatasetPage />} />
          <Route path="/line/dynamic" element={<EChartsLineDynamicMultiChartControlPage />} />
          <Route path="/pie/dynamic" element={<EChartsPieDynamicControlPage />} />
          <Route path="/line/sliding" element={<EChartsLineDynamicSlidingPage />} />
          <Route path="/line/sliding2" element={<EChartsLineDynamicSlidingPage2 />} />
          <Route path="/board/dynamic/car" element={<CarBoardDynamic />} />
          <Route path="/board/dynamic/ped" element={<PedBoardDynamic />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
