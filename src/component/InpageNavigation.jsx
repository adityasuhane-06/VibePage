import React, { useRef, useState, useEffect } from 'react'
import { IoMdAdd } from "react-icons/io";

export let activeTabLineRef, activeTabRef;

const InPageNavigation = ({routes, defaultHidden = [], defaultActiveIndex = 0, children}) => {
    const [currentPageIndex, setCurrentPagesIndex] = useState(defaultActiveIndex);
    const [isInitialized, setIsInitialized] = useState(false);
    const [isScrollable, setIsScrollable] = useState(false);
    const navContainerRef = useRef();
    activeTabLineRef = useRef();
    activeTabRef = useRef();
    
    const changePageState = (e, i) => {
        setCurrentPagesIndex(i);
        const buttonWidth = e.target.offsetWidth;
        const buttonLeft = e.target.offsetLeft;
        
        if (activeTabLineRef.current) {
            activeTabLineRef.current.style.width = `${buttonWidth}px`;
            activeTabLineRef.current.style.left = `${buttonLeft}px`;
        }
        
        // Scroll active tab into view on mobile
        if (navContainerRef.current && window.innerWidth < 768) {
            const container = navContainerRef.current;
            const activeButton = e.target;
            const containerRect = container.getBoundingClientRect();
            const buttonRect = activeButton.getBoundingClientRect();
            
            // Check if button is outside visible area
            if (buttonRect.left < containerRect.left || buttonRect.right > containerRect.right) {
                const scrollPosition = activeButton.offsetLeft - (container.offsetWidth / 2) + (activeButton.offsetWidth / 2);
                container.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
            }
        }
    }
    
    // Check if navigation is scrollable
    const checkScrollable = () => {
        if (navContainerRef.current) {
            const isOverflowing = navContainerRef.current.scrollWidth > navContainerRef.current.clientWidth;
            setIsScrollable(isOverflowing);
        }
    };
    
    // Initialize the active tab line position on mount
    useEffect(() => {
        if (activeTabLineRef.current && routes.length > 0) {
            const activeButtons = document.querySelectorAll('.tab-button');
            const activeButton = activeButtons[currentPageIndex];
            
            if (activeButton) {
                activeTabLineRef.current.style.width = `${activeButton.offsetWidth}px`;
                activeTabLineRef.current.style.left = `${activeButton.offsetLeft}px`;
                setIsInitialized(true);
            }
        }
        
        // Check if scrollable after render
        checkScrollable();
        
        // Recheck on window resize
        const handleResize = () => {
            checkScrollable();
            // Recalculate active tab line position on resize
            if (activeTabLineRef.current && routes.length > 0) {
                const activeButtons = document.querySelectorAll('.tab-button');
                const activeButton = activeButtons[currentPageIndex];
                
                if (activeButton) {
                    activeTabLineRef.current.style.width = `${activeButton.offsetWidth}px`;
                    activeTabLineRef.current.style.left = `${activeButton.offsetLeft}px`;
                }
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [routes, currentPageIndex]);
    
    return (
        <>
            <div className="relative mb-6 sm:mb-8 bg-white border-b border-gray-100 mt-4">
                {/* Mobile: Show scroll indicators if needed */}
                {isScrollable && (
                    <>
                        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:hidden"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:hidden"></div>
                    </>
                )}
                
                <div 
                    ref={navContainerRef}
                    className="flex flex-nowrap overflow-x-auto scrollbar-hide px-3 sm:px-6 md:px-8 scroll-smooth"
                    style={{
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                        WebkitScrollbar: { display: 'none' }
                    }}
                >
                    {/* Add Button - More compact on mobile */}
                    <button className='flex-shrink-0 mt-0.5 p-2 sm:py-4 text-gray-400 cursor-pointer rounded-full hover:bg-gray-100 transition-colors duration-200 mr-2 sm:mr-0'> 
                        <IoMdAdd className='w-4 h-4 sm:w-5 sm:h-5' /> 
                    </button>
                    
                    {/* Navigation Tabs */}
                    {routes?.map((route, index) => (
                        <button 
                            ref={index === currentPageIndex ? activeTabRef : null}
                            key={index} 
                            onClick={(e) => changePageState(e, index)} 
                            className={`tab-button flex-shrink-0 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold cursor-pointer transition-all duration-200 whitespace-nowrap relative
                                ${currentPageIndex === index 
                                    ? "text-blue-600 bg-blue-50 sm:bg-transparent" 
                                    : "text-gray-500 hover:text-blue-600 hover:bg-gray-50 sm:hover:bg-transparent"
                                } 
                                ${defaultHidden.includes(route) ? 'md:hidden' : ''}
                                rounded-lg sm:rounded-none mx-1 sm:mx-0
                            `}
                        >
                            {route}
                        </button>
                    ))}
                </div>
                
                {/* Active tab indicator line - Hidden on mobile, shown on desktop */}
                <hr 
                    ref={activeTabLineRef} 
                    className='absolute bottom-0 duration-300 border-blue-600 border-2 transition-all hidden sm:block' 
                />
            </div>
            
            {/* Content */}
            <div className="px-3 sm:px-6 md:px-8">
                {Array.isArray(children) ? children[currentPageIndex] : children}
            </div>
        </>
    )
}

export default InPageNavigation