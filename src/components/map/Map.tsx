import { MapContainer, TileLayer } from 'react-leaflet'
import Pin from '../pin/Pin'
import { IProperty } from '../../types'
import 'leaflet/dist/leaflet.css'
import './map.scss'

interface IProps {
  items: IProperty[]
}

export default function Map({ items }: IProps) {
  return (
    <MapContainer
      center={
        items.length === 1
          ? [items[0].latitude, items[0].longitude]
          : [52.4797, -1.90269]}
      zoom={6}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  )
}
