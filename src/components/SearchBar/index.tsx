import * as IconsHi from 'react-icons/hi'
import * as IconsAi from 'react-icons/ai'
import styled from 'styled-components'
import React from 'react'
import { SearchInputContext } from '~root/contexts/SearchInputContext'

const SSpan_IconContainer = styled.span`
  svg path {
    stroke-width: 0.075rem !important;
  }
`

interface FormElements extends HTMLFormControlsCollection {
  searchKeyInput: HTMLInputElement
}
interface SearchKeyFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export function SearchBarComponent() {
  const [searchKey, setSearchKey] = React.useState('')

  //context
  const { updateSearchInput } = React.useContext(SearchInputContext)

  const handleFormSubmit = (event: React.FormEvent<SearchKeyFormElement>) => {
    event.preventDefault() // 👈️ prevent page refresh
    updateSearchInput(event.currentTarget.elements.searchKeyInput.value)
  }

  return (
    <div className='grow max-w-[50%]'>
      <form onSubmit={handleFormSubmit}>
        <div className='relative flex items-center rounded-system-input bg-system-input h-10'>
          <button className='absolute left-3'>
            <SSpan_IconContainer className='text-system-placeholder cursor-pointer'>
              <IconsHi.HiOutlineSearch size={24} />
            </SSpan_IconContainer>
          </button>
          <div className='absolute left-11 right-6 '>
            <input
              placeholder='Search videos...'
              className='w-[95%] text-sm bg-inherit placeholder:text-system-placeholder focus:border-0'
              type='text'
              id='searchKeyInput'
              name='searchKeyInput'
              onChange={(event) => setSearchKey(event.target.value)}
              value={searchKey}
            />
          </div>
          <SSpan_IconContainer className='absolute right-3 text-system-placeholder cursor-pointer'>
            <IconsAi.AiOutlineClose size={18} />
          </SSpan_IconContainer>
        </div>
      </form>
    </div>
  )
}