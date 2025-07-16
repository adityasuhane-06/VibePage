import React from 'react';
import { Link } from 'react-router-dom';
import pageNotFoundImage from '../assets/404.png'; // Add your 404 image
import fullLogo from '../assets/logo.png'; // Add your logo
import AnimationWrapper from '../common/page-animation';

const PageNotFound = () => {
  return (
    <AnimationWrapper>
      <section className="h-cover relative mb-0 p-3 flex flex-col items-center gap-14 text-center">
        
        <img 
          src={pageNotFoundImage} 
          className="select-none  w-50  object-cover rounded"
          alt="404 Page Not Found"
        />

        <h1 className="text-5xl font-sans font-bold leading-7">Page not found</h1>
        
        <p className="text-dark-grey text-xl leading-7 -mt-2">
          The page you are looking for does not exist. Head back to the{" "}
          <Link to="/" className="text-black underline">
            home page
          </Link>
        </p>

        <div className="flex flex-col items-center ">
          <img 
            src={fullLogo} 
            className="h-40 object-contain block mx-auto select-none"
            alt="Logo"
          />
          <p className="mt-5 text-dark-grey">
            Read millions of stories around the world
          </p>
        </div>

      </section>
    </AnimationWrapper>
  );
};

export default PageNotFound;