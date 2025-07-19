import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineLike, AiOutlineRead, AiOutlineFileText, AiOutlineUser } from 'react-icons/ai'

const UserPostCard = ({content}) => {
    console.log("UserPostCard content:", content);
    let {personal_info, account_info, social_links} = content;
    let {fullname, userName, profile_img, bio} = personal_info;
    let {total_posts, total_reads, total_likes, total_followers} = account_info;

    // Format numbers for mobile display
    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    return (
        <>
            <Link 
                to={`/user/${userName}`} 
                className="w-full block border-b border-gray-200 pb-4 mb-4 hover:bg-gray-50 transition-colors p-3 sm:p-4 rounded-lg shadow-sm"
            >
                {/* Mobile: Stack vertically, Desktop: Horizontal layout */}
                <div className="flex flex-col sm:flex-row sm:gap-6 items-start sm:items-center">
                    
                    {/* Profile Section */}
                    <div className="flex items-center gap-3 w-full sm:w-auto mb-3 sm:mb-0">
                        <div className="flex-shrink-0">
                            <img 
                                src={profile_img} 
                                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover" 
                                alt={fullname} 
                            />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                                {fullname}
                            </h2>
                            <p className="text-sm text-gray-600">@{userName}</p>
                        </div>
                    </div>
                    
                    {/* Bio Section - Hidden on very small screens, shown on larger */}
                    {bio && (
                        <div className="w-full sm:flex-1 mb-3 sm:mb-0">
                            <p className="text-sm text-gray-700 line-clamp-2 sm:line-clamp-1">
                                {bio}
                            </p>
                        </div>
                    )}
                </div>
                
                {/* Stats Section - Responsive grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mt-3 text-xs sm:text-sm text-gray-600">
                    <span className="flex items-center gap-1 sm:gap-2">
                        <AiOutlineFileText className="text-blue-500 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">
                            <span className="font-medium">{formatNumber(total_posts)}</span>
                            <span className="hidden xs:inline sm:inline"> Posts</span>
                        </span>
                    </span>
                    
                    <span className="flex items-center gap-1 sm:gap-2">
                        <AiOutlineRead className="text-green-500 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">
                            <span className="font-medium">{formatNumber(total_reads)}</span>
                            <span className="hidden xs:inline sm:inline"> Reads</span>
                        </span>
                    </span>
                    
                    <span className="flex items-center gap-1 sm:gap-2">
                        <AiOutlineLike className="text-red-500 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">
                            <span className="font-medium">{formatNumber(total_likes)}</span>
                            <span className="hidden xs:inline sm:inline"> Likes</span>
                        </span>
                    </span>
                    
                    <span className="flex items-center gap-1 sm:gap-2">
                        <AiOutlineUser className="text-purple-500 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">
                            <span className="font-medium">{formatNumber(total_followers)}</span>
                            <span className="hidden xs:inline sm:inline"> Followers</span>
                        </span>
                    </span>
                </div>
            </Link>
        </>
    )
}

export default UserPostCard