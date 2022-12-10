import React from 'react'
import styled from 'styled-components'
import { ArrowButtonComponent } from '../ArrowButton'

const SDiv_FlipCradContainer = styled.div`
  background-color: transparent;
  width: 75%;
  height: 300px;
  perspective: 1000px;
  div {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); */
    border-radius: 0.5rem;
    .front,
    .back {
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden; /* Safari */
      backface-visibility: hidden;
    }
    .front {
      background-color: #ffffff;
      color: black;
    }
    .back {
      background-color: #fff9ff;
      color: #000000;
      /* transform: rotateY(180deg); */
    }
  }
  .btn {
  }
  .btnLeft {
    position: absolute;
    bottom: 0.5rem;
    left: calc(50% - 20.5rem);
    width: 20rem;
    height: 3rem;
  }
  .btnRight {
    position: absolute;
    bottom: 0.5rem;
    left: calc(50% + 0.5rem);
    width: 20rem;
    height: 3rem;
  }
  /* :hover div {
    transform: rotateY(180deg);
  } */
`
interface IFlipCardComponentProps {
  front: string
  back: string
}

export function FlipCardComponent({ className }: any) {
  const [front, setFront] = React.useState(true)
  console.log(front)
  return (
    <SDiv_FlipCradContainer onClick={() => setFront((prev) => !prev)}>
      <div className={className}>
        {front && (
          <div className='front'>
            <span>Truoc</span>
          </div>
        )}
        {!front && (
          <div className='back'>
            <span>Sau</span>
          </div>
        )}
        <div className='btn'>
          <div className='btnLeft'>
            <ArrowButtonComponent type='left' />
          </div>
          <div className='btnRight '>
            <ArrowButtonComponent type='right' />
          </div>
        </div>
      </div>
    </SDiv_FlipCradContainer>
  )
}
