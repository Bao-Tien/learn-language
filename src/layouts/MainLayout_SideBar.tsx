import { Button } from '@mui/material'
import classNames from 'classnames'
import React from 'react'
import * as Icons from 'react-icons/hi'
import { Link, matchRoutes, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import AuthContext from '~root/contexts/_AuthContext'

interface IMenuItem {
  icon: JSX.Element
  label: string
  path: string
}

const SSpan_IconContainer = styled.span`
  svg path {
    stroke-width: 0.075rem !important;
  }
`

const MENU_ITEMS: IMenuItem[] = [
  {
    icon: <Icons.HiHome size={24} />,
    label: 'Home',
    path: '/',
  },
  {
    icon: <Icons.HiOutlineBookOpen size={24} />,
    label: 'Your Library',
    path: '/your-library',
  },
  {
    icon: <Icons.HiOutlineFilm size={24} />,
    label: 'Videos',
    path: '/videos',
  },
  {
    icon: <Icons.HiOutlineNewspaper size={24} />,
    label: 'News',
    path: '/news',
  },
  {
    icon: <Icons.HiOutlineBookmark size={24} />,
    label: 'Dictionary',
    path: '/dictionary',
  },
]

export function MainLayout_SideBar() {
  const navigate = useNavigate()
  const { isLoggedIn, logout } = React.useContext(AuthContext)
  const location = useLocation()
  return (
    <div className='flex flex-col justify-between items-center h-screen pt-20'>
      <div className='w-full'>
        {MENU_ITEMS.map((item, index) => {
          const isMatchedRoute = matchRoutes([{ path: `${item.path}` }], location.pathname)
          // const isMatchedRoute = location.pathname.includes(item.path)
          return (
            <div key={index}>
              <Link to={item.path}>
                <div
                  className={classNames(
                    'hover:text-system-highlight flex justify-center lg:items-center py-4 lg:justify-start lg:px-6 lg:py-2  lg:text-xs lg:border-l-[0.2rem]',
                    {
                      'text-system-highlight border-system-highlight border-solid bg-system-shaded':
                        isMatchedRoute,
                    },
                    {
                      'text-system-base': !isMatchedRoute,
                    },
                  )}
                >
                  <SSpan_IconContainer className={classNames('lg:pr-2')}>
                    {item.icon}
                  </SSpan_IconContainer>
                  <span className='hidden lg:block font-bold text-sm'>{item.label}</span>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
      <div className='w-full p-4'>
        {isLoggedIn === true && (
          <Button
            className='bg-system-highlight hover:bg-system-line text-white w-full'
            onClick={logout}
          >
            Logout
          </Button>
        )}
        {isLoggedIn === false && (
          <Button
            className='bg-system-highlight hover:bg-system-line text-white w-full'
            onClick={() => {
              navigate({ pathname: '/login' })
            }}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  )
}
