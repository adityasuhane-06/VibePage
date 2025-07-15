import React from 'react'
const LoadMoreBlogs = ({ state, fetchLatestBlogs }) => {
  const loadMore = async () => {
    if (!state) return;
    
    try {
      const page = state.page + 1; 
      console.log("Loading more blogs for page:", page);
      
      const Controller = new AbortController();
      await fetchLatestBlogs(Controller.signal, page); 
     
      
    } catch (error) {
      console.error("Error loading more blogs:", error);
    }
  };

  if (state !== null && state.result && state.result.length < state.totalDocs) {
    return (
      <div className="w-full flex justify-center items-center mt-4">
        <button 
          onClick={loadMore}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Load More
        </button>
      </div>
    );
  }

  return null;
};

export default LoadMoreBlogs