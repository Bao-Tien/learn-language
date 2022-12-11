import classNames from 'classnames'
import React from 'react'
import { IWord } from '~root/screens/YourLibraryScreen'
import FlipCard from './FlipCard'
import * as AiIcons from 'react-icons/ai'

interface IFlipCardContainerComponentProps {
  words: IWord[]
}

export function FlipCardContainerComponent(props: IFlipCardContainerComponentProps) {
  const [currentShowingIndex, setCurrentShowingIndex] = React.useState(0)

  const handleClickNext = () => {
    setCurrentShowingIndex((prevIndex) => {
      let nextIndex = prevIndex + 1
      if (nextIndex > props.words.length - 1) {
        nextIndex = props.words.length - 1
      }
      return nextIndex
    })
  }

  const handleClickPrev = () => {
    setCurrentShowingIndex((prevIndex) => {
      let nextIndex = prevIndex - 1
      if (nextIndex < 0) {
        nextIndex = 0
      }
      return nextIndex
    })
  }

  React.useEffect(() => {
    if (!(currentShowingIndex >= 0 && currentShowingIndex <= props.words.length - 1)) {
      setCurrentShowingIndex(0)
    }
  }, [props.words.length, currentShowingIndex])

  const isDisabledBtnPrev = currentShowingIndex === 0
  const isDisabledBtnNext = currentShowingIndex === props.words.length - 1

  return (
    <div className='bg-white flex flex-col items-center rounded-system-default'>
      <FlipCard word={props.words.length > 0 ? props.words[currentShowingIndex] : undefined} />
      <div className='grid grid-cols-2 w-full p-4 px-16 gap-8'>
        <div
          className={classNames(
            'col-span-1 flex justify-center py-3 cursor-pointer rounded-system-default border border-gray-200',
            {
              'cursor-not-allowed text-gray-500': isDisabledBtnPrev,
            },
          )}
          onClick={handleClickPrev}
        >
          <AiIcons.AiOutlineArrowLeft size={24} />
        </div>
        <div
          className={classNames(
            'col-span-1 flex justify-center py-3 cursor-pointer rounded-system-default border border-gray-200',
            {
              'cursor-not-allowed text-gray-500': isDisabledBtnNext,
            },
          )}
          onClick={handleClickNext}
        >
          <AiIcons.AiOutlineArrowRight size={24} />
        </div>
      </div>
    </div>
  )
}
