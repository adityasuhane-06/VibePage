import React, { use } from 'react';
import { useNavigate,useLocation,useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { Toaster,toast } from 'react-hot-toast';
import AnimationWrapper from '../common/page-animation';
import { div } from 'motion/react-client';
import Loading from '../common/Loading';
import BlogEditor from '../component/Blog-Editor.component';
import PublishForm from '../component/PublishForm';
import Loader from '../component/Loader';
import axios from 'axios';

const Editor = () => {
  const location =useLocation();
  const {blog_id}=useParams();
  console.log("Blog ID from params:", blog_id);
  console.log("Location pathname:", location.pathname);
  const buttonStyle ="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2";
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIN = useSelector((state) => state.auth.isLoggedIN);  
    const accessToken = useSelector((state) => state.auth.accessToken); 
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [blog, setBlog] = useState(null);



    const [editorSate, setEditorState] = useState("editor");
  
    useEffect(() => {
      if(!isLoggedIN && !accessToken) {
        setIsLoading(false);
        setIsError(true);

        navigate('/login',{state:{from:location}});
        toast.error('Please login to access this page');

      }
    
      
    }, [isLoggedIN, accessToken, navigate]);


    useEffect(()=>{
      if(!blog_id){
        return setIsLoading(false);
      }
      axios.post(import.meta.env.VITE_SERVER_DOMAIN + '/api/blog-details', {blog_id,draft:true,mode:"edit"}).then(({data:{blog}})=>{
        setBlog(blog);
        setIsLoading(false);
        console.log("Blog data fetched:", blog);
        

      })
      .catch((error) => {
        console.error("Error fetching blog details:", error);
        setIsLoading(false);
        setIsError(true);
        setBlog(null);
       
        setErrorMessage('Failed to fetch blog details');
      });


    },[]);
    
    return (
        <>
        
        <AnimationWrapper>
{isLoading?<Loader/>:editorSate === "editor" ? (
  <BlogEditor editorState={editorSate} setEditorState={setEditorState} data={blog}  />
) : (
  <PublishForm editorState={editorSate} setEditorState={setEditorState} />
)}

        </AnimationWrapper>
       

        </>
    )
}
export default Editor;