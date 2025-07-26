import { getDay } from "../common/day";
import React from "react";
import { FaComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogPostCard=({content,author})=>{
    let {title,banner,des,tags,publishedAt,activity:{total_likes,total_comments,total_reads},blog_id:_id}=content;
    let {fullname,profile_img,userName}=author;
        const formatLikes = (likes) => {
        if (likes >= 1000000) return (likes / 1000000).toFixed(1) + 'M';
        if (likes >= 1000) return (likes / 1000).toFixed(1) + 'K';
        return likes.toString();
    };
    return (
    <>
    <Link to={`/blog/${_id}`} className="w-full block border-b border-gray-200 pb-4 mb-4 hover:bg-gray-50 transition-colors p-3 sm:p-4 rounded-lg shadow-sm">
    {/* Mobile: Stack vertically, Desktop: Horizontal layout*/ }
    <div className="flex flex-col sm:flex-row sm:gap-6 items-start sm:items-center">

        {/* blog Content Section */} 


        {/* flex-1 means div will grow  or shrink in same propogation as the window-size and not have the starting value  will take the screen as per  screen size  available for 
            e.g:- if 3 divs are in the wrapper then each div will take 33%*/}
        <div className="w-full sm:flex-1 order-2 sm:order-2">
            
            {/* Author info */}
            <div className="flex gap-2 items-center mb-3 sm:mb-4">
                <img src={profile_img} alt="" className="w-5 h-6 sm:w-6 sm:h-7 rounded-full flex-shrink-0" />
                <p className="text-xs sm:text-sm text-gray-600 flex-1 line-clamp-1 min-w-0">
                    <Link to={`/user/${userName}`} className="hover:underline">
                        {fullname}
                    </Link>


                </p>
                <p className="text-xs sm:text-sm text-gray-500 flex-shrink-0">
                    {getDay(publishedAt)}

                </p>

            </div>

            {/* Title */}
            <h1 className=" text-lg sm:text-xl font-semibold text-gray-900 line-clamp-2 sm:line-clamp-3 mb-2 sm:mb-3 leading-tight">
                {title}
            </h1>

            {/* Description */}
            <p className=" sm:block  text-sm leading-relaxed text-gray-700 line-clamp-2 mb-3 sm:line-clamp-0" >
                {des}
            </p>
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs  sm:text-sm text-gray-500 mt-2">
                { console.log("Tags in blog post card:", tags) }
                {
                tags.map((tag, index) => (
                    <Link 
                        key={index} 
                        to={`/search/${tag}`} 
                        className="bg-gray-100 hover:bg-gray-200 px-2   sm:px-4 py-1 rounded-full transition-colors font-medium"
                    >
                        {tag}
                       
                    </Link>
                ))}
            {/* Likes */}
             </div>

        <div className="flex items-center gap-5 sm:gap-3 text-xs sm:text-sm text-gray-500 mt-3 sm:mt-6">
            <span className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 mt-3 sm:mt-6">
            <FaHeart className="w-4 h-4 flex-shrink-0 text-red-600" />
            <span className="font-medium">{formatLikes(total_likes)}</span>
        </span>
        <span className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 mt-3 sm:mt-6">
            <FaComment className="w-4 h-4 flex-shrink-0 text-blue-500" />
            <span className="font-medium">{formatLikes(total_comments)}</span>
        </span>
        <span className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 mt-3 sm:mt-6">
            <FaEye className="w-4 h-4 flex-shrink-0 text-yellow-500" />
            <span className="font-medium">{formatLikes(total_reads)}</span>
        </span>
            
        </div>        

                
                
       
            </div>



        {/* Banner Image */}
                  <div className="w-full sm:w-32 md:w-40 lg:w-48 flex-shrink-0 order-1 sm:order-2 mb-3 sm:mb-0">
                        <div className="aspect-video sm:aspect-square bg-gray-200 rounded-lg overflow-hidden">
                            <img 
                                src={banner} 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                                alt={title}
                                loading="lazy"
                            />
                        </div>
                    </div>
        </div>




    
    </Link>
    

    </>)
}
export default  BlogPostCard;