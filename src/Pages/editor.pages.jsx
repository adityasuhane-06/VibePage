import React, { use } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { Toaster,toast } from 'react-hot-toast';
import AnimationWrapper from '../common/page-animation';
import { div } from 'motion/react-client';
import Loading from '../common/Loading';
import BlogEditor from '../component/Blog-Editor.component';
import PublishForm from '../component/PublishForm';

const Editor = () => {
  const location =useLocation();
  const buttonStyle ="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2";
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIN = useSelector((state) => state.auth.data.isLoggedIN);  
    const accessToken = useSelector((state) => state.auth.data.accessToken); 
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');




    const [editorSate, setEditorState] = useState("editor");
  
    useEffect(() => {
      if(!isLoggedIN && !accessToken) {
        setIsLoading(false);
        setIsError(true);

        navigate('/login',{state:{from:location}});
        toast.error('Please login to access this page');

      }
    
      
    }, [isLoggedIN, accessToken, navigate]);
    
    return (
        <>
        
        <AnimationWrapper>
{editorSate === "editor" ? (
  <BlogEditor editorState={editorSate} setEditorState={setEditorState} />
) : (
  <PublishForm editorState={editorSate} setEditorState={setEditorState} />
)}

        </AnimationWrapper>
       

        </>
    )
}
export default Editor;