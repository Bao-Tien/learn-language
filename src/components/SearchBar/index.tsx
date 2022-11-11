import * as IconsHi from 'react-icons/hi'
import * as IconsAi from 'react-icons/ai'
import styled from 'styled-components'
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

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
  const [searchParams] = useSearchParams()
  const queryFromUrl = searchParams.get('q')
  const [txtSearchValue, setTxtSearchValue] = React.useState(queryFromUrl ?? '')
  const navigate = useNavigate()

  const handleFormSubmit = (event: React.FormEvent<SearchKeyFormElement>) => {
    event.preventDefault() // prevent default behaviour (page refresh)
    navigate({
      pathname: '/videos',
      search: 'q=' + txtSearchValue,
    })
  }

  const handleDeleteBtnClick = () => {
    setTxtSearchValue('')
  }

  return (
    <div className='grow max-w-[50%]'>
      <form onSubmit={handleFormSubmit}>
        <div className='relative flex items-center rounded-system-input bg-system-shaded h-10'>
          <button className='absolute left-3'>
            <SSpan_IconContainer className='text-system-placeholder cursor-pointer'>
              <IconsHi.HiOutlineSearch size={24} />
            </SSpan_IconContainer>
          </button>
          <div className='absolute left-11 right-6 flex items-center'>
            <input
              placeholder='Search videos...'
              className='w-[95%] text-sm bg-inherit placeholder:text-system-placeholder focus:outline-none'
              type='text'
              onChange={(event) => setTxtSearchValue(event.target.value)}
              value={txtSearchValue}
            />
          </div>
          <SSpan_IconContainer className='absolute right-3 text-system-placeholder cursor-pointer'>
            <IconsAi.AiOutlineClose size={18} onClick={handleDeleteBtnClick} />
          </SSpan_IconContainer>
        </div>
      </form>
    </div>
  )
}
