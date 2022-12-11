interface IButtonComponentProps {
  icon?: JSX.Element
  text: string
}

export function ButtonComponent(props: IButtonComponentProps) {
  return (
    <div className='flex items-center justify-center gap-1 w-fit h-fit p-3 bg-system-highlight rounded-system-input cursor-pointer hover:opacity-80'>
      {props.icon}
      <span className='font-semibold text-sm'>{props.text}</span>
    </div>
  )
}
