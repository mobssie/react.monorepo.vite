import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style/index.scss'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { worker } from './mocks/browser'
import { RecoilRoot } from 'recoil'

if (import.meta.env.DEV) {
  worker.start()
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
)
