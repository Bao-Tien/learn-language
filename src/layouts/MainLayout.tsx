import { HeaderComponent } from '~components/Header'

interface IMainLayoutProps {
  children?: React.ReactNode
}

export function MainLayout(props: IMainLayoutProps) {
  return (
    <>
      <HeaderComponent />
      <div className='pt-2'>{props.children}</div>
    </>
  )
}
