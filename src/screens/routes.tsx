import { Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { ChartsScreen } from './ChartsScreen'
import { ExploreScreen } from './ExploreScreen'
import { MusicScreen } from './MusicScreen'
import { YourLibraryScreen } from './YourLibraryScreen'
import { VideosScreen } from './VideosScreen'
import { GlobalScreen } from './GlobalScreen'
import { VideoItemScreen } from './VideoItemScreen'
import { FolderDetails } from './FolderDetails'
import { LoginScreen } from './LoginScreen'
import { SignUpScreen } from './SignUpScreen'

interface IAppRoute {
  path: string
  screen: JSX.Element
  layout?: React.FC<any> | React.FunctionComponent<any>
  requiredLogin?: boolean
}

const routes: IAppRoute[] = [
  { path: '/music', screen: <MusicScreen />, layout: MainLayout },
  { path: '/explore', screen: <ExploreScreen />, layout: MainLayout },
  { path: '/charts', screen: <ChartsScreen />, layout: MainLayout },
  { path: '/your-library', screen: <YourLibraryScreen />, layout: MainLayout },
  { path: '/videos', screen: <VideosScreen />, layout: MainLayout },
  { path: '/global', screen: <GlobalScreen />, layout: MainLayout },
  { path: '/watch', screen: <VideoItemScreen /> },
  { path: '/your-library/:id', screen: <FolderDetails />, layout: MainLayout },
  { path: '/login', screen: <LoginScreen /> },
  { path: '/sign-up', screen: <SignUpScreen /> },
]

export function AppRoutes() {
  return (
    <Routes>
      {routes.map((route) => {
        const isLogin = false
        if (route.requiredLogin && isLogin === false) {
          // Redirect to Login page
          return (
            <Route key={route.path} path='*' element={<Navigate key={route.path} to='/login' />} />
          )
        }
        let Elm = route.screen
        if (route.layout) {
          Elm = <route.layout>{Elm}</route.layout>
        }

        return <Route key={route.path} path={route.path} element={Elm} />
      })}
    </Routes>
  )
}
