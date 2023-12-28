'use client';

import React, { useState } from 'react';

import Image from 'next/image';

const PageBody: React.FC = () => {
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const handleGetStartedClick = () => {
    window.location.href = '/login';
  };
  const handleButtonClick = (index: number) => {
    setActiveButton(index);
  };

  return (
    <div>
      <div className="bg-white lg:min-h-screen flex flex-col mt-24 sm:mt-14 md:mt-10 lg:mt-0 ">
        <div className="flex flex-col items-center mt-8 sm:mt-20 md:mt-32 lg:mt-40 xl:mt-48">
          {/* Welcome Message */}
          <h1 className="font-bold text-center mb-8 text-5xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
            Write, plan, share.
            <br /> All in one place.
          </h1>

          {/* Additional text */}
          <p className="font-medium text-black-700 mb-8 text-center text-xl sm:text-xl md:text-2xl lg:text2xl xl:text-3xl">
            TasKing is the collaborative site that enhanced efficiency.
          </p>

          {/* Get Started Button */}
          <button
            className="bg-black text-white px-8 py-3 rounded-full hover:bg-zinc-700"
            onClick={handleGetStartedClick}
          >
            <span className="font-bold text-lg sm:text-lg md:text-xl lg:text2xl xl:text-2xl">
              Get Started
            </span>
          </button>

          {/* Notion Image */}
          <div className="mt-5">
            <Image
              alt="Notion"
              className=""
              height={309}
              src="/notion.png"
              width={655}
            />
          </div>
        </div>
      </div>

      <div className=" bg-black">
        {/* Title and Horizontal Line */}
        <div>
          <h2 className="font-bold text-white text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl pl-14 sm:pl-28 md:pl-32 lg:pl-40 pt-8 sm:pt-10 md:pt-10 lg:pt-12">
            How it works
          </h2>
          <div className="px-8 sm:px-14 md:px-16 lg:px-20">
            <hr className="mt-3 sm:mt-4 md:mt-5 lg:mt-6" />
          </div>
        </div>

        {/* Part 1: Paragraph on the left, Image on the right */}
        <div className="justify-between text-white flex flex-col sm:flex-col md:flex-col lg:flex-row mt-12 sm:mt-10 md:mt-10 lg:mt-14">
          <div>
            {/* Title with neon background*/}
            <div
              className="font-bold flex bg-white text-black p-2 rounded absolute mt-0 sm:mt-2 md:mt-2 lg:mt-0 
    ml-8 sm:ml-14 md:ml-16 lg:ml-20 text-md sm:text-md md:text-lg lg:text-xl"
              style={{
                boxShadow: '0 0 6px white, 0 0 12px white, 0 0 18px white',
                animation: 'neonGlow 1.5s infinite',
              }}
            >
              Friendly UI
            </div>

            {/* Head of the paragraph */}
            <div
              className="flex font-medium mt-14 sm:mt-14 md:mt-16 lg:mt-18             
    ml-8 sm:ml-14 md:ml-16 lg:ml-20 text-lg sm:text-xl md:text-3xl lg:text-3xl"
            >
              Our approach to Organizing ideas
            </div>

            {/* Paragraph */}
            <p
              className="flex mt-2 sm:mt-4              
    ml-8 sm:ml-14 md:ml-16 lg:ml-20 mr-8 sm:mr-14 md:mr-16 lg:mr-56 text-sm sm:text-md md:text-2xl lg:text-xl"
            >
              Arrange your tasks and responsibilities with the aid of TasKing.
              Increase productivity and limit human errors with systematic
              automation.
              <br />
              <br />
              TasKing is your one-stop shop to project management with the
              simplest design, making it easily accessible.
            </p>
          </div>
          {/* Image 1 */}
          <div className="mt-6 sm:mt-6 md:mt-12 lg:mt-2 flex flex-col sm:flex-col md:flex-col lg:flex-row items-center lg:mr-20">
            <Image
              alt="Demo"
              className="rounded-lg"
              height={497}
              src="/image3.png"
              width={759}
            />
          </div>
        </div>

        {/* Part 2: Image on the left, Paragraph on the right */}
        <div
          className="flex flex-col-reverse sm:flex-col-reverse md:flex-col-reverse lg:flex-row 
items-center justify-between text-white mt-20"
        >
          {/* Image 2 */}
          <div className="mt-6 sm:mt-6 md:mt-12 lg:mt-8 flex flex-col sm-flex-col md:flex-col lg:flex-col-reverse lg:ml-20">
            <Image
              alt="Demo"
              className="rounded-lg"
              height={485}
              src="/image4.png"
              width={746}
            />
          </div>

          <div>
            <div
              className="font-bold flex bg-white text-black p-2 rounded absolute mt-0 sm:mt-2 md:mt-2 lg:mt-0
      ml-8 sm:ml-14 md:ml-16 lg:ml-56 text-md sm:text-md md:text-lg lg:text-xl"
              style={{
                boxShadow: '0 0 6px white, 0 0 12px white, 0 0 18px white',
                animation: 'neonGlow 1.5s infinite',
              }}
            >
              Amazing UX
            </div>

            <div
              className="flex font-medium mt-14 sm:mt-14 md:mt-16 lg:mt-18            
    ml-8 sm:ml-14 md:ml-16 lg:ml-56 text-lg sm:text-xl md:text-3xl lg:text-3xl"
            >
              Minimal. But fully Functional!
            </div>

            {/* Paragraph */}
            <p
              className="flex mt-2 sm:mt-4              
    ml-8 sm:ml-14 md:ml-16 lg:ml-56 mr-8 sm:mr-14 md:mr-16 lg:mr- text-sm sm:text-md md:text-2xl lg:text-xl"
            >
              Break down any project to your advantage, clearly outline the
              purpose and goals of the project. <br />
              <br />
              Develop a detailed project plan with milestones and timelines.
              <br />
              List all tasks required to complete the project.
              <br />
            </p>
          </div>
        </div>

        <div>
          <div className="text-white font-bold text-center py-44 text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl">
            We got rid of nearly a dozen different tools because of <br />
            what Tasking does for us.
          </div>
        </div>
      </div>

      <div className=" bg-white">
        <div className="text-center mt-20 mb-10 text-7xl font-bold">
          Highlight
        </div>

        {/* 5 Boxes with Icons */}
        <div className="flex mt-5 space-x-20 justify-center mt-30">
          {['/icon1.png', '/icon2.png', '/icon3.png'].map((icon, index) => (
            <button
              className={`bg-gray-300 p-2 rounded-lg border border-gray-200 focus:outline-none ${
                activeButton === index + 1 ? 'bg-white' : ''
              }`}
              key={index}
              onClick={() => handleButtonClick(index + 1)}
            >
              <img alt={`Icon ${index + 1}`} className="w-20 h-20" src={icon} />
            </button>
          ))}
        </div>

        <div className="snap-x overflow-x-scroll flex">
          <div className="snap-center">
            <Image alt="Notion" height={309} src="/notion.png" width={655} />
          </div>
          <div className="snap-center">
            <Image alt="Notion" height={309} src="/notion.png" width={655} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBody;
