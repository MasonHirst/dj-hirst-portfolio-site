import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import Header from './components/Header'
import Footer from './components/Footer'
import FormRouter from './components/form/FormRouter'
import HomeRouter from './components/home/HomeRouter'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function App() {
  const [headerHeight, setHeaderHeight] = useState(0)

  return (
    <div style={{
      paddingTop: headerHeight
    }}>
      <Header setHeaderHeight={setHeaderHeight} />

      <Routes>
        <Route path='/*' element={<HomeRouter />} />
        <Route path='/form/*' element={<FormRouter />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
