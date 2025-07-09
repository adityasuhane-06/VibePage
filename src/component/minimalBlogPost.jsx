
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getDay } from '../common/day';
const MinimalBlogPost = ({ content, author ,index}) => {

        let {title,banner,des,tags,publishedAt,activity:{total_likes},blog_id:_id}=content;
        let {fullname,profile_img,userName}=author;
    return (
        <Link to={`/blog/${content._id}`} className="w-full flex gap-5 items-center border-b border-gray-200 pb-4 mb-4 hover:bg-gray-50 transition-colors p-4 rounded-lg">
            <h1 className='blog-index text-2xl font-bold text-gray-400 min-w-[3rem]'>{index < 9 ? `0${index + 1}` : index + 1}</h1>
            <div className="flex-1">
                <div className="flex gap-2 items-center mb-3">
                    <img src={profile_img} className="w-6 h-6 rounded-full object-cover" alt={`${fullname}'s profile`} />
                    <p className="line-clamp-1 text-sm text-gray-600">{fullname}@{userName}</p>
                    <p className="min-w-fit text-sm text-gray-500">{getDay(publishedAt)}</p>
                </div>
                <h1 className='blog-title text-start text-xl font-bold text-gray-900 line-clamp-2'>{title}</h1>
                {des && (
                    <p className="text-gray-600 text-sm text-start line-clamp-2 mt-2">
                        {des}
                    </p>
                )}
            </div>
            <div className="w-28 h-20 flex-shrink-0">
                <img src={banner} className="w-full h-full object-fill rounded-lg" alt={title} loading="lazy" />
            </div>
        </Link>

    );
};

export default MinimalBlogPost;
