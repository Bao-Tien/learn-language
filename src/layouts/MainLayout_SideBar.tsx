import classNames from 'classnames'
import * as Icons from 'react-icons/hi'
import { Link, matchRoutes, useLocation } from 'react-router-dom'
import styled from 'styled-components'

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
    icon: <Icons.HiOutlineMusicNote size={24} />,
    label: 'My music',
    path: '/music',
  },
  {
    icon: <Icons.HiOutlineSparkles size={24} />,
    label: 'Explore',
    path: '/explore',
  },
  {
    icon: <Icons.HiOutlineChartSquareBar size={24} />,
    label: 'Charts',
    path: '/charts',
  },
  {
    icon: <Icons.HiOutlineStar size={24} />,
    label: 'Trending',
    path: '/trending',
  },
  {
    icon: <Icons.HiOutlineFilm size={24} />,
    label: 'Videos',
    path: '/videos',
  },
  {
    icon: <Icons.HiOutlineGlobe size={24} />,
    label: 'Global',
    path: '/global',
  },
]

export function MainLayout_SideBar() {
  const location = useLocation()
  return (
    <div className='flex flex-col h-screen pt-20'>
      {MENU_ITEMS.map((item, index) => {
        const isMatchedRoute = matchRoutes([{ path: `${item.path}` }], location.pathname)
        console.log(item.path, isMatchedRoute)
        return (
          <div key={index}>
            <Link to={item.path}>
              <div
                className={classNames(
                  'hover:text-system-highlight flex justify-center lg:items-center py-4 lg:justify-start lg:px-6 lg:py-2  lg:text-xs lg:border-l-[0.2rem]',
                  {
                    'text-system-highlight border-system-border border-solid bg-system-sidebar-item':
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
  )
}
