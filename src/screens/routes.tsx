import { Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { YourLibraryScreen } from './YourLibraryScreen'
import { VideosScreen } from './VideosScreen'
import { VideoItemScreen } from './VideoItemScreen'
import { FolderDetails } from './FolderDetails'
import { LoginScreen } from './LoginScreen'
import { SignUpScreen } from './SignUpScreen'
import { DictionaryScreen } from './DictionaryScreen'
import { NewsScreen } from './NewsScreen'
import { NewDetailsScreen } from './NewDetailsScreen'
import React from 'react'
import AuthContext from '~root/contexts/_AuthContext'
import { HomeScreen } from './HomeScreen'

interface IAppRoute {
  path: string
  screen: JSX.Element
  layout?: React.FC<any> | React.FunctionComponent<any>
  requiredLogin?: boolean
}

const routes: IAppRoute[] = [
  { path: '/', screen: <HomeScreen />, layout: MainLayout },
  { path: '/your-library', screen: <YourLibraryScreen />, layout: MainLayout, requiredLogin: true },
  { path: '/videos', screen: <VideosScreen />, layout: MainLayout },
  { path: '/watch', screen: <VideoItemScreen /> },
  { path: '/your-library/:id', screen: <FolderDetails />, layout: MainLayout },
  { path: '/login', screen: <LoginScreen /> },
  { path: '/sign-up', screen: <SignUpScreen /> },
  { path: '/dictionary', screen: <DictionaryScreen />, layout: MainLayout },
  { path: '/news', screen: <NewsScreen />, layout: MainLayout },
  { path: '/news/:id', screen: <NewDetailsScreen />, layout: MainLayout },
]

export function AppRoutes() {
  const { isLoggedIn } = React.useContext(AuthContext)
  return (
    <Routes>
      {routes.map((route) => {
        if (route.requiredLogin && isLoggedIn === false) {
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
