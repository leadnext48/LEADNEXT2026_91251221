'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { cinzel, playfair } from '@/app/fonts';

const DhoniInteractiveSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  
  const sectionData = {
    title: "Shaped by Surroundings",
    subtitle: "One landscape. Many ways to belong."
  };

  const options = [
    {
      key: "waterfall",
      title: "Dhoni Waterfalls",
      description: "A seasonal cascade shaped by monsoon rains, hidden within forested trails and rocky terrain.",
      image: "/1.webp"
    },
    {
      key: "forest_trails",
      title: "Forested Trails",
      description: "Quiet paths through teak and mixed forest, offering space for reflection and unhurried exploration.",
      image: "/2.webp"
    },
    {
      key: "monsoon_landscape",
      title: "Monsoon Landscape",
      description: "A living environment transformed by rain, mist, and sound — where the land feels constantly in motion.",
      image: "/3.webp"
    },
    {
      key: "valley_views",
      title: "Valley & Foothills",
      description: "Open hill edges and gentle slopes that frame expansive views of Palakkad's natural terrain.",
      image: "/4.webp"
    },
    {
      key: "quiet_spaces",
      title: "Quiet Open Spaces",
      description: "Natural clearings and calm surroundings that support focus, stillness, and everyday student life.",
      image: "/5.webp"
    }
  ];

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 150 * i);
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black font-sans text-white py-12 md:py-20"> 
      {/* Header Section with extra spacing */}
      <div className="w-full max-w-4xl px-6 mb-8 md:mb-16 text-center">
        <h1 className={`${cinzel.className} text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-wide drop-shadow-lg animate-fadeInTop delay-300`}>
          {sectionData.title}
        </h1>
        <p className={`${playfair.className} text-base md:text-lg lg:text-xl text-white font-normal max-w-xl mx-auto animate-fadeInTop delay-600`}>
          {sectionData.subtitle}
        </p>
      </div>

      {/* Options Container - Responsive */}
      <div className="options flex flex-col md:flex-row w-full max-w-[90%] md:max-w-[900px] md:min-w-[600px] h-auto md:h-[400px] mx-0 items-stretch overflow-hidden relative mb-8 md:mb-16 px-4 md:px-0">
        {options.map((option, index) => {
          return (
            <div
              key={option.key}
              className={`
                option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out
                ${activeIndex === index ? 'active' : ''}
                ${activeIndex === index ? 'h-[300px] md:h-auto' : 'h-[80px] md:h-auto'}
              `}
              style={{
                margin: 0,
                borderRadius: 0,
                borderWidth: '0px',
                cursor: 'pointer',
                backgroundColor: '#000',
                boxShadow: activeIndex === index 
                  ? '0 20px 60px rgba(0,0,0,0.50)' 
                  : '0 10px 30px rgba(0,0,0,0.30)',
                zIndex: activeIndex === index ? 10 : 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                position: 'relative',
                overflow: 'hidden',
                willChange: 'flex-grow, box-shadow, height',
                opacity: animatedOptions.includes(index) ? 1 : 0,
                transform: animatedOptions.includes(index) 
                  ? 'translate(0, 0)' 
                  : 'translate(0, -30px)',
              }}
              onClick={() => handleOptionClick(index)}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 transition-all duration-700 ease-in-out"
                style={{
                  backgroundImage: `url('${option.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  transform: activeIndex === index ? 'scale(1)' : 'scale(1.1)',
                  filter: activeIndex === index ? 'brightness(1)' : 'brightness(0.9)'
                }}
              ></div>

              {/* Black overlay for inactive images */}
              <div 
                className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-700 ease-in-out"
                style={{
                  opacity: activeIndex === index ? 0 : 0.6
                }}
              ></div>

              {/* Shadow effect */}
              <div 
                className="shadow absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
                style={{
                  bottom: activeIndex === index ? '0' : '-40px',
                  height: '120px',
                  boxShadow: activeIndex === index 
                    ? 'inset 0 -120px 120px -120px #000, inset 0 -120px 120px -80px #000' 
                    : 'inset 0 -120px 0px -120px #000, inset 0 -120px 0px -80px #000'
                }}
              ></div>
              
              {/* Label with text only */}
              <div className="label absolute left-0 right-0 bottom-4 flex items-end justify-start z-2 pointer-events-none px-4 w-full pb-2">
                <div className={`${playfair.className} info text-white relative w-full pr-4`}>
                  <div 
                    className="main font-semibold text-base md:text-lg"
                    style={{
                      opacity: activeIndex === index ? 1 : 0,
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                      lineHeight: '1.3',
                      transition: 'opacity 0.5s ease-in-out',
                      transitionDelay: activeIndex === index ? '0.3s' : '0s',
                      visibility: activeIndex === index ? 'visible' : 'hidden'
                    }}
                  >
                    {option.title}
                  </div>
                  <div 
                    className="sub text-base md:text-base text-white font-normal mt-1"
                    style={{
                      opacity: activeIndex === index ? 1 : 0,
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                      lineHeight: '1.4',
                      transition: 'opacity 0.5s ease-in-out',
                      transitionDelay: activeIndex === index ? '0.4s' : '0s',
                      visibility: activeIndex === index ? 'visible' : 'hidden'
                    }}
                  >
                    {option.description}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Custom animations */}
      <style jsx>{`
        .option {
          width: 100%;
          min-height: 80px;
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (min-width: 768px) {
          .option {
            min-width: 60px;
            min-height: 100px;
            width: auto;
            height: auto !important;
            flex: 1 1 0%;
            transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .option.active {
            flex: 7 1 0%;
          }
        }
        
        @keyframes slideFadeIn {
          0% {
            opacity: 0;
            transform: translateX(-60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInFromTop {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInTop {
          opacity: 0;
          transform: translateY(-20px);
          animation: fadeInFromTop 0.8s ease-in-out forwards;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-600 {
          animation-delay: 0.6s;
        }

        /* Mobile-specific styles */
        @media (max-width: 768px) {
          .options {
            gap: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default DhoniInteractiveSelector;