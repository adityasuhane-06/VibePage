import AnimationWrapper from "../common/page-animation.jsx"
import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import InPageNaviagtion from "../component/InpageNavigation.jsx"
import Loading from "../components/magicui/Loader.jsx"
import BlogPostCard from "../component/blog-post-component.jsx"
import MinimalBlogPost from "../component/minimalBlogPost.jsx"
import { activeTabLineRef } from "../component/InpageNavigation.jsx"
import { IoMdTrendingUp, IoMdVolumeHigh } from "react-icons/io";
import NoDataMessage from "../component/noData.jsx"
import { FilterPaginationData } from "../common/FilterPaginationData.jsx"
import LoadMoreBlogs from "../component/LoadMoreBlog.jsx"
import PageNotFound from "../Pages/404.page.jsx"

import { useParams } from 'react-router-dom'
import UserPostCard from "../component/User-post-component.jsx"
const SearchPage = () => {
    let {query} = useParams();
    let [blogs, setBlogs] = React.useState(null);
    let [users, setUsers] = React.useState(null);


    const searchBlog = ({ page = 1, create_new_arr = false })=>{
        axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/api/search-blogs`,{
            query,
            page
        })
        .then(async ({data}) => {
            let formattedData =await  FilterPaginationData(
                {state:blogs,
                data:data.blogs,
                page,
                countRoute:"search-blogs-count",
                data_to_send:{query}, create_new_state:create_new_arr
            });
            setBlogs(formattedData);
            console.log("Blogs fetched by search:", data);
            console.log("Formatted blogs state:", formattedData);
            
        })
        .catch(error => {
            console.error("Error fetching blogs by search:", error);
            setBlogs([]);
        });
    }

    const resetState = () => {
        setBlogs(null);
    }

    const SearchUSer=({page=1,create_new_arr=false}) => {
        // Function to search users based on the query
        axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/api/search-users`, {
            query,
        })
        .then(async ({data}) => {
            let formattedData = await FilterPaginationData({
                state: users,
                data: data.users,
                page: 1,
                countRoute: "search-users-count",
                data_to_send: { query },
                create_new_state: create_new_arr
            });
            setUsers(formattedData);
            console.log("Users fetched by search:", formattedData);

           
            // Handle the response data as needed
        })
        .catch(error => {
            console.error("Error fetching users by search:", error);
            setUsers([]);
        });
    }







    useEffect(() => {
        resetState();
        searchBlog({page:1,create_new_arr:true});
        SearchUSer({page:1,create_new_arr:true});

    }, [query]);


    const fetchMoreBlogsByCategory = async (signal = null, page = 1) => {
        try {
            const config = signal ? { signal } : {};
            const { data } = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/api/search-blogs`, { 
                query, // Use current pageState as category
                page
            }, config);
            let formattedData = await FilterPaginationData({
                state: blogs,
                data: data.blogs,
                page,
                countRoute: "search-blogs-count",
                data_to_send: { query },
                create_new_state: false
            });
            setBlogs(formattedData);
        } catch (error) {
            console.error("Error fetching more blogs by category:", error);     
        }
    };

    const fetchMoreUsersByCategory = async (signal = null, page = 1) => {
        try {
            const config = signal ? { signal } : {};
            const { data } = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/api/search-users`, { 
                query, // Use current pageState as category
                page
            }, config);
            let formattedData = await FilterPaginationData({
                state: users,
                data: data.users,
                page,
                countRoute: "search-users-count",
                data_to_send: { query },
                create_new_state: false
            });
            setUsers(formattedData);
        } catch (error) {
            console.error("Error fetching more users by category:", error); 
        }
    };

  return (
    <AnimationWrapper>
    <section className='h-cover flex justify-center gap-10'>


        <div className='w-full'>
            <InPageNaviagtion routes={[`Search Results from "${query.charAt(0).toUpperCase()+query.slice(1)}"`,
                "Account Matched"
                ]} defaultHidden={["Account Matched"]} >
                {/* Search Results Section */}
                <>
                {
                  console.log(`Search results for "${query}":`, blogs)
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
                <LoadMoreBlogs state={blogs} fetchLatestBlogs={fetchMoreBlogsByCategory}/> 
                </>

                {/* Account Matched Section */}
                <>
                {
                    users === null ? <Loading/> :
                    users.length === 0 ? <NoDataMessage message={`No user found for ${query}`} /> :
                    users.result&&users.result.length === 0 ? <NoDataMessage message={`No user found for ${query}`} /> :
                    users.result&&users.result.map((user,index)=>{
                        console.log("User data in search page:", user);
                        return <AnimationWrapper transition={{duartion:1,delay:index*0.1}} key={index}>
                            <UserPostCard content={user} />
                        </AnimationWrapper>
                    })
                }
                {/* Load more users for search section */}
                <LoadMoreBlogs state={users} fetchLatestBlogs={fetchMoreUsersByCategory}/>
                </>

            </InPageNaviagtion>

        </div>

      { /*user data side bar */ }
        <>
        <div className="min-w-[40%] lg:min-w-[500px] max-w-min border-l-1 border-gray-200 pl-5 max-md:hidden">

              <div>
                <h1 className="font-medium text-gray-700 text-[17px]  text-center mb-7 mt-5 ml-10 border-b-1 border-gray-200"> 
                  <IoMdTrendingUp className="inline-block text-xl mr-5" />
                  Users

                </h1>
              </div >

              {
                users && users.result && users.result.length > 0 ? 
                users.result.map((user, index) => (
                    <AnimationWrapper transition={{duartion:1,delay:index*0.1}} key={index}>
                        <UserPostCard content={user} />
                    </AnimationWrapper>
                )) : 
                <NoDataMessage message={`No user found for ${query}`} />
              }

        </div>
        </>
        
    </section>

    </AnimationWrapper>
  )
}

export default SearchPage;