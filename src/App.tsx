import { BrowserRouter } from 'react-router-dom'
import SearchInputContextProvider, { SearchInputContext } from './contexts/SearchInputContext'
import { AppRoutes } from './screens/routes'

function App() {
  return (
    <>
      <BrowserRouter>
        <SearchInputContextProvider>
          <AppRoutes />
        </SearchInputContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
