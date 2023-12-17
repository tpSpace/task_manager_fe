'use client';

import React, { useState } from 'react';

import Image from 'next/image';

const PageBody: React.FC = () => {
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const handleGetStartedClick = () => {
    window.location.href = '/otherpage';
  };
  const handleButtonClick = (index: number) => {
    setActiveButton(index);
  };

  return (
    <div>
      <div className=" bg-white-500" style={{ height: '90vh' }}>
        <div className="flex flex-col items-center h-screen mt-40">
          {/* Welcome Message */}
          <h1 className="text-7xl font-bold text-center font-helvetica mb-8">
            Write, plan, share.
            <br /> All in one place.
          </h1>

          {/* Additional text */}
          <p className="font-medium text-bold text-black-700 mb-8 text-center sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl">
            Tasking is the collaborative site that enhanced efficiency.
          </p>

          {/* Get Started Button */}
          <button
            className="bg-black text-white px-8 py-3 rounded-full hover:bg-zinc-700"
            onClick={handleGetStartedClick}
          >
            <span className="font-bold text-2xl">Get Started</span>
          </button>

          {/* Notion Image */}
          <div className="mt-5">
            <Image alt="Notion" height={309} src="/notion.png" width={655} />
          </div>
        </div>
      </div>

      <div className=" bg-black">
        {/* Title and Horizontal Line */}
        <div>
          <h2 className="text-7xl font-bold pt-10 pl-40 text-white">
            How it works
          </h2>
          <div className="px-20">
            <hr className="mt-6" />
          </div>
        </div>

        {/* Part 1: Paragraph on the left, Image on the right */}
        <div className="flex flex-row justify-between mt-20 text-white">
          <div>
            {/* Title with neon background*/}
            <div
              className="text-xl font-bold flex bg-white text-black p-2 rounded absolute mt-8 ml-40"
              style={{
                boxShadow: '0 0 6px white, 0 0 12px white, 0 0 18px white',
                animation: 'neonGlow 1.5s infinite',
              }}
            >
              Friendly UI
            </div>

            {/* Head of the paragraph */}
            <div className="text-3xl flex font-medium ml-40 mt-24">
              Our approach to Organizing ideas
            </div>

            {/* Paragraph */}
            <p className="text-xl mt-10 ml-40">
              Efficient. Effective. Revolutionary. Your one and only
              <br />
              platform to dynamic people and task management.
              <br />
              <br />
              Arrange your tasks and responsibilities with the aid of <br />
              TasKing. Increase productivity and limit human errors <br />
              with systematic automation.
              <br />
              <br />
              TasKing is your one-stop shop to project management. <br />
              We want to bring to you the latest features <br />
              with the simplest design, making it easily accessible.
            </p>
          </div>

          {/* Image 1 */}
          <div className="flex pr-40">
            <Image alt="Demo" height={472} src="/image1.png" width={663} />
          </div>
        </div>

        {/* Part 2: Image on the left, Paragraph on the right */}
        <div className="flex flex-row items-center justify-between text-white">
          {/* Image 2 */}
          <div className="pl-40 mt-24">
            <Image alt="Demo" height={472} src="/image2.png" width={663} />
          </div>

          <div>
            <div
              className="text-xl font-bold bg-white text-black p-2 rounded absolute mr-40"
              style={{
                boxShadow: '0 0 6px white, 0 0 12px white, 0 0 18px white',
                animation: 'neonGlow 1.5s infinite',
              }}
            >
              <span>Amazing UX</span>
            </div>

            <div className="text-3xl flex font-medium mr-40 mt-20">
              Minimal. But fully Functional!
            </div>

            {/* Paragraph */}

            <p className="text-2xl mt-10 pr-40 font-bold">
              Break down any project to your advantage. <br />
              <br />
            </p>

            <p className="text-xl">
              -Clearly outline the purpose and goals of the project. <br />
              <br />
              -Develop a detailed project plan with milestones and timelines.{' '}
              <br />
              <br />
              -List all tasks required to complete the project.
            </p>
          </div>
        </div>
      </div>

      <div className=" bg-black h-screen"></div>

      <div className=" bg-white h-screen">
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
              <Image
                alt={`Icon ${index + 1}`}
                className="w-20 h-20"
                height={80}
                src={icon}
                width={80}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageBody;
