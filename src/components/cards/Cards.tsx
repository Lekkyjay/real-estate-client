import { listData } from '../../lib/dummyData'
import Card from '../card/Card'
import './cards.scss'

export default function Cards() {
  return (
    <div className='list'>
      {listData.map(item=>(
        <Card key={item.id} item={item}/>
      ))}
    </div>
  )
}