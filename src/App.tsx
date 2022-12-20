import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './contexts'
import { AppRoutes } from './screens/routes'

function App() {
  return (
    <div className='fixed'>
      <BrowserRouter>
        <AppContextProvider>
          <AppRoutes />
        </AppContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
