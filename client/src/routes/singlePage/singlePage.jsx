import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { redirect, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import apiRequest from "../../lib/apiRequest";
import { useContext, useState } from "react";
import {AuthContext} from '../../context/AuthContext'
function SinglePage() {
  const post = useLoaderData();
  const singlePostData = post.post;
  const [saved, setSaved] = useState(singlePostData.isSaved)
  const {currentUser} = useContext(AuthContext)
  console.log('single post data res: ', singlePostData);

  const handleSave = async () => {
    setSaved(prev => !prev)
    if(!currentUser){
      redirect('/login')
    }
    try {
      await apiRequest.post('/user/save', { postId: singlePostData.id})
    } catch (error) {
      setSaved(prev => !prev)
      console.error(error)
    }
      
  }

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={singlePostData.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{singlePostData.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{singlePostData.address}</span>
                </div>
                <div className="price">$ {singlePostData.price}</div>
              </div>
              <div className="user">
                <img src={singlePostData.user.avatar} alt="" />
                <span>{singlePostData.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(singlePostData.postDetail?.desc),
              }}
            >
            </div>
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
                {singlePostData.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Renter is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {singlePostData.postDetail.pet === "Allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets Not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{singlePostData.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{singlePostData.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{singlePostData.bedroom}</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{singlePostData.bathroom}</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>
                  {singlePostData.postDetail.school > 999
                    ? singlePostData.postDetail.school / 1000 + "km"
                    : singlePostData.postDetail.school + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{singlePostData.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{singlePostData.postDetail.resturant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[singlePostData]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button onClick={handleSave} style={{ backgroundColor: saved ? '#fece51' : 'white'}}>
              <img src="/save.png" alt="" />
             {saved ? 'Place Saved' : 'Save the Place'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
