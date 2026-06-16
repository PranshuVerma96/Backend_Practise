import  { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Feed = () => {
  const [posts, Setposts] = useState([
    {
      __id : "1",
      image:"https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption : "Beautiful Image "
    }
  ]);

  useEffect(()=>{
    axios.get("http://localhost:3000/posts")
    .then((res)=>{

      Setposts(res.data.posts);
    })
  },[])
  return (
    <>
    <Link to={'/'}>
       <button className="btn1" 
    onClick={'/'}
    >Create Post</button>
    </Link>

   <section className='feed-section'>
   {
    posts.length > 0? (
      posts.map((post) =>(
        <div key={post._id} className='post-card' >
          <img src={post.image} alt="post.caption" />
          <p>{post.caption}</p>
        </div>
      ))
    ):(
      <h1>No posts available</h1>
    )
   }
   </section>
  </>

  )
}

export default Feed
