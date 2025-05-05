import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { createRoot } from 'react-dom/client'
import router from "./router/router.jsx"
import { RouterProvider } from 'react-router-dom'
import './index.css'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
