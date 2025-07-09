import AnimationWrapper from "../common/page-animation.jsx"
import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import InPageNaviagtion from "../component/InpageNavigation.jsx"
import Loading from "../common/Loading.jsx"
import BlogPostCard from "../component/blog-post-component.jsx"
import MinimalBlogPost from "../component/minimalBlogPost.jsx"

import { IoMdTrendingUp } from "react-icons/io";
const HomePage = () => {
  let [blogs, setBlogs] = useState([]);
  let [loading, setLoading] = useState(true);
  let [trendingBlogs, setTrendingBlogs] = useState([]);
  let categories = ["Technology","AI","Python","Large language Model","Machine Learning","Finance","Nueral Network", "Health", "Lifestyle", "Travel", "Food", "Education", "Finance", "Entertainment", "Sports", "Science", "Politics", "Environment", "Fashion", "Art", "History", "Culture", "Gaming", "Music", "Books", "Photography"];



  const fetchLatestBlogs = async (signal) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}api/latest-blogs`, { signal });
      console.log(data.blogs);
      setBlogs(data.blogs);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching latest blogs:", err);
      setLoading(false);
    }
  };
  const fetchTrendingBlogs = async (signal) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}api/trending-blogs`, { signal });
      console.log( "Trending blog ",data.blogs);
      setTrendingBlogs(data.blogs);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching trending blogs:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const Controller = new AbortController();
    fetchLatestBlogs(Controller.signal);
    fetchTrendingBlogs(Controller.signal);

    return () => {
      Controller.abort(); // abort the request if component unmounts
    };
  }, []);

  return (
    <AnimationWrapper>
        <section className='h-cover flex justify-center gap-10'>
            {/* this  section will be parent component which will contain left side right side  and trending blog  */}
            

            {/* latest blog */}

            <div className='w-full'>
              <InPageNaviagtion routes={["For You","Trending Blogs"]} defaultHidden={["Trending Blogs"]}>
                
                <>
                {
                  blogs===null ? <Loading/> :
                  blogs.map((blog,index)=>{
                    return <AnimationWrapper transition={{duartion:1,delay:index*0.1}} key={index}>
                      <BlogPostCard content={blog} author={blog.author.personal_info} />
                    </AnimationWrapper>
                  })
                  

                  
                }
                </>
                {/* this is the latest blog section  */}
              <>
                {
                 trendingBlogs===null ? <Loading/> :
                 trendingBlogs.map((blog,index)=>{
                  return <AnimationWrapper transition={{duartion:1,delay:index*0.1}} key={index}>
                    <MinimalBlogPost content={blog} author={blog.author.personal_info} index={index} />
                  </AnimationWrapper>
                 })
               }
               {/* this is the trending blog section  */}

              </>  
               

              </InPageNaviagtion>

            </div>


            {/* trending blogs  and filters   */}

            <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l-1 border-gray-200 pl-5 max-md:hidden">
              <div className="flex flex-col gap-6 ">
                <h1 className="font-medium text-gray-700  text-xl  text-center  mt-6 ml-10"> Staff Picks Stories From All Interests

                </h1>
                <div className="flex gap-3 flex-wrap">
                  {
                    categories.map((category, index) => {
                      return (
                        <button key={index} className="bg-gray-100 px-3 py-2 rounded-full text-gray-700 text-sm cursor-pointer hover:bg-gray-200 transition-colors">
                          {category}
                        </button>
                      )
                    })

                  }

                </div>
                 
              </div>
              <div>
                <h1 className="font-medium text-gray-700 text-[17px]  text-center mb-7 mt-5 ml-10 border-b-1 border-gray-200"> 
                  <IoMdTrendingUp className="inline-block text-xl mr-5" />
                  Trending Blogs

                </h1>
              </div >


              {
                 trendingBlogs===null ? <Loading/> :
                 trendingBlogs.map((blog,index)=>{
                  return <AnimationWrapper transition={{duartion:1,delay:index*0.1}} key={index}>
                    <MinimalBlogPost content={blog} author={blog.author.personal_info} index={index} />
                  </AnimationWrapper>
                 })
              }


            </div>
            
        </section>

    </AnimationWrapper>
   
  )
}

export default HomePage