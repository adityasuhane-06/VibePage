import React from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import Loader from '../component/Loader';
import AnimationWrapper from '../common/page-animation';
import { getDay } from '../common/day';
import BlogInterActions from '../component/BlogInterActions';
import { useSelector,useDispatch } from 'react-redux';
import { setTitle, setContent, setTags, setBanner, setDes, setAuthor, setPublishedAt, setBlogId, setId, setActivity,reset } from '../features/Blog/blog';
import BlogContentBlock from '../component/BlogContentBlock';
const BlogPage = () => {
    let {blog_id} = useParams();
    const blog =useSelector((state) => state.blog);
    const dispatch = useDispatch();
let detailedBlogDataStructure = {
    title: "",
    content: [], // Array of content blocks for rich text/structured content
    des: "",
    author: {
        _id: "",
        personal_info: {}
    },
    banner: "",
    tags: [],
    publishedAt: "",
    blog_id: "",
    blogid: "",
    _id: "",
    activity: {
        total_likes: 0,
        total_comments: 0,
        total_reads: 0,
        total_parent_comments: 0
    }
};
    const [blogData, setBlogData] = React.useState(detailedBlogDataStructure);
    const [similarBlogs, setSimilarBlogs] = React.useState([]);
    const fetchBlogData = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/api/blog-details`, { blog_id }).then(({ data }) => {
                if (data) {
                    console.log("Blog data fetched successfully:", data.blog);

                    setBlogData(data.blog);
                    dispatch(setTitle(data.blog.title));
                    dispatch(setContent(data.blog.content));
                    dispatch(setTags(data.blog.tags));
                    dispatch(setBanner(data.blog.banner));
                    dispatch(setDes(data.blog.des));
                    dispatch(setAuthor(data.blog.author));
                    dispatch(setPublishedAt(data.blog.publishedAt));
                    dispatch(setBlogId(data.blog.blog_id));
                    dispatch(setId(data.blog._id));
                    dispatch(setActivity(data.blog.activity));


                    axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/api/search-blogs`, {query:data.blog.tags[0],limit:3,eliminateId:data.blog.blog_id  })
                    .then(({data}) => {
                        console.log("Related blogs fetched:", data);
                        setSimilarBlogs(data.blogs);
                    })
                    
                    
                } else {
                    console.error("Failed to fetch blog data:", data.message);
                }
            });
        }
        catch (error) {
            console.error("Error fetching blog data:", error);
        }
    }
    useEffect(() => {
        fetchBlogData();
        return () => {
            dispatch(reset()); // Reset blog state on unmount
            setSimilarBlogs([]); // Clear similar blogs state
        }
    }, [blog_id]);

  return (
    <section>
      {blog && blog._id ? <>
        <AnimationWrapper >
            <div className=" max-w-[900px] center mx-auto px-4 sm:px-6 lg:px-8 py-13">
                <img src={blog.banner} alt="banner" className='w-full h-auto rounded-lg aspect-video ' />
                <div className='mt-12 sm:mt-16'>
                    <h2 className='text-3xl font-semibold mt-4 sm:mt-6 sm:text-4xl'>{blog.title}</h2>
                    <div className='flex items-center gap-2 mt-2 sm:mt-4 max-sm:flex-col sm:flex-row justify-between my-8'>
                        <div className='flex gap-5 items-start' >
                            <img src={blog.author.personal_info.profile_img} alt="author" className='w-12 h-12 rounded-full object-cover' />
                            <p className='text-sm text-gray-600 ml-2'>
                                {blog.author.personal_info.fullname}
                                 <br />
                                 <Link to={`/user/${blog.author.personal_info.userName}`} className='text-blue-500 hover:underline'>@{blog.author.personal_info.userName}</Link>
                                 </p>

                        </div>
                       
                            <p className='text-sm text-gray-600 ml-2 opacity-75 max-sm:mt-4 max-sm:ml-20 sm:pl-5'>
                                Published on: {getDay(blog.publishedAt)}
                            </p>

                        
                    </div>

                </div>
                <BlogInterActions />
    
                <div className='my-12 font-serif blog-page-content'>
                    {
                        console.log("Blog content blocks:", blog.content[0].blocks)
                    }
                
                   {
                    blog.content[0].blocks.map((block, index) => (
                        <div className='my-4 md:my-8' key={index}>

                            <BlogContentBlock key={index} block={block} index={index} />

                        </div>
                    ))
                   }


                </div>
                <BlogInterActions/>
                {
                    similarBlogs!==null && similarBlogs.length > 0 && (
                        <>
                        <h3 className='text-xl font-semibold mt-10 mb-5'>Related Blogs</h3>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {similarBlogs.map((blog, index) => (
                                <Link to={`/blog/${blog.blog_id}`} key={index} className='block p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow hover:bg-gray-50 hover:scale-105'>
                                    <img src={blog.banner} alt={blog.title} className='w-full h-40 object-fill rounded-md mb-4' />
                                    <h4 className='text-lg font-semibold'>{blog.title}</h4>
                                    <p className='text-sm text-gray-600 mt-2'>{blog.des.slice(0, 100)}...</p>
                                </Link>
                            ))}
                        </div>
                        </>
                    )
                }


                
                

            </div>

            </AnimationWrapper>

      </> : <Loader />}
    </section>
  )
}

export default BlogPage