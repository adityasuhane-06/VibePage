import { getDay } from "../common/day";
import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router-dom";
const BlogPostCard=({content,author})=>{
    let {title,banner,des,tags,publishedAt,activity:{total_likes},blog_id:_id}=content;
    let {fullname,profile_img,userName}=author;
    return (
    <>
    <Link to={`/blog/${_id}`} className="w-full flex gap-8 items-center border-b border-gray-200 pb-4 mb-4">
    <div className="w-full">
        <div className="flex gap-2 items-center mb-7">
            <img src={profile_img} className="w-6 h-6 rounded-full" alt="" />
            <p className="line-clamp-1 text-sm">{fullname}@{userName}</p>
            <p className="min-w-fit">{getDay(publishedAt)}</p>


        </div>
        <h1 className="blog-title text-start text-xl front-bold">{title}</h1>
        <p className="my-3 text-['10px'] text-start leading-7 max-sm:hidden md:max-[1100px] line-clamp-2 ">{des}</p>
        <div className="flex  gap-5 items-center">
            <span className="bg-gray-100 py-0.5 rounded-4xl  px-3 mb-2">{tags[0]}</span>
            <span className=" text-xl flex items-center gap-3 py-0.5  mb-2 ml-2"> 
                <AiOutlineLike className="inline-block  text-gray-500" />
                {total_likes} 
                </span>
        </div>
        
    </div>
    <div className="w-100 h-40 aspect-square bg-gray-200 mb-4">
    <img src={banner} className="w-full h-full object-fill rounded-lg mb-4" alt={title} />

    </div>
    </Link>
    

    </>)
}
export default  BlogPostCard;