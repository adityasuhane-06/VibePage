import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../component/Loader';
import AnimationWrapper from "../common/page-animation.jsx"
const ProfilePage = () => {



  const ProfileDataStructure = {
    personal_info: {
      fullname: "",
      userName: "",
      profile_img: "",
      bio: ""
    },
    account_info: {
      total_posts: 0,
      total_reads: 0,
      total_likes: 0,
      total_followers: 0
    },
    social_links: {
      twitter: "",
      facebook: "",
      instagram: "",
      github: "",
      Linkedin: "",
      website: ""
    },
    _id: "",
    joinedAt: "",
  };
    const [profileData, setProfileData] = useState(ProfileDataStructure);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('posts');
  const [isVisible, setIsVisible] = useState(false);
  const {id}= useParams();

    const fetchProfileData = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/api/user-profile`,{id});
            if (response.data.success) {
                setProfileData(response.data.user);
                setLoading(false);
                console.log("Profile data fetched successfully:", response.data.user);
            } else {
                console.error("Failed to fetch profile data:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    }

  useEffect(() => {
    if (id) {
      fetchProfileData();
    }
  }, [id]);

  const socialIcons = {
    twitter: "🐦",
    facebook: "📘", 
    instagram: "📷",
    github: "💻",
    Linkedin: "💼",
    website: "🌐"
  };

  const tabs = [
    { id: 'posts', label: 'Posts', icon: '📝' },
    { id: 'activity', label: 'Activity', icon: '⚡' },
    { id: 'followers', label: 'Followers', icon: '👥' },
    { id: 'about', label: 'About', icon: '👤' }
  ];

    return (
      <AnimationWrapper>
        {
            loading?<Loader/>:
            <section className=" md:flex flex-row-reverse justify-center items-center gap-5 min-[1100px]:w-gap-15 mt-9">
               <h1>
                Loading Profile...
               </h1>
                <div className='w-full flex flex-col max-md:items-center gap-5 min-w-[250px] max-w-2xl p-6 bg-white rounded-lg shadow-md'>
                    <img src={profileData.personal_info.profile_img} alt="" className='w-49 h-49 bg-gray-100 rounded-full md:w-27 md:h-27' />
                    <h1 className=' text-2xl font-medium flex '>{profileData.personal_info.fullname}</h1>
                    <p className='flex flex-wrap gap-8 justify-center items-center text-gray-900 text-sm'>
                    {tabs.map(tab => (
                        <span
                        key={tab.id}
                        className={`tab ${activeTab === tab.id ? 'active' : ''} ${tab.id === 'followers' ? 'ml-6' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                        >
                        {
                            tab.id !== 'about'
                            ? (<>{tab.icon} {tab.label} {profileData.account_info[`total_${tab.id}`] || 0}</>)
                            : null
                        }
                        </span>
                    ))}
                    </p>


                </div>

            </section>
        }

 
    </AnimationWrapper>
  );
};



export default ProfilePage;