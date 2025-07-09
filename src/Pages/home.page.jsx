import AnimationWrapper from "../common/page-animation.jsx"
import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import InPageNaviagtion from "../component/InpageNavigation.jsx"
import Loading from "../common/Loading.jsx"
import BlogPostCard from "../component/blog-post-component.jsx"

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Controller= new AbortController();
    axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}api/latest-blogs`,{ signal: Controller.signal })
      .then(({ data }) => {
        console.log(data.blogs);
        setBlogs(data.blogs);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching latest blogs:", err);
        setLoading(false);
      });
      return ()=>{
    Controller.abort();// abort the request if component unmounts

  }
  },
  
   []);

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
                <h1> Trending Blogs here </h1>
              </InPageNaviagtion>

            </div>


            {/* trending and filters  */}

            <div>

            </div>
            
        </section>

    </AnimationWrapper>
   
  )
}

export default HomePage