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
import PaymentRouter from './components/payments/PaymentRouter'
import RequestPage from './components/request-client-view/RequestPage'
import DjPage from './components/request-dj-view/DjPage'
import { DjContextWrapper } from './context/DjContext'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    console.log('getting client id')
    if (!localStorage.getItem('song_request_client_id')) {
      console.log('creating client id')
      localStorage.setItem('song_request_client_id', uuidv4())
    }
  }, [])

  return (
    <div
      style={{
        paddingTop: headerHeight,
      }}
    >
      <Header setHeaderHeight={setHeaderHeight} />
      <Routes>
        <Route path='/*' element={<HomeRouter />} />
        <Route path='/form/*' element={<FormRouter />} />
        <Route path='/payments/*' element={<PaymentRouter />} />
        <Route path='/request/*' element={<RequestPage />} />
        <Route
          path='/dj-portal/*'
          element={
            <DjContextWrapper>
              <DjPage />
            </DjContextWrapper>
          }
        />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
