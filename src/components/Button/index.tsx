interface IButtonComponentProps {
  icon: JSX.Element
  text: string
}

export function ButtonComponent(props: IButtonComponentProps) {
  return (
    <div className='flex items-center gap-1 w-fit h-fit p-2 bg-system-highlight rounded-system-input cursor-pointer'>
      {props.icon}
      <span className='font-semibold text-sm'>{props.text}</span>
    </div>
  )
}
