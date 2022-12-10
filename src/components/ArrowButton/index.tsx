import * as IconsAi from 'react-icons/ai'

interface IArrowButtonComponentProps {
  // icon: JSX.Element
  type: 'left' | 'right'
}

export function ArrowButtonComponent(props: IArrowButtonComponentProps) {
  return (
    <div className='flex items-center justify-center gap-1  p-2 border-gray-200 border rounded-system-default cursor-pointer text-system-base hover:border-gray-400'>
      {props.type === 'left' && <IconsAi.AiOutlineArrowLeft size={24} />}
      {props.type === 'right' && <IconsAi.AiOutlineArrowRight size={24} />}
    </div>
  )
}
