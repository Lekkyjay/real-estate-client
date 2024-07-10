import { Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { Item } from '../../types'
import './pin.scss'

interface IProps {
  item: Item
}

export default function Pin({ item }: IProps) {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popupContainer">
          <img src={item.img} alt="" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  )
}