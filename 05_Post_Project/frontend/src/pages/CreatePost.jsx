import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const CreatePost = () => {

  const navigate = useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();

    const formData = new FormData(e.target);
    axios.post("http://localhost:3000/create-post" , formData)
    .then((res)=>{
      
      navigate('/feed');
    })
  }
  return (
    <div>
    <Link to={"/feed"}>
      <button className="btn1" 
    onClick={'./feed'}
    >See all post</button>
    </Link>
      <section className='create-post-section'>
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
          <input type="file"  name ="image" accept='image'/>
          <input type="text" name="caption" placeholder="Enter Caption" required/>
          <button type="submit"> Submit</button>
        </form>
      </section>
    </div>
  )
}

export default CreatePost
