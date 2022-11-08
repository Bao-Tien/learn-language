import styled, { keyframes } from 'styled-components'
import { ReactComponent as SVG_RoundedLoading } from '~assets/rounded-loading.svg'
import classNames from 'classnames'

const infinityRotating = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const SIZE_OF_LOADING = 1.5 // rem

const RoundedLoadingSVG = styled(SVG_RoundedLoading)`
  position: relative;
  max-width: ${SIZE_OF_LOADING}rem;
  max-height: ${SIZE_OF_LOADING}rem;
  animation-name: ${infinityRotating};
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  & circle.loading_background {
    stroke: ${() => 'var(--text-system-highlight)'};
    opacity: 0.2;
  }
  & circle.loading_indicator_part {
    stroke: ${() => 'var(--text-system-highlight)'};
    stroke-dasharray: 80;
    stroke-dashoffset: 60;
  }
`

const SFixedCenterOfParent = styled(RoundedLoadingSVG)`
  position: absolute;
  left: calc(50% - ${SIZE_OF_LOADING / 2}rem);
  top: calc(50% - ${SIZE_OF_LOADING / 2}rem);
  transform: translate(-50%, -50%);
`

interface IRoundedLoadingProps {
  expandToFullParent: boolean
  fixedCenterOfParent: boolean
  containerClassName: string
}

RoundedLoading.defaultProps = {
  expandToFullParent: false,
  fixedCenterOfParent: false,
  containerClassName: '',
}

export default function RoundedLoading(props: IRoundedLoadingProps) {
  if (props.fixedCenterOfParent) {
    return <SFixedCenterOfParent className={classNames(props.containerClassName)} />
  } else if (props.expandToFullParent) {
    return (
      <div
        className={classNames(
          'flex flex-column w-full h-full items-center justify-center',
          props.containerClassName,
        )}
      >
        <RoundedLoadingSVG />
      </div>
    )
  } else {
    return (
      <div className={classNames(props.containerClassName)}>
        <RoundedLoadingSVG />
      </div>
    )
  }
}
