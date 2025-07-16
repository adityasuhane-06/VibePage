
import React, { useRef, useState, useEffect } from 'react'
import { IoMdAdd } from "react-icons/io";
export let activeTabLineRef, activeTabRef;
const InPageNaviagtion = ({routes,defaultHidden=[], defaultActiveIndex = 0,children}) => {
    const [currentPageIndex, setCurrentPagesIndex] = useState(defaultActiveIndex);
    const [isInitialized, setIsInitialized] = useState(false);
   activeTabLineRef = useRef();
   activeTabRef= useRef();
    
    const changePageState = (e, i) => {
        setCurrentPagesIndex(i);
        const buttonWidth = e.target.offsetWidth;
        const buttonLeft = e.target.offsetLeft;
        if (activeTabLineRef.current) {
            activeTabLineRef.current.style.width = `${buttonWidth}px`
            activeTabLineRef.current.style.left = `${buttonLeft}px`;
        }
    }
    
    
    // Initialize the active tab line position on mount
    useEffect(() => {
        if (activeTabLineRef.current && routes.length > 0) {
            const activeButton = document.querySelector('.tab-button')[currentPageIndex];
            if (activeButton) {
                activeTabLineRef.current.style.width = `${activeButton.offsetWidth}px`;
                activeTabLineRef.current.style.left = `${activeButton.offsetLeft}px`;
                setIsInitialized(true);
            }
        }
    }, [routes, currentPageIndex, isInitialized]);
    
    return (
      <>
      <div className="relative mb-8  bg-white border-b-1 border-gray-100 flex flex-nowrap ml-8 justify-start  ">

        <button className='flex-shrink-0 mt-0.5 py-4 text-[14px] text-gray-400  cursor-pointer rounded-4xl  ' > <IoMdAdd className=' hover:bg-gray-200  rounded-4xl ' /> </button>
       { routes?.map((route, index) => (

            
              <button 
              ref={activeTabRef}

                key={index} 
                onClick={(e) => changePageState(e, index)} 
                className={`tab-button flex-shrink-0  px-6 py-4 text-[13px] font-semibold hover:text-blue-600 cursor-pointer transition-colors duration-200 ${currentPageIndex === index ? " text-black" : " text-gray-500"} ${defaultHidden.includes(route) ? 'md:hidden' : ''}`}
              >
                {route}
              </button>
       )
    )
    }
    <hr ref={activeTabLineRef} className='absolute bottom-0 duration-300 border-blue-800 transition-all'  />

      </div>
      {
 Array.isArray(children)? children[currentPageIndex] : children
      }
      </>
    )
}
export default InPageNaviagtion