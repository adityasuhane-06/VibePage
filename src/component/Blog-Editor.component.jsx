import React, { useState,useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo1.png'
import AnimationWrapper from '../common/page-animation'
import banner from '../assets/banner.webp'
import uploadImage from '../common/azure'
import EditorJS from '@editorjs/editorjs'

import { Toaster,toast } from 'react-hot-toast'
import {Tools,initializeEditorPlugins } from './tools.component'
import { useDispatch ,useSelector} from 'react-redux'
import { setTitle,setAuthor,setBanner,setContent,setDes,setTags } from '../features/Blog/blog'
import { TypingAnimation } from "../components/magicui/typing-animation";
const BlogEditor = ({editorSate,setEditorState}) => {
  const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

  const dispatch=useDispatch();
  const blog = useSelector((state)=>state.blog);
  const editorRef = useRef(null);
  const [isEditorReady, setIsEditorReady] = useState(false);


  useEffect(() => {
    let editor = null;
    
    const initEditor = async () => {
      try {
        editor = new EditorJS({
          holder: 'textEditor',
          data: blog.content,
          tools: Tools,
          placeholder: 'Let\'s write an awesome story!',
          autofocus: true,
          onReady: () => {
            setIsEditorReady(true);
            editorRef.current = editor;
            console.log('Editor.js is ready to work!');

            // Delay plugin initialization to ensure DOM is ready
            setTimeout(() => {
              const editorElement = document.querySelector('#textEditor');
              if (editorElement && initializeEditorPlugins) {
                try {
                  initializeEditorPlugins(editor, { 
                    enableDragDrop: false,
                    enableUndo: true 
                  });
                } catch (pluginError) {
                  console.error('Plugin initialization error:', pluginError);
                }
              }
            }, 100);
          }
        });
      } catch (error) {
        console.error('Editor initialization error:', error);
      }
    };

    initEditor();

    // Cleanup function
    return () => {
      if (editor && editor.destroy) {
        editor.isReady.then(() => {
          editor.destroy();
          editorRef.current = null;
          setIsEditorReady(false);
          console.log('Editor.js has been destroyed');
        }).catch(e => {
          console.error('ERROR destroying editor:', e);
        });
      }
    };
  }, []);


  




  const handleBannerUpload = (e) => {
    let loadingToast = toast.loading("Uploading Image...");
    let image = e.target.files[0];
    if(image ){
      uploadImage(image).then((url)=>{
        if(url){
          toast.dismiss(loadingToast);
          toast.success("Image uploaded successfully");
          console.log("url:",url);
          dispatch(setBanner(url));
        }
      })
      .catch((error)=>{
        toast.dismiss(loadingToast);
        toast.error("Image upload failed");
        console.log("Error:",error);
      })

    }
  }
 const handleTitleKeyDown=(e)=>{
  if(e.key === "Enter"){
    e.preventDefault();
    
  }
  dispatch(setTitle(e.target.value))


 }
  const handleTitleChange=(e)=>{
 
    let input = e.target;
    input.style.height = 'auto';
    input.style.height=input.scrollHeight + 'px';
    dispatch(setTitle(e.target.value))



  
  }
  const handlePublishEvent = async (e) => {
  if (!blog.title || !blog.banner) {
    toast.error("Please fill all the fields");
    return;
  }

  if (!isEditorReady || !editorRef.current) {
    toast.error("Editor not ready yet!");
    return;
  }

  try {
    const content = await editorRef.current.save();

    if (content.blocks.length) {
      const firstBlockText = content.blocks[0]?.data?.text || "";
      console.log("First block text:", firstBlockText);
      dispatch(setDes(firstBlockText));
      console.log(firstBlockText.split(" "));
      dispatch(setTags(firstBlockText.split(" ").slice(0, 5)));
    }
    else{
      toast.error("Editor content is empty!");
    }

    dispatch(setContent(content));
    console.log("Final blog content:", content);
    let datasize =content.blocks.length
  let blogdata="" 
  console.log("datasize:",datasize)
  setEditorState("publish");
  for(let i=0;i<datasize;i++){

    blogdata+=content.blocks[i].type=="paragraph"?content.blocks[i].data.text:""
    blogdata+="\n"

  }
  console.log("blogdata:",blogdata)

    toast.success("Blog content saved!");
  } catch (error) {
    console.error("Failed to save editor content:", error);
    toast.error("Error saving blog content!");
  }
};
  const showNavbar=()=>{
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.style.display = '';
    }
  }
  useEffect(() => {
  showNavbar();
}, [showNavbar]);






    const buttonStyle ="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-4xl text-sm px-5.5 py-2.5 text-center me-2 mb-2";
  return (
   <>
    
   <Toaster/>
    <nav className='flex items-center justify-between p-8 border-none bg-white '>

    <p className=' max-md:hidden items-center ml-45    text-9xl text-transparent bg-clip-text  bg-gradient-to-r from-indigo-900 to-blue-400 p-2  font-extrabold w-full'>
    <TypingAnimation>New Blog</TypingAnimation>  
    </p>
    <div className={`flex gap-2 max-md:hidden `}>
      <button className={`${buttonStyle}`}
      onClick={handlePublishEvent}>Publish </button>
       <button className={`${buttonStyle}`}>Save </button>
    </div>
   </nav> 

   <AnimationWrapper>
    <section>
      <div className='mx-auto max-w-[900px] w-full  flex flex-col gap-5 p-5'>
        <div className='relative aspect-video   bg-white border-2 border-gray-300 rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-200 opacity-80'>
          <label htmlFor='uploadBanner' className='absolute inset-0 flex items-center justify-center cursor-pointer'>
            <img
        
            src={blog.banner ? blog.banner : banner}
            alt="banner"  
            className='w-full h-full object-fill rounded-lg z-20' 
            />
            <input 
            type='file'
            id="uploadBanner" 
            accept='.jpg, .jpg ,.jpeg, .png'
            hidden
            placeholder='Upload Banner'
            onChange={handleBannerUpload}


            />
          </label>

        </div>

        <textarea name="" id=""
        value={blog.title}
        placeholder='Blog Title'
        className=' text-4xl font-medium w-full h-20 outline-none mt-3 leading-tight placeholder:opacity-40 '
        onKeyDown={handleTitleKeyDown}
        onChange={handleTitleChange}
        
        ></textarea>

        <hr className='w-full opacity-15 ' />

        <div className='content'>
        <div
       
         id='textEditor' 
         className='font-gelasio'></div>

        </div>
      </div>
    </section>
{screenWidth <= 640 && (
  <div className={`flex gap-2 justify-center items-center ml-6`}>
    <button className={`${buttonStyle}`}
    onClick={handlePublishEvent}>Publish </button>
     <button className={`${buttonStyle}`}>Save </button>
  </div>
)}



    </AnimationWrapper>
   </>
  )
}


export default BlogEditor