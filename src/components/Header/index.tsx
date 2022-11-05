import { SearchBarComponent } from '../SearchBar'

export function HeaderComponent() {
  return (
    <div className='h-full flex items-center p-system-section w-full min-w-[50%]'>
      {/* left */}
      <SearchBarComponent />
      {/* right */}
      <div></div>
    </div>
  )
}
