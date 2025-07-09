import AnimationWrapper from '../common/page-animation'
import React, { use } from 'react'
import { Toaster,toast } from 'react-hot-toast'
import { IoMdClose } from "react-icons/io";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setTitle, setAuthor, setBanner, setContent, setDes, setTags } from '../features/Blog/blog'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Tag from './tag'

const PublishForm = ({ editorState, setEditorState }) => {
  let navigate = useNavigate()
  const blog = useSelector((state) => state.blog)
  const User= useSelector((state) => state.auth.data.user)
  const dispatch = useDispatch()
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    const navbar = document.querySelector('.navbar')
    if (navbar) {
      navbar.style.display = 'none'
    }
    
    return () => {
      if (navbar) {
        navbar.style.display = ''
      }
    }
  }, [])

  const handleClose = () => {
    setEditorState("editor")
  }

  const handleAddTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const tag = tagInput.trim()
      
      if (!tag) {
        toast.error("Tag cannot be empty")
        return
      }
      
      if (blog.tags.includes(tag)) {
        toast.error("Tag already exists")
        return
      }
      
      if (blog.tags.length >= 10) {
        toast.error("Maximum 10 tags allowed")
        return
      }
      
      dispatch(setTags([...blog.tags, tag]))
      setTagInput('')
      toast.success('Tag added')
    }
  }
  const PublishBlog = (e) => {
    

    if(e.target.classList.contains('disabled')) {
      return 
    }

    if (blog.tags.length > 10) {
      toast.error("You can only add up to 10 tags")
    }
    if (blog.des.length > 200) {
      toast.error("Description cannot exceed 200 characters")
      return
    }
    if (blog.title.length > 100) {
      toast.error("Title cannot exceed 100 characters")
      return
    }
    if (!blog.content || blog.content.length < 100) {
      toast.error("Content must be at least 100 characters long")
      return
    }
    if (!blog.banner) {
      toast.error("Please upload a banner image") 
      return
    }
    let loadingToast = toast.loading("Publishing your blog...")

    e.target.classList.add('disabled')
    let blogObject={
      title: blog.title,
      banner: blog.banner,
      des: blog.des,
      content: blog.content,
      tags: blog.tags,
      draft: false,

    }

    let token= localStorage.getItem('accessToken');
    axios.post("http://localhost:3000/api/create-blog",blogObject,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
     } }).then(()=>{
      e.target.classList.remove('disabled')
      toast.dismiss(loadingToast)
      toast.success("Blog published successfully!")
      setTimeout(() => {
        navigate("/")
     },500)
    })
    .catch(({response}) => {
      e.target.classList.remove('disabled')
      toast.dismiss(loadingToast)
      toast.error("Failed to publish blog. Please try again later.",response)
   } );


    
    // Reset the form after publishing
    dispatch(setTitle(''));
    dispatch(setDes(''))
    dispatch(setBanner(''))
    dispatch(setTags([]))
    dispatch(setContent(''))
    e.target.classList.remove('disabled')
  }

  return (
    <AnimationWrapper>
      <section className='w-screen min-h-screen bg-white'>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className='fixed top-8 right-8 z-50 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 group'
          aria-label="Close publish form"
        >
          <IoMdClose className='w-6 h-6 text-gray-600 group-hover:text-gray-900' />
        </button>

        <div className='container mx-auto px-4 py-12 lg:py-16'>
          <div className='grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto'>
            {/* Preview Section */}
            <div className='space-y-6'>
              <h2 className='text-4xl lg:text-5xl font-bold text-gray-900'>Preview</h2>
              
              <div className='relative w-full aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-md'>
                {blog.banner ? (
                  <img 
                    src={blog.banner} 
                    alt="Blog banner preview" 
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='flex items-center justify-center h-full text-gray-400'>
                    <p>No banner image uploaded</p>
                  </div>
                )}
              </div>
              
              <div className='space-y-4'>
                <h1 className='text-3xl lg:text-4xl font-bold text-gray-900 line-clamp-2'>
                  {blog.title || "Your blog title will appear here"}
                </h1>
                <p className='text-lg lg:text-xl text-gray-600 leading-relaxed line-clamp-3'>
                  {blog.des || "Your blog description will appear here..."}
                </p>
              </div>
            </div>

            {/* Form Section */}
            <div className='space-y-8'>
              <h2 className='text-3xl font-bold text-gray-900'>Publishing Details</h2>
              
              {/* Title Input */}
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-700'>
                  Blog Title
                </label>
                <input
                  type="text"
                  placeholder='Enter your blog title'
                  defaultValue={blog.title}
                  onChange={(e) => dispatch(setTitle(e.target.value))}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200'
                  maxLength={100}
                />
              </div>

              {/* Description Input */}
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-700'>
                  Short Description
                </label>
                <textarea
                  placeholder='Write a brief description about your blog...'
                  defaultValue={blog.des}
                  onChange={(e) => {
                    if (e.target.value.length <= 200) {
                      dispatch(setDes(e.target.value))
                    } else {
                      toast.error("Maximum 200 characters allowed")
                    }
                  }}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none h-32'
                  maxLength={200}
                />
                <p className='text-xs text-gray-500 text-right'>
                  {200 - (blog.des?.length || 0)} characters remaining
                </p>
              </div>

              {/* Tags Input */}
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-700'>
                  Topics / Tags
                  <span className='text-xs text-gray-500 ml-2'>
                    (Helps in searching and ranking your blog)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder='Add a topic and press Enter'
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200'
                />
                
                {/* Tags Display */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className='flex flex-wrap gap-2 mt-4'>
                    {blog.tags.map((tag, index) => (
                      <Tag key={`${tag}-${index}`} tag={tag} />
                    ))}
                  </div>
                )}
                
                <p className='text-xs text-gray-500'>
                  {blog.tags ? `${blog.tags.length}/10 tags added` : '0/10 tags added'}
                </p>
              </div>

              {/* Publish Button */}
              <button
                className='w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] mt-8'
                onClick={PublishBlog}
              >
                Publish Blog
              </button>
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  )
}

export default PublishForm