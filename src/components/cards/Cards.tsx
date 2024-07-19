import { IProperty } from '../../types'
import Card from '../card/Card'
import './cards.scss'

interface IProps {
  properties: IProperty[]
}

export default function Cards({ properties }: IProps) {
  
  return (
    <div className='list'>
      {properties.map(item=>(
        <Card key={item.id} item={item}/>
      ))}
    </div>
  )
}