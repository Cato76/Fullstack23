import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'


import App from './App'

const getCountries = () => {
    const request = axios.get('https://restcountries.com/v3.1/all')
    return request.then(response => ReactDOM.createRoot(document.getElementById('root')).render(<App countries={response.data}/>))
    
  }
    getCountries()