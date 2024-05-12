import React, { useEffect, useRef, useState } from "react"
import { highlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// external css: video-carousel_container, flex-center, control-btn

const VideoCarousel = () => {

    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    //Part 1
    // video playing setup
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [video, setVideo] = useState({
        isEnd: "false",
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    })

    const { isEnd, isLastVideo, startPlay, videoId, isPlaying} = video;

    // only if there is data in loadedData we will start playing
    const [loadedData, setLoadedData] = useState([]);

    useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) {
                //if not playing, pause
                videoRef.current[videoId].pause();
            } else {
                //if playing and started, play
                startPlay && videoRef.current[videoId].play();
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData]);



    useEffect(()=> {
        let currentProgress = 0;
        let span = videoSpanRef.current;

        //if we have span with the specific video id then we can animate it
        if (span[videoId]) {
            // animate the progress of the video
            //anim.progess by gsap to track progress of an animation
            let anim = gsap.to(span[videoId], {

                ///////////////////////////////////////////////////////////
                // Part3
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100);

                    if (progress != currentProgress) {
                        currentProgress = progress;

                        //the dot for the video animation
                        gsap.to(videoDivRef.current[videoId], {
                            width: window.innerWidth < 760
                                ? "10vw"
                                : window.innerWidth < 1200
                                ? "10vw"
                                : "4vw"
                        })

                        gsap.to(span[videoId], {
                            width: `${currentProgress}`,
                            backgroundColor: "white"
                        })
                    }
                },

                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: "12px",
                        })
                        gsap.to(span[videoId], {
                            backgroundColor: "#afafaf"
                        })
                    }

                }
            })

            if (videoId === 0) {
                anim.restart();
            }

            const animUpdate = () => {
                anim.progress(videoRef.current[videoId].currentTime / highlightsSlides[videoId].videoDuration);
            }

            if (isPlaying) {
                gsap.ticker.add(animUpdate)    //update the progress bar
            } else {
                gsap.ticker.remove(animUpdate)
            }
            ///////////////
        
           

        }

       ////////////////////////////////////////////


    }, [videoId, startPlay]);


    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    //Part 2
    // video playing make first video play.

    const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);

    useGSAP(()=> {
        gsap.to("#video", {
            scrollTrigger: {
                trigger:  "#video",  //scroll trigger when the video is in view,
                toggleActions: "restart none none none",    //only interested when it comes into view not from other directions
            },
            onComplete: () => {
                setVideo((pre) => ({
                   ...pre,
                   startPlay: true,
                   isPlaying: true, 
                }))
            }
        })

        //Part4
        gsap.to("#slider", {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: "power2.inOut"

        })


    },[isEnd, videoId]);

    const handleProcess = (type, i) => {
        switch(type) {
            case "video-end":
                setVideo((prevVideo) => ({
                    ...prevVideo, isEnd:true,
                    videoId: i+1
                }))
            break;

            case "video-last":
                setVideo((prevVideo) => ({
                    ...prevVideo, isLastVideo:true,
                }))
            break;
    
            case "video-reset":
                setVideo((prevVideo) => ({
                    ...prevVideo, isLastVideo:false, videoId: 0
                }))
            break;

            case "play":
                setVideo((prevVideo) => ({
                    ...prevVideo, isPlaying:!prevVideo.isPlaying
                }))
            break;

            case "pause":
                setVideo((prevVideo) => ({
                    ...prevVideo, isPlaying:!prevVideo.isPlaying
                }))
            break;


            default: return video;
        }

    }

    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////


  return (
    <>
        <div className="flex items-center">

            {highlightsSlides.map((list, i)=>  {

            return(
                <div key={list.id} id="slider" className="sm:pr-20 pr-10">

                    <div className="video-carousel_container">

                        {/* the black box */}
                        <div className="w-full h-full flex-center 
                        rounded-3xl overflow-hidden bg-black">

                            {/* the video */}
                            <video
                            id="video"
                            playsInline={true}
                            preload="auto"
                            muted
                            //part1//
                            ref={(el) => (videoRef.current[i] = el)}
                            onPlay={() => {
                                setVideo((prevVideo) => ({
                                    ...prevVideo, isPlaying: true
                                }))
                            //  //
                            }}
                            //part2
                            onLoadedMetadata = {(e) => handleLoadedMetaData(i,e)}
                            //part3
                            //move to next progress
                            onEnded={() => {i !== 3 
                                ? handleProcess("video-end", i)
                                : handleProcess("video-last") }}
                            //part5
                            className={`${list.id === 2 && 'translate-x-44'}
                            pointer-events-none`}
                            >
                                <source src={list.video} type="video/mp4"/>
                            </video>

                        </div>

                        {/* over the image text */}
                        <div className="absolute top-12 left-[5%] z-[10]">
                            {list.textLists.map((text)=> (
                                <p key={text} className="md:text-2xl text-xl font-medium">
                                    {text}
                                </p>
                            ))}
                        </div>



                    </div>

                </div>
            )})}
        </div>


        {/* // part1 */}
        <div className=" relative flex-center mt-10">
            <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                {videoRef.current.map((_, i) => (
                    
                    <span key={i} ref={(el) => {videoDivRef.current[i] = el}}
                    className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer">
                        
                        <span className="absolute h-full w-full rounded-full"
                        ref={(el) => {videoSpanRef.current[i] = el}}>
                        </span>

                    </span>
                ))}
            </div>

            {/* play/pause button */}
            <button className="control-btn">
                <img 
                src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                alt={isPlaying ? "replay" : !isPlaying ? "play" : "pause"}
                onClick={
                    isLastVideo ? ()=> handleProcess("video-reset")
                    : !isPlaying ? () => handleProcess("play")
                    : () => handleProcess("pause")
                }
                />
            </button>

        </div>
    </>

    )
}

export default VideoCarousel