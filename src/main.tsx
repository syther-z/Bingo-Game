import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './modules/redux/store.ts'
import Toast from './modules/shared/components/toast/Toast.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toast />
    </Provider>
  </StrictMode>,
)
