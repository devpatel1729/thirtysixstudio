import React, { useEffect, useRef, useState } from 'react'
import Canvas from './Canvas'
import data from './data'
import LocomotiveScroll from 'locomotive-scroll';
import { RiMoonFill, RiSoundcloudFill, RiSunFill } from '@remixicon/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const App = () => {

  const [dark, setDark] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [redBg, setRedBg] = useState(false);
  const rotateRef = useRef(null);
  const cursorRef = useRef();
  const textref = useRef();
  const imgref = useRef();
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current = new LocomotiveScroll();
  }, [])


  useGSAP(() => {
    const moveX = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.3,
      ease: "power3",
    });

    const moveY = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.3,
      ease: "power3",
    });

    window.addEventListener("mousemove", (e) => {
      moveX(e.clientX);
      moveY(e.clientY);
    });

    gsap.to(rotateRef.current, {
      rotate: 360,
      duration: 12,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
    });

    const el = textref.current;

    el.addEventListener("mouseenter", () => {
      gsap.to(cursorRef.current, {
        scale: 4,
        xPercent: -50,
        yPercent: -50,
        duration: 0.3,
      });

      gsap.to(imgref.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(cursorRef.current, {
        scale: 1,
        xPercent: 0,
        yPercent: 0,
        duration: 0.3,
      });

      gsap.to(imgref.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
      });
    });

    el.addEventListener("click", () => {
      setDark(false);
      setShowCanvas(true);
      setRedBg(true);
      scrollRef.current.scrollTo(0);
      gsap.to(cursorRef.current,{
        backgroundColor : 'white'
      })
    })

  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed -top-2 -left-2 w-5 h-5 rounded-full bg-[#fd2c2a] pointer-events-none z-999 flex items-center justify-center overflow-hidden"
      >
        <img
          ref={imgref}
          src="https://thirtysixstudio.com/dist/pepper.529367f1.png"
          alt="pepper"
          className="opacity-0 scale-100 transition-all duration-300 cursor-image"
        />
      </div>


      <div
        className={`w-full relative min-h-screen transition-colors duration-500
      ${redBg ? 'bg-[#fd2c2a] text-black' : dark ? 'bg-black text-white' : 'bg-white text-black'}
        `}
      >
        {showCanvas && data[0].map((canvasdets, index) => (
          <Canvas key={index} details={canvasdets} />
        ))}
        <div className="w-full p-3 h-screen relative">
          <nav className="w-full flex justify-between z-50 border-b border-gray-400 pb-1">
            <div className="brand text-md font-normal">Thirtysixstudio</div>
            <div className={`${dark ? 'border-white' : 'border-black'} border -mt-1.5 flex p-1 rounded-3xl gap-2 relative transition-colors duration-300`}>
              {/* Sliding background */}
              <div
                className={`absolute top-0 left-0 w-10 h-8 ${dark ? 'bg-white' : 'bg-black'} rounded-3xl transition-all duration-300 ease-in-out`}
                style={{
                  transform: dark ? 'translateX(2.5rem)' : 'translateX(0)'
                }}
              />
              <div
                className={`text-white rounded-3xl px-2 py-1 cursor-pointer transition-colors duration-300 ease-in-out z-10 relative`}
                onClick={() => setDark(!dark)}
              >
                <RiSunFill size={16} />
              </div>
              <div
                className={`text-black rounded-3xl px-2 py-1 cursor-pointer transition-colors duration-300 ease-in-out z-10 relative`}
                onClick={() => setDark(!dark)}
              >
                <RiMoonFill size={16} />
              </div>
            </div>
            <div className="links flex gap-10">
              {[
                "What we do",
                "Who we are",
                "How we give back",
                "Talk to us",
              ].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-md hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
            </div>
            <div>
              <RiSoundcloudFill />
            </div>
          </nav>
          <div className="flex items-center justify-between textcontainer px-[20%] pt-[5%] w-full ">
            <div className="text w-[40%]">
              <h3 className="text-4xl leading-none">
                At Thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-md w-full mt-10 font-normal leading-none">We're a boutique production studio focused on design, animation, and technology, constantly rethinking what digital craft can do for present-day ads and campaigns.
              </p>
              <p className="text-md mt-7">Scroll</p>
            </div>
            {/* <div className="text w-[40%]">
              <p>THIRTYSIXSTUDIO — FOR ALL THINGS DIGITAL PRODUCTION — </p>
            </div> */}
            <div className="w-55 h-55">
              <svg viewBox="0 0 300 300" ref={rotateRef}>
                <defs>
                  <path
                    id="circle"
                    d="M150,150 m-100,0 a100,100 0 1,1 200,0 a100,100 0 1,1 -200,0"
                  />
                </defs>

                <text fill={`${dark ? 'white' : 'black'}`} fontSize="14" letterSpacing="4">
                  <textPath href="#circle">
                    THIRTYSIXSTUDIO — FOR ALL THINGS DIGITAL PRODUCTION —
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className={`w-full relative min-h-screen transition-colors duration-500 ${redBg ? 'bg-[#fd2c2a] text-black' : dark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        {showCanvas && data[1].map((canvasdets, index) => (
          <Canvas key={index} details={canvasdets} />
        ))}
        <div ref={textref} className="w-full relative top-0 left-0 py-10 border-b border-b-gray-200">
          <h1 className="text-[16vw] font-normal tracking-tight leading-none pl-5">
            Thirtysixstudio
          </h1>
        </div>
        <div className="flex pt-20">
          <h1 className="text-4xl tracking-tighter px-4 w-[20%]">About the brand</h1>
          <p className="text-2xl w-[80%] font-light tracking-tight px-10">
            We are a team of designers, developers, and strategists who are
            passionate about creating digital experiences that are both beautiful
            and functional, we are a team of designers, developers, and
            strategists who are passionate about creating digital experiences that
            are both beautiful and functional.
          </p>
        </div>

      </div>
    </>
  )
}

export default App