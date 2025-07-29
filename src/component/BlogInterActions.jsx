import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { FaComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";

const BlogInterActions = () => {
  const blog = useSelector((state) => state.blog);
  const user = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [isLike, setIsLike] = React.useState(false);
  const [isBookmark, setIsBookmark] = React.useState(false);


    const handleDate=(number)=>{
        if(number>1000){
            return (number/1000).toFixed(1) + 'K';

        }
        if(number>1000000){
            return (number/1000000).toFixed(1) + 'M';
        }
        return number.toString();

    }
    const handleLike = (e) => {

        setIsLike(!isLike);

      e.target.style.color = e.target.style.color === 'red' ? 'black' : 'red';
      



    }
  return (
    <div>
      <hr className='border-gray-300 my-2' />
      <div className='flex  gap-4 p-1   border-0'>

     <div className='flex items-center gap-10 max-sm:gap-5 w-full'>
        <button 
        onClick={handleLike}>
            {isLike?<FaHeart className='text-red-500 w-12 h-6 max-sm:h-7' />:<CiHeart className='w-12 h-6 max-sm:h-7' />} {handleDate(blog.activity.total_likes)}
        </button>
        <button>
            <FaComment className='text-blue-500 w-12 h-6 max-sm:h-7' /> {handleDate(blog.activity.total_comments)}
        </button>

        <button><FaEye className='text-yellow-500 w-12 h-6 max-sm:h-7' /> {handleDate(blog.activity.total_reads)}
        </button>

        <button onClick={() => setIsBookmark(!isBookmark)}>
            {isBookmark?<FaBookmark className='text-purple-500 w-12 h-6 max-sm:h-7 mb-4' />:<CiBookmark className='w-12 h-7 max-sm:h-7 mb-4' />}
           
        </button>
</div>
{
    console.log("Blog author username:", blog.author.personal_info.userName, "Current user username:", user.user)
}
{        blog.author.personal_info.userName===user.user?.userName&& (
    <Link to={`/editor/${blog.blog_id}`} className='text-gray-950 hover:underline hover:text-blue-500 ml-auto'>
       <button className='text-gray-950 text-2xl hover:underline hover:text-blue-500'>Edit</button>
       </Link>
        )}
        


      </div>

      <hr className='border-gray-300 my-2' />
    </div>
  )
}

export default BlogInterActions