import {format} from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LikesRoute, host, isLikedRoute } from '../utils/ApiRoutes';
import { ToastContainer, toast } from 'react-toastify';
const Post = ({_id,title,summary,cover,createdAt,author}) => {
  const toastoptions = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
}
  const navigate = useNavigate();
  const [likes, setlikes] = useState(0);
      const [isliked, setisliked] = useState(false);
      const isLikedFunc=async(id)=>{
        const response  = await fetch(`${isLikedRoute}/${id}`,{
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        });
        const json=await response.json();
        if(json.success){
          setisliked(json.like);
          setlikes(json.likes);
        }
        else{
          toast.error("Error Commenting",toastoptions);
        }
      }
      const noOfLikes=async(id)=>{
        const response  = await fetch(`${LikesRoute}/${id}`,{
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        });
        const json=await response.json();
        if(json.success){
          setlikes(json.likes);
          setisliked(json.isLiked);
        }
        else{
          toast.error("Error Commenting",toastoptions);
        }
      }
      useEffect(() => {
        noOfLikes(_id);
      }, [])
      
  return (
    <div className='post' id='post'>
      <div className='imgDiv' onClick={()=>{navigate(`/post/${_id}`)}}>
          <img className='postImg' src={`${host}/${cover}`} alt="IMAGE" />
      </div>
      <div className='contentDiv' >
        <h2 className='postTitle'onClick={()=>{navigate(`/post/${_id}`)}} >{title}</h2>
        <div className='authTime' >
          <p className='postAuthor' >{author.name}</p>
          <p className='postTime' >{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</p>
        </div>
        <p className='postSummary'onClick={()=>{navigate(`/post/${_id}`)}} >{summary}</p>
        <div className="likeDiv2" onClick={()=>isLikedFunc(_id)}>
          <button className="l-Btn">
            <span className={`leftContainer ${isliked?"hoverbtn":""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#fff"><path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"></path></svg>
              <span className="like">Like</span>
            </span>
            <span className={`likeCount ${isliked?"hovercount":""}`} >
              {likes}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Post
