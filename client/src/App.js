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
import { useEffect } from 'react'
import PaymentRouter from './components/payments/PaymentRouter'
import RequestPage from './components/request-client-view/RequestPage'
import DjPage from './components/request-dj-view/DjPage'
import { DjContextWrapper } from './context/DjContext'
import { v4 as uuidv4 } from 'uuid'
import { DesignProvider } from './context/DesignContext'
import { SongRequestContextProvider } from './context/SongRequestContext'

function App() {

  useEffect(() => {
    if (!localStorage.getItem('song_request_client_id')) {
      localStorage.setItem('song_request_client_id', uuidv4())
    }
  }, [])

  return (
    <DesignProvider>
      <div
        id='app-wrapper'
      >
        <Header />
        <div id='content-flex-wrapper'>
          <Routes>
            <Route path='/*' element={<HomeRouter />} />
            <Route path='/form/*' element={<FormRouter />} />
            <Route path='/payments/*' element={<PaymentRouter />} />
            <Route
              path='/request/*'
              element={
                <SongRequestContextProvider>
                  <RequestPage />
                </SongRequestContextProvider>
              }
            />
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
        </div>

        <Footer />
      </div>
    </DesignProvider>
  )
}

export default App
