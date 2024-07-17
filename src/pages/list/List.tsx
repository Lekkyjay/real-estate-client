import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import Card from '../../components/card/Card'
import Filter from '../../components/filter/Filter'
import Map from '../../components/map/Map'
import { IProperty } from '../../types'
import './list.scss'

export default function List() {
  const data = useLoaderData() as { properties: Promise<IProperty[]> }

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={data.properties} errorElement={<p>Error loading posts!</p>}>
              {(properties: IProperty[]) => properties.map((property) => (
                  <Card key={property.id} item={property} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Await resolve={data.properties} errorElement={<p>Error loading posts!</p>}>
            {(properties: IProperty[]) => <Map items={properties} />}
          </Await>
        </Suspense>
      </div>
    </div>
  )
}
