import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getDay } from '../common/day';

const MinimalBlogPost = ({ content, author, index }) => {
    let {title, banner, des, tags, publishedAt, activity: {total_likes}, blog_id: _id} = content;
    let {fullname, profile_img, userName} = author;

    return (
        <Link 
            to={`/blog/${content._id}`} 
            className="w-full block border-b border-gray-200 pb-3 sm:pb-4 mb-3 sm:mb-4 hover:bg-gray-50 transition-colors p-3 sm:p-4 rounded-lg"
        >
            <div className="flex gap-3 sm:gap-5 items-start">
                {/* Index Number */}
                <h1 className='text-lg sm:text-2xl font-bold text-gray-400 min-w-[2rem] sm:min-w-[3rem] flex-shrink-0 leading-tight'>
                    {index < 9 ? `0${index + 1}` : index + 1}
                </h1>
                
                {/* Content Section */}
                <div className="flex-1 min-w-0">
                    {/* Author Info */}
                    <div className="flex gap-2 items-center mb-2 sm:mb-3">
                        <img 
                            src={profile_img} 
                            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover flex-shrink-0" 
                            alt={`${fullname}'s profile`} 
                        />
                        <p className="line-clamp-1 text-xs sm:text-sm text-gray-600 min-w-0 flex-1">
                            {fullname}@{userName}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 flex-shrink-0">
                            {getDay(publishedAt)}
                        </p>
                    </div>
                    
                    {/* Title */}
                    <h2 className='text-base sm:text-xl font-bold text-gray-900 line-clamp-2 sm:line-clamp-3 mb-1 sm:mb-2 leading-tight'>
                        {title}
                    </h2>
                    
                    {/* Description - Hidden on very small screens */}
                    {des && (
                        <p className="hidden xs:block sm:block text-gray-600 text-xs sm:text-sm line-clamp-1 sm:line-clamp-2">
                            {des}
                        </p>
                    )}
                </div>
                
                {/* Image Section */}
                <div className="w-20 h-14 sm:w-28 sm:h-20 flex-shrink-0">
                    <img 
                        src={banner} 
                        className="w-full h-full object-cover rounded-md sm:rounded-lg hover:scale-105 transition-transform duration-300" 
                        alt={title} 
                        loading="lazy" 
                    />
                </div>
            </div>
        </Link>
    );
};

export default MinimalBlogPost;