
import React, { useEffect, useRef, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { IoMdClose } from "react-icons/io"
import { useSelector, useDispatch } from 'react-redux'
import { setTitle, setAuthor, setBanner, setContent, setDes, setTags } from '../features/Blog/blog'
import AnimationWrapper from '../common/page-animation'

// Tag Component
const Tag = ({ tag }) => {
  const tags = useSelector((state) => state.blog.tags)
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(tag)

  const handleRemove = () => {
    const newTags = tags.filter(t => t !== tag)
    dispatch(setTags(newTags))
    toast.success('Tag removed')
  }

  const handleEdit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const newTag = editValue.trim()
      
      if (newTag && newTag !== tag) {
        if (tags.includes(newTag)) {
          toast.error('Tag already exists')
          setEditValue(tag)
        } else {
          const newTags = tags.map(t => t === tag ? newTag : t)
          dispatch(setTags(newTags))
          toast.success('Tag updated')
        }
      }
      setIsEditing(false)
    } else if (e.key === "Escape") {
      setEditValue(tag)
      setIsEditing(false)
    }
  }

  return (
    <div className='relative inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-all duration-200 group'>
      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleEdit}
          onBlur={() => {
            setEditValue(tag)
            setIsEditing(false)
          }}
          className='bg-transparent outline-none text-sm font-medium text-gray-700 w-20'
          autoFocus
        />
      ) : (
        <p
          onClick={() => setIsEditing(true)}
          className='text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900'
        >
          {tag}
        </p>
      )}
      <button
        onClick={handleRemove}
        className='ml-1 p-1 rounded-full hover:bg-red-100 transition-colors duration-200 group-hover:opacity-100 opacity-0'
        aria-label={`Remove ${tag} tag`}
      >
        <IoMdClose className='w-4 h-4 text-gray-500 hover:text-red-600' />
      </button>
    </div>
  )
}
export default Tag