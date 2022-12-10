import { NewCardComponent } from '../NewCard'

interface INewItemComponentProps {
  title: string
}

export interface INewCard {
  id: string
  imgUrl: string
  title: string
  description: string
}

const NEWS: INewCard[] = [
  {
    id: '1',
    imgUrl:
      'https://doan2-20220925-dev-imagebucket-jivszewnyq8u.s3.ap-southeast-1.amazonaws.com/cat.png',
    title: 'Food, beverage prices soar ahead of Tet',
    description:
      'Many consumer goods, including vegetables and seafood, have seen prices surge by double digits in the last month.',
  },
  {
    id: '2',
    imgUrl:
      'https://doan2-20220925-dev-imagebucket-jivszewnyq8u.s3.ap-southeast-1.amazonaws.com/cat.png',
    title: 'Food, beverage prices soar ahead of Tet',
    description:
      'Many consumer goods, including vegetables and seafood, have seen prices surge by double digits in the last month.',
  },
  {
    id: '3',
    imgUrl:
      'https://doan2-20220925-dev-imagebucket-jivszewnyq8u.s3.ap-southeast-1.amazonaws.com/cat.png',
    title: 'Food, beverage prices soar ahead of Tet',
    description:
      'Many consumer goods, including vegetables and seafood, have seen prices surge by double digits in the last month.',
  },
  {
    id: '4',
    imgUrl:
      'https://doan2-20220925-dev-imagebucket-jivszewnyq8u.s3.ap-southeast-1.amazonaws.com/cat.png',
    title: 'Food, beverage prices soar ahead of Tet',
    description:
      'Many consumer goods, including vegetables and seafood, have seen prices surge by double digits in the last month.',
  },
]

export function NewItemComponent(props: INewItemComponentProps) {
  return (
    <div className='h-96'>
      <div className='h-1 w-52 bg-system-line'></div>
      <div className='font-extrabold'>{props.title}</div>
      <div className='grid grid-flow-col grid-cols-4 gap-4 pt-3'>
        {NEWS.map((newspaper) => (
          <NewCardComponent new={newspaper} key={newspaper.id} />
        ))}
      </div>
    </div>
  )
}
