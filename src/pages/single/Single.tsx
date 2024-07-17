import { useState, useContext } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import DOMPurify from 'dompurify'
import Map from '../../components/map/Map'
import Slider from '../../components/slider/Slider'
import { IProperty } from '../../types'
import customAxios from '../../lib/customAxios'
import { AuthContext } from '../../context/AuthContext'
import './single.scss'

export default function Single() {
  const data = useLoaderData() as IProperty
  const [saved, setSaved] = useState(data.isSaved)
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSave = async () => {
    if (!currentUser) {
      navigate('/login')
    }
    
    setSaved((prev) => !prev)
    
    try {
      await customAxios.post('/users/togglesave', { propertyId: data.id })
    } 
    catch (err) {
      console.log(err)
      setSaved((prev) => !prev)
    }
  }

  
    
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={data.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{data.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{data.address}</span>
                </div>
                <div className="price">$ {data.price}</div>
              </div>
              <div className="user">
                <img src={data.avatar} alt="" />
                <span>{data.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.description)
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {data.utilities === "owner" 
                ? (
                    <p>Owner is responsible</p>
                  ) 
                : (
                    <p>Tenant is responsible</p>
                  )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {data.pet === "allowed" 
                ? (
                    <p>Pets Allowed</p>
                  ) 
                : (
                    <p>Pets not Allowed</p>
                  )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{data.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{data.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{data.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{data.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>
                  {data.school > 999
                    ? data.school / 1000 + "km"
                    : data.school + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{data.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{data.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[data]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button
              onClick={handleSave}
              style={{ backgroundColor: saved ? "#fece51" : "white" }}
            >
              <img src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
