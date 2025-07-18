import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineLike, AiOutlineRead, AiOutlineFileText, AiOutlineUser } from 'react-icons/ai'

const UserPostCard = ({content}) => {
    // personal_info.fullname personal_info.userName personal_info.profile_img personal_info.bio account_info.total_posts account_info.total_reads account_info.total_likes account_info.total_followers social_links
    console.log("UserPostCard content:", content);
    let {personal_info, account_info, social_links} = content;
    let {fullname, userName, profile_img, bio} = personal_info;
    let {total_posts, total_reads, total_likes, total_followers} = account_info;



  return (
    <>
     <Link to={`/user/${userName}`} className="w-full flex gap-8 items-center border-b border-gray-200 pb-4 mb-4 hover:bg-gray-50 transition-colors p-4 rounded-lg">
    <div className="flex-shrink-0">
        <img src={profile_img} className="w-16 h-16 rounded-full object-cover" alt={fullname} />
    </div>
    
    <div className="flex-1">
        <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-gray-900">{fullname}</h2>
            <p className="text-sm text-gray-600">@{userName}</p>
            {bio && <p className="text-sm text-gray-700 line-clamp-2">{bio}</p>}
        </div>
        
        <div className="flex gap-6 items-center mt-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">
                <AiOutlineFileText className="text-blue-500" />
                {total_posts} Posts
            </span>
            <span className="flex items-center gap-1">
                <AiOutlineRead className="text-green-500" />
                {total_reads} Reads
            </span>
            <span className="flex items-center gap-1">
                <AiOutlineLike className="text-red-500" />
                {total_likes} Likes
            </span>
            <span className="flex items-center gap-1">
                <AiOutlineUser className="text-purple-500" />
                {total_followers} Followers
            </span>
        </div>
    </div>
    </Link>


    </>
  )
}

export default UserPostCard