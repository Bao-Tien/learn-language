import * as Icons from 'react-icons/hi'
import { matchRoutes, useLocation } from 'react-router-dom'

interface IMenuItem {
  icon: JSX.Element
  label: string
  path?: string
}

const MENU_ITEMS: IMenuItem[] = [
  {
    icon: <Icons.HiOutlineMusicNote size={24} />,
    label: 'My music',
  },
  {
    icon: <Icons.HiOutlineSparkles size={24} />,
    label: 'Explore',
  },
  {
    icon: <Icons.HiOutlineChartSquareBar size={24} />,
    label: 'Charts',
  },
  {
    icon: <Icons.HiOutlineStar size={24} />,
    label: 'Trending',
  },
  {
    icon: <Icons.HiOutlineFilm size={24} />,
    label: 'Videos',
  },
  {
    icon: <Icons.HiOutlineGlobe size={24} />,
    label: 'Global',
  },
]

export function MainLayout_SideBar() {
  const location = useLocation()
  const isMatchedRoute = matchRoutes([{ path: '/listening' }], location.pathname)
  console.log(isMatchedRoute)
  return (
    <div className='flex flex-col h-full pt-20'>
      {MENU_ITEMS.map((item, index) => (
        <div
          key={index}
          className='flex justify-center gap-2 lg:justify-start px-5 items-center h-14'
        >
          <span>{item.icon}</span>
          <span className='hidden lg:block'>{item.label}</span>
        </div>
      ))}
    </div>
  )
}
