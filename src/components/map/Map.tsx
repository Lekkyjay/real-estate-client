import { Item } from '../../types'

interface IProps {
  items: Item[]
}

export default function Map({ items }: IProps) {
  return (
    <div className='map'>
      {items.map(item=>(
      <p key={item.id}>{item.title}</p>
    ))}
    </div>
  )
}