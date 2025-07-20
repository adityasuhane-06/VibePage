import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import { useParams,useLocation  } from 'react-router-dom';
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
 

  const location = useLocation();

  console.log("ID from params:", id);
  console.log("Location pathname:", location.pathname);

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

    const fetchAboutData = async () => {
      
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/api/aboutme`,{}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
      });
      setProfileData(response.data.user);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching about data:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const isAboutPage=location.pathname === '/about';
    if (isAboutPage) {
     fetchAboutData();
    }
    else {
      fetchProfileData();
    }
  }, [id, location.pathname]);

  const socialIcons = {
    twitter: "🐦",
    facebook: "📘", 
    instagram: "📷",
    github: "💻",
    Linkdein : "🔗",
    website: "🌐",
    youtube: "📹"
    
  };

  const tabs = [
    { id: 'posts', label: 'Posts', icon: '📝' },
    { id: 'activity', label: 'Activity', icon: '⚡' },
    { id: 'followers', label: 'Followers', icon: '👥' },
    {id:'reads', label: 'Reads', icon: '📖'},
    { id: 'about', label: 'About', icon: '👤' }
  ];
  const formatnumber = (num) => {
    if (num === null || num === undefined) return "0";
    if (num >= 1000000) return (num / 1000000).
toFixed(1) + 'M';

    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  } 
    return (
      <AnimationWrapper>
        {
            loading?<Loader/>:
            <>
                        <section className=" md:flex flex-row-reverse justify-center items-center gap-5 min-[1100px]:w-gap-15 mt-9">
                          

                <div className='w-full flex flex-col items-center  max-md:items-center gap-5 min-w-[250px] max-w-2xl p-6 bg-white rounded-lg shadow-md'>
                    <img src={profileData.personal_info.profile_img} alt="" className='w-60 h-50 bg-gray-100 rounded-full md:w-27 md:h-27 sm:w-30 sm:30 object-cover' />
                    <h1 className=' text-2xl font-medium flex '>{profileData.personal_info.fullname}</h1>
                    <p className='flex flex-wrap gap-8 justify-center items-center text-gray-900 text-sm'>
                    {tabs.map(tab => (
                        <span
                        key={tab.id}
                        className={`tab ${activeTab === tab.id ? 'active' : ''} ${tab.id === 'followers' ? 'sm:ml-6' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                        >
                        {
                            tab.id !== 'about'
                            ? (<>{tab.icon} {tab.label} {formatnumber(profileData.account_info[`total_${tab.id}`]) || formatnumber(0)}</>)
                            : null
                        }
                        </span>
                    ))}
                    </p>
                    <div className='flex flex-col gap-4 mt-2'>
                        <h2 className='text-lg font-semibold'>Bio</h2>
                        <p className='text-gray-700'>{profileData.personal_info.bio || "No bio available"}</p>

                    </div>
                    <div className='flex flex-wrap flex-col gap-4 mt-2'>
                        <h2 className='text-lg font-semibold'>Social Links</h2>
                        <div className='flex flex-wrap gap-4'>
                            {Object.entries(profileData.social_links).map(([key, value]) => (
                                value && (
                                    <a
                                        key={key}
                                        href={value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='flex items-center gap-2 text-blue-600 hover:underline'
                                    >
                                        {socialIcons[key] || '🔗'} {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </a>
                                )
                            ))}
                        </div>
                        </div>
                    <div className='flex flex-col gap-4 mt-2'>
                        <h2 className='text-lg font-semibold'>Joined At</h2>
                        <p className='text-gray-700'>{new Date(profileData.joinedAt).toLocaleDateString()}</p>

                    </div>
                    <div>
                   <button
                    className=" flex justify-center bottom-4 right-4 bg-blue-600 text-white p-1.5 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 ">
                    <span >Edit Profile</span>
                    
                </button>
                </div>





                </div>

                
               

               

            </section>
            </>

            
        }

 
    </AnimationWrapper>
  );
};



export default ProfilePage;