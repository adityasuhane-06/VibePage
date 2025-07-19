import AnimationWrapper from "../common/page-animation.jsx"
import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import InPageNaviagtion from "../component/InpageNavigation.jsx"
import Loading from "../component/Loader.jsx"
import BlogPostCard from "../component/blog-post-component.jsx"
import MinimalBlogPost from "../component/minimalBlogPost.jsx"
import { IoMdTrendingUp, IoMdVolumeHigh } from "react-icons/io";
import NoDataMessage from "../component/noData.jsx"
import { FilterPaginationData } from "../common/FilterPaginationData.jsx"
import LoadMoreBlogs from "../component/LoadMoreBlog.jsx"
import PageNotFound from "../Pages/404.page.jsx"

const HomePage = () => {
  let [blogs, setBlogs] = useState(null);
  /* pagination state
  bogs=[{},{},{}]
  -> 
  blogs={result:[{},{},{},{},{}]
  page:1
  toaldoc:10 10-5=/0 so we request again  for 5 blogs
  } this will be used to store the blogs fetched from the server for page rendering 
  */

  let [trendingBlogs, setTrendingBlogs] = useState(null);
 let [isCategorySelected, setIsCategorySelected] = useState(false);
  let categories = ["Technology","AI","Python","Large language Model","Machine Learning","Fitness","Neural Network", "Health", "Lifestyle", "Travel", "Food", "Education", "Finance", "Entertainment", "Sports", "Science", "Politics", "Environment", "Fashion", "Art", "History", "Culture", "Gaming", "Music", "Books", "Photography"];
  let [pageState, setPageState] = useState("For You");
  //  page state will be used to determine which page is currently active bydefault it will be "For You" and when user clicks on trending blogs it will be set to "Trending Blogs or when user clicks on category it will be set to that category name"



  // Create a separate function for fetching more blogs by category
const fetchMoreBlogsByCategory = async (signal = null, page = 1) => {
  try {
    const config = signal ? { signal } : {};
    const { data } = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/api/search-blogs`, { 
      query: pageState, // Use current pageState as category
      page 
    }, config);

    if (data.blogs && data.blogs.length > 0) {
      let formattedBlogs = await FilterPaginationData({
        state: blogs,
        data: data.blogs,
        page: page,
        countRoute: "search-blogs-count",
        data_to_send: { query: pageState },
        create_new_state: false // Append to existing state
      });
      setBlogs(formattedBlogs);
    }
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error("Error fetching more blogs by category:", err);
    }
    throw err;
  }
};

const loadByCategory = (e) => {
  const category = e.target.innerText.toLowerCase();
  console.log("Category selected:", category);
  
  setBlogs(null); // Reset blogs to null to show loading state
  
  // If clicking on the same category, deselect it and show latest blogs
  if(pageState === category) {
    setPageState("For You");
    fetchLatestBlogs(); // Reload latest blogs when deselecting
    setIsCategorySelected(false); // Reset category selected state
    return;
  }
  
  setPageState(category);
  setIsCategorySelected(true); // Set category selected state to true
  
  //Make an API call to fetch blogs by category  
  axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/api/search-blogs`,{
    "query": category,
    "page": 1
  })
  .then(async response => {
    console.log("Blogs fetched by category:", response.data);
    if(response.data.blogs && response.data.blogs.length > 0){
      console.log("Blogs by category:", response.data.blogs);
      
      let formattedBlogs = await FilterPaginationData({
        state: null, // Reset state for new category
        data: response.data.blogs,
        page: 1, // Reset to first page
        countRoute: "search-blogs-count",
        data_to_send: { query: category },
        create_new_state: true// Create a new state array
      });
      setBlogs(formattedBlogs); // Update blogs state with formatted data
      console.log("Formatted Blogs fetched by category:", formattedBlogs);
    }
    else{
      console.log("No blogs found for this category.");
      // Set proper structure for empty results
      setBlogs({ 
        result: [], 
        page: 1, 
        totalDocs: 0,
        deletedDocs: 0,
        user: null,
        draft: false
      });
    }
  })
  .catch(error => {
    console.error("Error fetching blogs by category:", error);
    // Set proper structure for error cases
    setBlogs({ 
      result: [], 
      page: 1, 
      totalDocs: 0,
      deletedDocs: 0,
      user: null,
      draft: false
    });
  });
};



  const fetchLatestBlogs = async (signal = null, page = 1) => {
    try {
      const config = signal ? { signal } : {};
      const { data } = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/api/latest-blogs`, { page }, config);
     

      // Format the blogs data using FilterPaginationData
      let formatedBlogs = await FilterPaginationData({
        state: blogs,
        data: data.blogs,
        page: page,
        countRoute: "all-latest-blogs",
      });
      setBlogs(formatedBlogs);
      
      
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error("Error fetching latest blogs:", err);
        
      }
      throw err; // Re-throw so LoadMore component can handle the error
    }
  };
  const fetchTrendingBlogs = async (signal=null,page=1) => {
    try {
      let config = signal ? { signal } : {};
      const { data } = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/api/trending-blogs`, { page }, config);
      
      let formatData=await FilterPaginationData({
      
        state: trendingBlogs,
        data: data.blogs,
        page: page ,
        countRoute: "all-latest-blogs",
       
      });
      setTrendingBlogs(formatData);
      
    } catch (err) {
      console.error("Error fetching trending blogs:", err);
      
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
              <InPageNaviagtion routes={[pageState.charAt(0).toUpperCase()+pageState.slice(1),"Trending Blogs"]} defaultHidden={["Trending Blogs"]}>
                
                <>
                {
                  console.log(`Blogs state by ${isCategorySelected?"load category":" latest blog"}`, blogs)
                }
                {
                  blogs === null ? <Loading/> :
                  blogs.length === 0 ? <PageNotFound /> :
                  
                  blogs.result&&blogs.result.length === 0 ?<PageNotFound /> :
                   blogs.result&&blogs.result.map((blog,index)=>{
                    return <AnimationWrapper transition={{duartion:1,delay:index*0.1}} key={index}>
                      <BlogPostCard content={blog} author={blog.author.personal_info} />
                    </AnimationWrapper>
                  })
                }               
                {/* {pageState==="For You"} */}
                { isCategorySelected ?
                  <LoadMoreBlogs state={blogs} fetchLatestBlogs={fetchMoreBlogsByCategory}  />:
                  <LoadMoreBlogs state={blogs} fetchLatestBlogs={fetchLatestBlogs}/> 
                }
                </>


                {/* this is the latest blog section  */}
              <>
                {

                 trendingBlogs === null ? <Loading/> :
                 trendingBlogs.result && trendingBlogs.result.length === 0 ? <NoDataMessage message="No trending blogs available at the moment." /> :
                trendingBlogs.result && trendingBlogs.result.map((blog,index)=>{
                  return <AnimationWrapper transition={{duartion:1,delay:index*0.1}} key={index}>   
                    <MinimalBlogPost content={blog} author={blog.author.personal_info} index={index} />
                  </AnimationWrapper>
                 })
               }
                {/* Load more blogs for trending section */}
                <LoadMoreBlogs state={trendingBlogs} fetchLatestBlogs={fetchTrendingBlogs}/>
               {/* this is the trending blog section  */}

              </>  
               

              </InPageNaviagtion>

            </div>


            {/* trending blogs  and filters   */}

               <>
               <div className="min-w-[40%] lg:min-w-[500px] max-w-min border-l-1 border-gray-200 pl-5 max-md:hidden">
              <div className="flex flex-col gap-6 ">
                <h1 className="font-medium text-gray-700  text-xl  text-center  mt-6 ml-10"> Staff Picks Stories From All Interests

                </h1>
                <div className="flex gap-3 flex-wrap">
                  {
                    categories.map((category, index) => {
                      return (
                        <button key={index} 
                        onClick={ loadByCategory}
                        className={`bg-gray-100 px-3 py-2 rounded-full text-gray-700 text-sm cursor-pointer hover:bg-gray-200 transition-colors ${
                          pageState === category.toLowerCase() ? "bg-gray-800 text-white" : ""}`}>
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
                 trendingBlogs === null ? <Loading/> :
                trendingBlogs.result && trendingBlogs.result.length === 0 ? <NoDataMessage message="No trending blogs available." /> :
                trendingBlogs.result &&  trendingBlogs.result.map((blog,index)=>{
                  return <AnimationWrapper transition={{duartion:1,delay:index*0.1}} key={index}>
                    <MinimalBlogPost content={blog} author={blog.author.personal_info} index={index} />
                  </AnimationWrapper>
                 })
              }
              <LoadMoreBlogs state={trendingBlogs} fetchLatestBlogs={fetchTrendingBlogs}/>


            </div>
               </>
            
            
        </section>

    </AnimationWrapper>
   
  )
}

export default HomePage