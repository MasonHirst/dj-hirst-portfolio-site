import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

if (!localStorage.getItem('song_request_client_id')) {
  localStorage.setItem('song_request_client_id', uuidv4())
}

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? window.location.protocol + '//' + window.location.hostname + ':8080'
    : window.location.origin
    
axios.defaults.baseURL = baseUrl
axios.interceptors.request.use(function (config) {
  config.headers.requesterClientId = localStorage.getItem('song_request_client_id')
  return config
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
