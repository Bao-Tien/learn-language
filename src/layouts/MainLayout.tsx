import { HeaderComponent } from '~components/Header'
import classNames from 'classnames'
import styled from 'styled-components'
import { MainLayout_SideBar } from './MainLayout_SideBar'
import React from 'react'

interface IMainLayoutProps {
  children?: React.ReactNode
}

const SDiv_Container = styled.div`
  background-size: 1920px auto;
  background-repeat: repeat;
  margin-top: 0rem;
`

export function MainLayout(props: IMainLayoutProps) {
  const headerClassNames = 'left-[4.5rem] w-[calc(100vw-4.5rem)]'
  const headerLgClassNames = 'lg:left-[15rem] lg:w-[calc(100vw-15rem)]'
  return (
    <SDiv_Container className='bg-system-theme-img bg-fixed h-screen'>
      {/* Header */}
      <div className={classNames('fixed top-0 h-16', headerClassNames, headerLgClassNames)}>
        <HeaderComponent />
      </div>

      {/* Sidebar */}
      <div className='fixed top-0 left-0 w-[4.5rem] lg:w-[15rem] h-screen bg-system-sidebar lg:bg-system-sidebar-lg'>
        <MainLayout_SideBar />
      </div>

      {/* Main content */}
      <div className='pt-16 pl-[4.5rem] lg:pl-[15rem] text-system-base'>{props.children}</div>
    </SDiv_Container>
  )
}
