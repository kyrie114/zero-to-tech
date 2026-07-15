import React from 'react'
import ReactDOM from 'react-dom/client'

// 引入原生的 CSS，保持样式不变
import '../css/variables.css'
import '../css/base.css'
import '../css/components.css'
import '../css/responsive.css'

import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
