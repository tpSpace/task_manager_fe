'use client';

import React, { useState, useEffect } from 'react';

import Image from 'next/image';

const PageBody: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleGetStartedClick = () => {
    window.location.href = '/login';
  };

  const handleButtonClick = (buttonId: number) => {
    setSelectedImage(buttonId);
  };

  useEffect(() => {
    
    setSelectedImage(1);
  }, []);

  return (
    <div>
      <div className="bg-white flex flex-col mt-24 sm:mt-14 md:mt-10 lg:mt-0">
        <div className="flex flex-col items-center mt-8 sm:mt-20 md:mt-32 lg:mt-32 xl:mt-32">
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
          <div className="mt-5 pb-6">
            <Image
              alt="Notion"
              className="h-44 sm:h-64 md:h-72 lg:h-80"
              height={1000}
              priority={true}
              src="/notion.svg"
              width={700}
            />
          </div>

          {/* Arrow */}
          <div className="py-4 flex justify-center items-center">
            <svg
              className="h-6 sm:h-8 md:h-10 lg:h-12 animate-bounce text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white mt-10">
        <div className="flex justify-center sm:justify-end mb-4 sm:mb-0 lg:mb-0 sm:mr-6 lg:mr-28 xl:mr-56">
          <div className="text-center font-bold text-3xl sm:text-4xl md:text-5xl lg:text-5xl pt-2 sm:pt-6 md:pt-10 lg:pt-20 pr-2 sm:pr-12 xl:pr-20">
            How TasKing works?
          </div>

          <Image
            alt="Notion2"
            className="hidden sm:block sm:h-24 md:h-32 lg:h-40"
            height={400}
            src="/notion2.svg"
            width={200}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6 mx-6 lg:mx-28 xl:mx-56">
          {/* Box 1 */}
          <div className="bg-neutral-100 font-medium rounded-lg px-6 sm:px-6 md:px-4 lg:px-6 xl:px-8 py-6 sm:py-6 md:py-8 xl:py-6 text-xs sm:text-sm md:text-base lg:text-lg">
            <h3 className="font-bold text-sky-600 text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl mb-2">
              UI+
            </h3>
            <p>Arrange your projects perfectly</p>
          </div>

          {/* Box 2 */}
          <div className="bg-neutral-100 font-medium rounded-lg px-6 sm:px-6 md:px-4 lg:px-8 py-6 sm:py-6 md:py-8 xl:py-6 text-xs sm:text-sm md:text-base lg:text-lg">
            <h3 className="font-bold text-orange-500 text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl mb-2">
              UX+
            </h3>
            <p>Complete the project faster.</p>
          </div>

          {/* Box 3 */}
          <div className="bg-neutral-100 font-medium rounded-lg px-6 sm:px-6 md:px-4 lg:px-8 py-6 sm:py-6 md:py-8 lg: xl:py-6 text-xs sm:text-sm md:text-base lg:text-lg">
            <h3 className="font-bold text-emerald-500 text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl mb-2">
              Friendly
            </h3>
            <p>Everyone can use at first glance</p>
          </div>
        </div>

        {/* Second Row: 2 Image Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8 mx-6 lg:mx-28 xl:mx-56">
          {/* Image Box 1 */}
          <div className="bg-neutral-100 rounded-lg">
            <div className="text-left font-bold pt-8 pl-6 sm:pl-8 text-lg sm:text-2xl md:text-3xl lg:text-xl xl:text-2xl xl:min-h-[7rem]">
              Our approach to organizing ideas
            </div>
            <p className="font-medium text-left pt-4 sm:pt-4 lg:pt-4 xl:pt-2 pl-6 sm:pl-8 pr-10 text-xs sm:text-xl lg:text-base xl:text-lg xl:min-h-[6rem]">
              TasKing is your{' '}
              <span className="font-bold text-pink-500">one-stop shop</span> to
              project management with the simplest design.
            </p>

            <div className="flex justify-center px-8 pt-8 sm:pt-10 lg:pt-8 xl:pt-12 pb-10 lg:pb-16">
              <Image
                alt="AssignProject"
                height={800}
                src="/image1.svg"
                width={500}
              />
            </div>
          </div>

          {/* Image Box 2 */}
          <div className="bg-neutral-100 rounded-lg">
            <div className="text-left font-bold pt-8 pl-6 sm:pl-8 text-lg sm:text-3xl lg:text-xl xl:text-2xl xl:min-h-[7rem]">
              Minimal. But fully functional
            </div>
            <p className="font-medium text-left pt-4 sm:pt-4 lg:pt-4 xl:pt-2 pl-8 pr-10 lg:pr-8 xl:pr-10 text-xs sm:text-xl lg:text-base xl:text-lg xl:min-h-[6rem]">
              Break down any project to your advantage. Clearly outline the{' '}
              <span className="font-bold text-indigo-500">
                purpose and goals
              </span>{' '}
              of the project.
            </p>

            <div className="flex justify-center px-8 pt-8 sm:pt-10 lg:pt-8 xl:pt-12 pb-10 lg:pb-16">
              <Image
                alt="SelectProject"
                height={800}
                src="/image2.svg"
                width={500}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="text-black font-bold text-center pt-16 sm:pt-20 lg:pt-28 text-3xl sm:text-3xl md:text-5xl lg:text-5xl">
            Consolidate tools. <br />
            Cut costs.
          </div>

          {/* Tool image with cross line */}
          <div className="flex justify-center pt-10 relative">
            <div className="h-12 w-[20rem] sm:h-16 sm:w-[40rem] md:h-20 md:w-[40rem] lg:h-24 lg:w-[40rem]">
              <Image
                alt="ApplicationIcon"
                height={1000}
                src="/appicon.svg"
                width={700}
              />
            </div>

            <hr className="px-40 sm:px-64 md:px-80 lg:px-80 absolute sm:border-2 border-t-2 mt-4 top-1/2 z-10 border-black" />
          </div>

          <div className="font-medium text-black text-center px-4 sm:px-6 lg:px-20 pt-8 sm:pt-10 md:pt-14 lg:pt-16 text-md sm:text-xl md:text-2xl lg:text-3xl">
            &quot;We got rid of nearly a dozen different tools because of what
            Tasking does for us.&quot;
          </div>

          <div className="flex justify-center mt-10 lg:mt-20 h-40 sm:h-80 md:h-96 lg:h-72">
            <Image
              alt="ApplicationIcon"
              height={1000}
              src="/notion3.svg"
              width={700}
            />
          </div>
        </div>
      </div>

      <div className="bg-white mt-12 lg:mt-24">
        
        <div className="text-center font-bold text-3xl sm:text-4xl md-5xl lg:text-5xl">
          Every team, side-by-side
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-8 sm:mt-10 md:mt-12 lg:mt-12">
          {/* Button 1 */}
          <button
            className="flex flex-col bg-neutral-100 rounded-xl font-medium items-center hover:border-red-500 border-2 mx-2 sm:mx-6 md:mx-10 lg:mx-10 px-1 sm:px-4 md:px-2 lg:px-8 py-2 text-xs sm:text-md md:text-lg lg:text-lg"
            onClick={() => handleButtonClick(1)}
          >
            <svg
              className="px-4 lg:px-2 h-0 sm:h-10 md:h-16 lg:h-24"
              version="1.1"
              viewBox="0.00 0.00 96.00 96.00"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="   M 73.63 27.32   Q 74.92 28.14 75.85 29.42   Q 76.32 30.08 77.01 29.67   L 85.31 24.70   A 1.01 1.01 0.0 0 1 86.82 25.35   Q 88.79 34.56 82.07 40.09   C 77.93 43.50 71.95 44.33 67.17 42.07   A 0.58 0.58 0.0 0 0 66.49 42.20   L 56.30 53.54   A 0.72 0.71 45.3 0 0 56.30 54.49   L 78.00 78.74   A 1.02 1.02 0.0 0 1 78.19 79.78   Q 76.47 84.24 71.97 85.94   Q 69.77 86.78 68.38 85.05   Q 59.49 73.97 49.86 61.57   A 0.53 0.53 0.0 0 0 49.04 61.54   L 27.17 85.62   Q 26.86 85.96 26.42 85.86   Q 21.16 84.63 18.37 80.13   C 17.60 78.89 17.96 77.82 18.00 76.48   A 1.24 1.23 -20.0 0 1 18.41 75.61   L 42.60 53.46   A 0.79 0.79 0.0 0 0 42.69 52.39   L 32.43 39.26   A 1.26 1.26 0.0 0 0 30.87 38.90   C 27.51 40.58 24.08 38.68 21.98 35.88   A 0.33 0.33 0.0 0 0 21.40 35.97   Q 20.71 38.01 21.57 39.83   Q 21.90 40.54 21.67 41.29   C 20.78 44.11 17.89 47.47 14.75 44.57   Q 10.38 40.53 8.33 35.30   A 2.71 2.70 -35.1 0 1 8.82 32.53   Q 12.16 28.75 16.16 31.55   Q 17.18 32.26 18.18 31.60   Q 18.63 31.30 18.25 30.92   C 16.77 29.44 14.60 26.37 16.49 24.46   C 25.97 14.91 38.50 8.50 51.85 12.52   Q 53.03 12.87 52.63 14.03   L 52.54 14.32   Q 52.24 15.18 51.36 14.96   C 38.16 11.60 27.91 17.39 18.05 25.59   Q 17.62 25.95 17.93 26.43   C 19.93 29.51 23.81 35.70 27.15 36.56   Q 27.74 36.71 28.28 36.44   Q 32.80 34.23 35.53 30.66   C 36.96 28.80 35.39 27.15 35.87 25.34   Q 36.01 24.82 36.43 24.50   L 47.38 15.89   A 0.55 0.31 -61.0 0 1 47.46 15.84   Q 49.84 14.98 49.99 16.29   A 0.98 0.96 68.5 0 1 49.62 17.17   L 38.64 25.71   Q 38.16 26.09 38.27 26.69   C 38.58 28.28 38.72 29.99 37.97 31.47   Q 37.59 32.22 37.51 33.03   Q 37.47 33.50 37.78 33.85   L 49.30 46.65   A 0.62 0.62 0.0 0 0 50.17 46.70   L 60.95 36.89   A 0.81 0.81 0.0 0 0 61.09 35.85   C 57.21 29.74 60.94 21.71 66.52 18.34   Q 71.90 15.08 78.14 17.02   Q 80.88 17.87 79.02 20.05   L 73.51 26.54   Q 73.12 26.99 73.63 27.32   Z   M 71.81 26.80   Q 72.47 26.20 72.41 25.27   Q 72.37 24.60 72.79 24.07   L 76.72 19.19   Q 77.14 18.68 76.49 18.56   Q 70.09 17.42 65.74 21.23   C 61.34 25.07 60.33 31.24 63.74 36.23   C 67.36 41.51 74.73 42.23 79.84 38.67   Q 84.74 35.25 84.88 28.39   A 0.41 0.41 0.0 0 0 84.27 28.03   L 77.05 32.12   A 1.42 1.42 0.0 0 1 75.36 31.89   L 71.78 28.30   A 1.04 1.03 46.3 0 1 71.81 26.80   Z   M 20.29 35.64   L 20.81 35.44   Q 21.26 35.27 21.04 34.84   Q 20.64 34.07 19.99 33.52   Q 19.56 33.16 19.07 33.42   Q 16.43 34.84 14.16 32.61   A 1.26 1.25 -28.7 0 0 13.02 32.28   Q 11.47 32.61 10.38 33.81   Q 9.98 34.26 10.25 34.80   Q 12.77 39.79 16.69 43.27   Q 17.19 43.72 17.72 43.30   Q 18.76 42.47 19.29 41.29   Q 19.52 40.78 19.37 40.25   Q 18.82 38.25 19.57 36.35   A 1.27 1.24 -0.3 0 1 20.29 35.64   Z   M 19.85 78.27   Q 21.74 81.14 24.43 83.00   Q 25.93 84.04 27.16 82.69   L 63.38 42.85   A 0.18 0.18 0.0 0 0 63.37 42.59   L 60.72 40.30   A 0.33 0.33 0.0 0 0 60.28 40.30   L 20.00 77.03   Q 19.40 77.58 19.85 78.27   Z"
                fill="#000000"
              />
              <circle cx="24.51" cy="78.57" fill="#000000" r="1.57" />
            </svg>
            Engineering
          </button>

          {/* Button 2 */}
          <button
            className="flex flex-col bg-neutral-100 rounded-xl font-medium items-center hover:border-cyan-500 border-2 mx-2 sm:mx-6 md:mx-10 lg:mx-10 px-1 sm:px-6 md:px-8 lg:px-8 py-2 text-sm sm:text-md md:text-lg lg:text-lg"
            onClick={() => handleButtonClick(2)}
          >
            <svg
              className="h-0 sm:h-10 md:h-16 lg:h-24"
              version="1.1"
              viewBox="0.00 0.00 96.00 96.00"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="   M 40.39 74.27   C 40.67 77.23 41.37 80.24 39.12 82.62   C 35.89 86.03 29.12 84.65 25.82 82.41   Q 17.41 76.69 11.45 66.98   C 3.11 53.39 4.35 36.43 15.38 24.48   C 30.76 7.79 54.53 9.32 72.35 20.81   C 81.64 26.79 89.84 36.62 91.12 47.73   Q 92.44 59.17 83.88 66.16   C 78.01 70.95 69.56 72.29 61.99 71.99   Q 53.49 71.66 44.78 70.96   C 42.69 70.79 40.15 71.75 40.39 74.27   Z   M 34.0630 34.6435   A 6.27 4.19 111.0 0 0 40.2217 30.2916   A 6.27 4.19 111.0 0 0 38.5570 22.9365   A 6.27 4.19 111.0 0 0 32.3983 27.2884   A 6.27 4.19 111.0 0 0 34.0630 34.6435   Z   M 48.9083 34.3770   A 6.58 4.39 123.5 0 0 56.2008 31.3130   A 6.58 4.39 123.5 0 0 56.1717 23.4030   A 6.58 4.39 123.5 0 0 48.8792 26.4670   A 6.58 4.39 123.5 0 0 48.9083 34.3770   Z   M 62.8681 40.0453   A 5.86 4.06 134.7 0 0 69.8758 38.7358   A 5.86 4.06 134.7 0 0 71.1119 31.7147   A 5.86 4.06 134.7 0 0 64.1042 33.0242   A 5.86 4.06 134.7 0 0 62.8681 40.0453   Z   M 20.6611 40.0626   A 3.95 3.02 105.7 0 0 24.6373 37.0772   A 3.95 3.02 105.7 0 0 22.7989 32.4574   A 3.95 3.02 105.7 0 0 18.8227 35.4428   A 3.95 3.02 105.7 0 0 20.6611 40.0626   Z   M 74.3617 47.8473   A 3.55 2.79 132.5 0 0 78.8170 47.1149   A 3.55 2.79 132.5 0 0 79.1583 42.6127   A 3.55 2.79 132.5 0 0 74.7030 43.3451   A 3.55 2.79 132.5 0 0 74.3617 47.8473   Z   M 38.5162 61.5989   A 5.98 5.75 -21.7 0 0 30.8340 58.4675   A 5.98 5.75 -21.7 0 0 27.4038 66.0211   A 5.98 5.75 -21.7 0 0 35.0860 69.1525   A 5.98 5.75 -21.7 0 0 38.5162 61.5989   Z"
                fill="#000000"
              />
            </svg>
            Design
          </button>

          {/* Button 3 */}
          <button
            className="flex flex-col bg-neutral-100 rounded-xl font-medium items-center hover:border-yellow-500 border-2 mx-2 sm:mx-6 md:mx-10 lg:mx-10 px-1 sm:px-6 md:px-6 lg:px-8 py-2 text-sm sm:text-md md:text-lg lg:text-lg"
            onClick={() => handleButtonClick(3)}
          >
            <svg
              className="sm:px-2 md:px-0 h-0 sm:h-10 md:h-16 lg:h-24"
              version="1.1"
              viewBox="0.00 0.00 96.00 96.00"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="   M 24.57 61.54   L 24.17 61.79   Q 23.46 62.22 22.65 62.06   L 16.03 60.73   A 2.64 2.64 0.0 0 1 14.12 57.11   Q 17.59 48.92 23.99 41.78   Q 26.28 39.22 29.39 39.86   A 2.04 2.04 0.0 0 1 30.31 40.32   Q 30.77 40.74 31.36 40.93   Q 31.87 41.09 32.05 40.59   Q 36.22 28.78 42.91 20.03   C 47.69 13.78 54.23 9.48 61.63 6.90   Q 62.53 6.58 63.34 7.10   Q 64.67 7.96 65.69 9.83   Q 73.30 23.80 72.61 39.60   C 72.45 43.40 71.40 47.16 70.28 50.77   A 0.57 0.57 0.0 0 0 70.77 51.51   C 77.15 52.10 76.34 59.88 75.72 64.39   Q 74.92 70.26 73.66 76.11   C 73.40 77.36 72.75 78.13 72.34 79.30   A 1.14 1.13 26.4 0 1 70.64 79.87   L 64.29 75.69   A 0.82 0.81 26.2 0 1 63.96 74.74   Q 64.40 73.46 65.52 73.91   Q 67.68 74.76 69.80 76.06   A 0.39 0.39 0.0 0 0 70.39 75.79   Q 71.45 69.25 72.65 62.78   C 73.12 60.25 74.35 54.76 70.97 53.80   Q 69.77 53.46 69.45 54.67   Q 67.11 63.46 63.75 73.07   C 62.33 77.13 53.75 74.45 50.99 73.61   A 0.96 0.95 -63.4 0 0 49.95 73.96   C 45.42 80.11 36.62 76.74 34.65 70.33   C 34.35 69.36 34.33 68.22 33.27 67.75   C 30.87 66.69 25.89 64.87 25.38 61.91   Q 25.25 61.13 24.57 61.54   Z   M 32.49 54.78   Q 32.96 54.15 33.73 54.27   Q 48.66 56.60 61.44 64.05   Q 61.97 64.36 62.16 63.78   Q 64.60 56.18 66.46 48.81   C 69.88 35.28 70.24 22.64 62.33 10.55   A 1.13 1.13 0.0 0 0 60.95 10.12   C 46.15 16.22 39.00 29.18 33.61 43.63   Q 30.50 51.94 28.15 59.67   A 0.77 0.77 0.0 0 0 28.77 60.65   C 39.67 62.32 49.34 64.80 58.89 71.26   Q 59.65 71.77 59.93 70.90   L 60.74 68.38   Q 61.04 67.44 60.20 66.89   Q 49.18 59.75 33.22 56.62   A 1.16 1.16 0.0 0 1 32.29 55.37   Q 32.32 55.01 32.49 54.78   Z   M 24.75 60.25   Q 24.86 60.42 25.03 60.55   A 0.59 0.58 -65.2 0 0 25.95 60.21   Q 27.91 51.72 30.56 44.57   Q 30.98 43.43 30.00 42.72   C 27.46 40.85 24.83 44.58 23.53 46.39   Q 19.73 51.69 16.51 57.67   A 0.55 0.55 0.0 0 0 16.95 58.48   Q 20.82 58.80 24.38 59.97   Q 24.61 60.04 24.75 60.25   Z"
                fill="#000000"
              />
              <ellipse
                cx="0.00"
                cy="0.00"
                fill="#000000"
                rx="5.27"
                ry="5.09"
                transform="translate(55.84,29.74) rotate(5.8)"
              />
              <path
                d="   M 27.28 78.12   C 28.66 77.94 30.33 77.04 31.72 77.33   Q 34.07 77.82 33.94 80.59   Q 33.83 83.20 33.26 86.01   Q 32.91 87.75 34.22 86.55   Q 36.21 84.74 38.13 82.75   C 42.24 78.51 44.06 86.09 44.85 88.46   Q 45.54 90.53 46.26 88.47   Q 47.40 85.20 48.12 81.99   A 1.85 1.85 0.0 0 1 51.03 80.91   L 52.78 82.20   Q 53.73 82.90 53.59 81.73   L 53.21 78.42   A 0.94 0.94 0.0 0 1 53.52 77.62   Q 53.93 77.26 54.44 77.41   Q 55.11 77.61 55.29 78.29   Q 56.04 81.15 55.82 83.26   C 55.48 86.45 52.60 85.37 51.06 84.05   A 0.48 0.48 0.0 0 0 50.28 84.30   Q 49.54 87.58 47.84 90.73   C 46.78 92.71 44.45 92.82 43.35 90.77   Q 41.91 88.10 40.97 85.00   A 0.52 0.52 0.0 0 0 40.08 84.80   C 38.40 86.68 35.38 90.36 32.68 90.31   A 2.38 2.37 87.7 0 1 30.35 88.15   Q 30.01 84.57 30.94 81.00   A 0.39 0.39 0.0 0 0 30.47 80.52   C 28.46 81.00 24.03 82.76 23.36 79.29   C 22.83 76.62 27.04 72.82 28.98 71.38   Q 29.63 70.89 30.10 71.56   C 31.47 73.51 28.26 76.14 26.97 77.49   Q 26.23 78.25 27.28 78.12   Z"
                fill="#000000"
              />
            </svg>
            Product
          </button>

          {/* Button 4 */}
          <button
            className="flex flex-col bg-neutral-100 rounded-xl font-medium items-center hover:border-lime-500 border-2 mx-2 sm:mx-6 md:mx-10 lg:mx-10 px-1 sm:px-4 md:px-4 lg:px-8 py-2 text-sm sm:text-md md:text-lg lg:text-lg"
            onClick={() => handleButtonClick(4)}
          >
            <svg
              className="px-2 lg:px-0 h-0 sm:h-10 md:h-16 lg:h-24"
              version="1.1"
              viewBox="0.00 0.00 96.00 96.00"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="   M 10.23 10.21   A 0.26 0.26 0.0 0 1 10.59 10.13   L 17.74 14.85   A 3.95 1.40 33.4 0 1 20.27 18.19   L 20.16 18.36   A 3.95 1.40 33.4 0 1 16.09 17.36   L 8.94 12.64   A 0.26 0.26 0.0 0 1 8.86 12.28   L 10.23 10.21   Z"
                fill="#000000"
              />
              <path
                d="   M 50.18 29.58   C 50.43 24.91 49.40 12.05 41.25 14.70   C 36.76 16.15 32.86 21.09 30.56 25.00   Q 21.88 39.77 23.49 55.93   Q 23.72 58.19 25.57 61.40   Q 27.55 64.82 31.55 64.03   Q 32.49 63.85 32.93 64.69   L 33.19 65.17   Q 33.68 66.10 32.67 66.40   Q 27.78 67.86 24.43 64.37   C 18.94 58.65 19.83 47.44 21.50 40.14   Q 23.13 32.98 26.32 26.59   C 29.84 19.54 38.30 8.00 46.89 12.62   Q 50.25 14.42 53.27 18.23   Q 62.58 29.94 79.88 37.25   Q 80.33 37.44 80.50 36.98   C 81.12 35.25 82.54 33.17 84.69 33.69   C 86.78 34.19 86.73 36.61 86.26 38.39   A 0.63 0.63 0.0 0 0 86.74 39.17   L 90.80 39.97   Q 92.43 40.30 92.38 41.96   C 92.34 43.15 92.27 44.29 91.95 45.44   Q 89.08 55.64 86.37 65.68   Q 86.25 66.11 85.85 66.29   Q 84.53 66.86 83.16 66.08   Q 81.97 65.40 81.62 66.72   Q 79.56 74.47 75.84 83.97   Q 75.25 85.49 74.30 86.93   A 1.00 1.00 0.0 0 1 73.33 87.36   Q 71.31 87.08 69.06 86.45   Q 65.91 85.56 62.99 84.71   A 2.03 2.03 0.0 0 1 62.05 81.40   Q 66.92 76.00 69.67 70.08   C 71.12 66.98 74.12 64.43 77.58 66.96   Q 78.06 67.30 78.36 66.80   L 78.80 66.04   Q 79.02 65.67 78.65 65.45   C 77.06 64.53 74.03 64.31 72.15 63.95   A 0.98 0.97 -74.8 0 0 71.05 64.59   Q 69.30 69.62 65.62 72.56   Q 63.78 74.02 63.64 71.68   C 63.52 69.68 66.90 65.70 68.14 64.18   A 0.46 0.46 0.0 0 0 67.85 63.44   Q 51.60 61.13 35.73 65.27   Q 34.85 65.50 34.71 65.25   A 3.17 2.90 -33.6 0 1 35.66 61.44   Q 40.07 58.00 42.87 53.10   Q 48.25 43.68 49.68 33.50   A 0.49 0.48 -88.6 0 0 49.16 32.95   Q 42.87 33.45 40.24 40.05   Q 37.80 46.16 41.81 50.00   Q 42.68 50.83 42.13 51.91   Q 41.97 52.23 41.69 52.40   Q 40.79 52.97 40.00 52.25   C 31.81 44.71 38.94 30.22 49.52 30.21   Q 50.14 30.21 50.18 29.58   Z"
                fill="#000000"
              />
              <path
                d="   M 2.99 29.13   A 0.67 0.67 0.0 0 1 3.76 28.57   L 12.30 29.91   A 3.26 1.43 8.9 0 1 15.30 31.82   L 15.27 32.04   A 3.26 1.43 8.9 0 1 11.83 32.95   L 3.28 31.61   A 0.67 0.67 0.0 0 1 2.72 30.85   L 2.99 29.13   Z"
                fill="#000000"
              />
              <path
                d="   M 12.62 47.49   Q 13.76 48.04 12.82 48.88   C 10.59 50.90 6.62 50.68 3.48 50.53   Q 2.88 50.50 2.68 49.93   Q 2.47 49.31 2.56 48.72   A 1.19 1.19 0.0 0 1 3.59 47.71   Q 7.59 47.24 10.85 47.11   Q 11.73 47.07 12.62 47.49   Z"
                fill="#000000"
              />
            </svg>
            Marketing
          </button>
        </div>

        {/* Large box with selected image */}
        <div>
          
          {selectedImage === 1 && (
          <div className="flex flex-col mt-10 mx-10 sm:mx-12 md:mx-16 lg:mx-32 xl:mx-72 rounded-xl relative border shadow-md">
            
            <h2 className="font-bold text-left text-red-500 text-sm sm:text-lg md:text-2xl lg:text-4xl ml-4 sm:ml-6 md:ml-10 lg:ml-16 my-2 sm:my-4 md:my-4 lg:my-6 xl:my-8">Build any ticket</h2>
            
            <p className="font-medium text-left text-xs sm:text-base md:text-xl lg:text-2xl ml-4 sm:ml-6 md:ml-10 lg:ml-16 mb-4 sm:mb-6 md:mb-8 ">Show only tasks assigned to you, efficiency work!</p>
            
            <div className="flex justify-center my-2 sm:my-4 md:my-4 lg:my-6 xl:my-8">
              <Image
              alt="Image3"
              className="h-32 sm:h-60 md:h-72 lg:h-96 xl:h-auto"
              height={1000}
              src="/image3.svg"
              width={560}
              />
            </div>

          </div>
          )}

          {selectedImage === 2 && (
          <div className="flex flex-col mt-10 mx-10 sm:mx-12 md:mx-16 lg:mx-38 xl:mx-72 rounded-xl relative border shadow-md">
            
            <h2 className="font-bold text-left text-cyan-500 text-sm sm:text-lg md:text-2xl lg:text-4xl ml-4 sm:ml-6 md:ml-10 lg:ml-16 my-2 sm:my-4 md:my-4 lg:my-6 xl:my-8">Easy assigning</h2>
            
            <p className="font-medium text-left text-xs sm:text-base md:text-xl lg:text-2xl ml-4 sm:ml-6 md:ml-10 lg:ml-16 mb-4 sm:mb-6 md:mb-8">Collaborating with friends now easier with TasKing</p>

            <div className="flex justify-center my-2 sm:my-4 md:my-4 lg:my-6 xl:my-8">
              <Image
              alt="Image4"
              className="h-32 sm:h-60 md:h-72 lg:h-96 xl:h-auto"
              height={1000}
              src="/image4.svg"
              width={560}
              />
            </div>

          </div>
          )}

          {selectedImage === 3 && (
          <div className="flex flex-col mt-10 mx-10 sm:mx-12 md:mx-16 lg:mx-38 xl:mx-72 rounded-xl relative border shadow-md">
            
            <h2 className="font-bold text-left text-yellow-500 text-sm sm:text-lg md:text-2xl lg:text-4xl ml-4 sm:ml-6 md:ml-10 lg:ml-16 my-2 sm:my-4 md:my-4 lg:my-6 xl:my-8">Creative tags</h2>

            <p className="font-medium text-left text-xs sm:text-base md:text-xl lg:text-2xl ml-4 sm:ml-6 md:ml-10 lg:ml-16 mb-4 sm:mb-6 md:mb-8">Custom your own labels, tags, owners, and more</p>

            <div className="flex justify-center my-2 sm:my-4 md:my-4 lg:my-6 xl:my-8">
              <Image
              alt="Image5"
              className="h-32 sm:h-60 md:h-72 lg:h-96 xl:h-auto"
              height={1000}
              src="/image5.svg"
              width={560}
              />
            </div>

          </div>
          )}

          {selectedImage === 4 && (
          <div className="flex flex-col mt-10 mx-10 sm:mx-12 md:mx-16 lg:mx-38 xl:mx-72 rounded-xl relative border shadow-md">
            
            <h2 className="font-bold text-left text-lime-500 text-sm sm:text-lg md:text-2xl lg:text-4xl ml-4 sm:ml-6 md:ml-10 lg:ml-16 my-2 sm:my-4 md:my-4 lg:my-6 xl:my-8">Join faster!</h2>

            <p className="font-medium text-left text-xs sm:text-base md:text-xl lg:text-2xl ml-4 sm:ml-6 md:ml-10 lg:ml-16 mb-4 sm:mb-6 md:mb-8">You can join an existing project or create your own!</p>
            
            <div className="flex justify-center my-2 sm:my-4 md:my-4 lg:my-6 xl:my-8">
              <Image
              alt="Image6"
              className="h-32 sm:h-60 md:h-72 lg:h-96 xl:h-auto"
              height={1000}
              src="/image6.svg"
              width={560}
              />
            </div>

          </div>
          )}

      </div>


      <div>

        <div className="flex justify-center font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-20">
          Get started for free
        </div>

        <div className="flex justify-center my-6 sm:my-8 md:my-10 lg:my-12">
            <button
              onClick={handleGetStartedClick}
              className="bg-black text-white px-6 md:px-8 py-1 md:py-2 rounded-full hover:bg-zinc-700">
              <span className="font-medium text-lg sm:text-2xl md:text-3xl">
                Try now
              </span>
            </button>
          
          
        </div>  

        <div className="flex justify-center">
          <Image
            alt="Notion5"
            className="h-40 sm:h-52 md:h-64 lg:h-80 xl:h-96"
            height={1000}
            src="/notion5.svg"
            width={800}
          />
        </div> 



      </div>




      </div>
      
    </div>
  );
};

export default PageBody;
