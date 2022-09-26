import { HeaderComponent } from '~components/Header'
import classNames from 'classnames'

interface IMainLayoutProps {
  children?: React.ReactNode
}

export function MainLayout(props: IMainLayoutProps) {
  const headerClassNames = 'left-[4.5rem] w-[calc(100vw-4.5rem)]'
  const headerLgClassNames = 'lg:left-[14rem] lg:w-[calc(100vw-14rem)]'
  return (
    <>
      {/* Header */}
      <div
        className={classNames(
          'fixed top-0 h-16 bg-green-200',
          headerClassNames,
          headerLgClassNames,
        )}
      >
        <HeaderComponent />
      </div>

      {/* Sidebar */}
      <div className='fixed top-0 left-0 w-[4.5rem] lg:w-[14rem] h-screen bg-red-300'></div>

      {/* Main content */}
      <div className='pt-16 pl-[4.5rem] lg:pl-[14rem]'>{props.children}</div>
    </>
  )
}
