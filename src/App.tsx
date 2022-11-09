import { BrowserRouter } from 'react-router-dom'
import SearchInputContextProvider from './contexts/SearchInputContext'
import { AppRoutes } from './screens/routes'

function App() {
  return (
    <div className='fixed'>
      <BrowserRouter>
        <SearchInputContextProvider>
          <AppRoutes />
        </SearchInputContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
