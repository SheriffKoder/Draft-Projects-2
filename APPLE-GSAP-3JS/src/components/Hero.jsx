"use client"
import React, { useEffect } from "react"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { heroVideo, smallHeroVideo } from "../utils"
import { useState } from "react"

// external css: nav-height, flex-center, 

const Hero = () => {

    ////////////////////////////////////////////////////////////
    // switching between video sources depending on the viewport
    const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo);

    const handleVideoSrcSet = () => {
        if (window.innerWidth < 760) {
            setVideoSrc(smallHeroVideo);
        } else {
            setVideoSrc(heroVideo);
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleVideoSrcSet);

        return () => {
            window.removeEventListener("resize", handleVideoSrcSet);
        }
    })
    ////////////////////////////////////////////////////////////


    useGSAP(()=>{
        gsap.to(".hero-title", {
            opacity: 1,
            delay: 2
        })

        gsap.to("#cta", {
            opacity: 1,
            delay: 2,
            y: -50,
        })

    },[])


  return (
    <section className="w-full nav-height bg-black relative">

        <div className="h-5/6 w-full flex-center flex-col">

            <p className="hero-title">iPhone 15 Pro</p>

            <div className="md:w-10/12 w-9/12">
                <video autoPlay muted playsInline={true} key={videoSrc}
                className="pointer-events-none">
                    <source src={videoSrc} type="video/mp4" />
                </video>
            </div>

        </div>

        {/* call to action */}
        <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
            <a href="#highlights" className="btn">Buy</a>
            <p className="font-normal text-xl">From $199</p>
        </div>

    </section>
  )
}

export default Hero