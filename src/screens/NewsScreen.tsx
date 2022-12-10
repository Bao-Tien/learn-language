import { NewItemComponent } from '~root/components/NewItem'

export function NewsScreen() {
  return (
    <div className='grid grid-flow-row gap-1 p-4'>
      <NewItemComponent title='News'></NewItemComponent>
      <NewItemComponent title='Bisiness'></NewItemComponent>
      <NewItemComponent title='Travel'></NewItemComponent>
      <NewItemComponent title='Life'></NewItemComponent>
      <NewItemComponent title='Sports'></NewItemComponent>
      <NewItemComponent title='World'></NewItemComponent>
      <NewItemComponent title='Event'></NewItemComponent>
    </div>
  )
}
