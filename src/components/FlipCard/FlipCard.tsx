import classNames from 'classnames'
import React from 'react'
import styled from 'styled-components'
import { IWord } from '~root/screens/YourLibraryScreen'

interface IFlipCardComponentProps {
  word?: IWord
}

const SDiv_FlipCard = styled.div`
  background-color: transparent;
  perspective: 1000px;

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }

  &.flipped .flip-card-inner {
    transform: rotateX(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    color: black;
    font-size: 2rem;
    font-weight: 300;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .flip-card-back {
    transform: rotateX(180deg);
  }
`

export default function FlipCard(props: IFlipCardComponentProps) {
  const [isFlipped, setIsFlipped] = React.useState(false)

  React.useEffect(() => {
    setIsFlipped(false)
  }, [props.word?.id])

  return (
    <SDiv_FlipCard
      onClick={() => setIsFlipped((prev) => !prev)}
      className={classNames('bg-blue-300 max-h-64 h-64 aspect-[22/12]', { flipped: isFlipped })}
    >
      {props.word?.id && (
        <div className='flip-card-inner'>
          <div className='flip-card-front flex gap-2 items-center justify-center'>
            <div className='flex-1'>{props.word.front}</div>
            {props.word.frontImageUrl && (
              <div className='flex-1'>
                <img src={props.word.frontImageUrl} alt='frontImageUrl' />
              </div>
            )}
          </div>
          <div className='flip-card-back flex gap-2 items-center justify-center'>
            <div>{props.word.back}</div>
            {props.word.backImageUrl && (
              <div>
                <img src={props.word.backImageUrl} alt='backImageUrl' />
              </div>
            )}
          </div>
        </div>
      )}
    </SDiv_FlipCard>
  )
}
