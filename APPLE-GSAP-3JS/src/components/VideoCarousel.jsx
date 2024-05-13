
// Explanation

/*

so we have three ref arrays
videoRef holding refs for video elements
videoDivRef which is a grey dot holding refs for these .map dots
videoSpanRef which is a span inside videoDivRef also filled in the same way

we have a state of video
that just holds action values which are then destructed out to be used
isEnd       //triggers gsap // set by handleProcess cases
startPlay   // set by: gsap.onComplete
videoId     //triggers gsap // set by handleProcess cases
isLastVideo // set by handleProcess cases
isPlaying   // set by: gsap.onComplete, handleProcess cases, video attr onPlay

another state loadedData
which is set by each video jsx onLoadedMetaData attr, by setting loadedData to ..pre + current element

//// part2

// we have the gsap animation [move slider, restart video]
>> which is triggered when [isEnd, videoId] are changed
- moves the #slider by videoId space x 100 (the video wrapper)
- restarts #video by a scroll trigger on the video


// then we have a useEffect [expands/reset progress span]
>> triggred by [videoId, startPlay]
which has a progress of 0, 
takes the videoSpanRef of the videoId
onUpdate
- expands the width of videoDivRef
- expands the width of videoSpanRef by a progress
onComplete, revert them back
if videoId = 0, restart

// another useEffect [play/pause video]
>> triggered by [startPlay, videoId, isPlaying, loadedData]
if isPlaying = false, make the video pause by accessing its ref
if isPlaying and startPlay = true, make the video play

//// part 3

// handleProcess, 
sets the states above based on cases
used by the play/pause button or the video element onEnded attr

 

*/

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);


import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";



const VideoCarousel = () => {
  const videoRef = useRef([]);      // array holding refs for each video element
  const videoDivRef = useRef([]);   // the grey progress bg, filled with .map
  const videoSpanRef = useRef([]);  // a child of videoDivRef, to have width of the video progress

  // video and indicator
  const [video, setVideo] = useState({
    isEnd: false,   //triggers gsap
    startPlay: false,
    videoId: 0,     //triggers gsap
    isLastVideo: false,
    isPlaying: false,   //set by video jsx onPlay
  });

  //set by each video jsx onLoadedMetaData attr, by setting loadedData to ..pre + current element
  const [loadedData, setLoadedData] = useState([]);

  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useGSAP(() => {
    // slider animation to move the video out of the screen and bring the next video in
    // triggered when video isEnd and videoId changes
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut", // show visualizer https://gsap.com/docs/v3/Eases
    });

    // video animation to play the video when it is in the view
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);


  //// useEffect1 (start) /////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    // on video actions, animate the dot element and its progress elements
    // all what is below in this useEffect is if span[videoId]
    if (span[videoId]) {
      // animation to move the indicator
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          // get the progress of the video
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            // set the width of the progress bar (grey dot) to be filled with progress
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw" // mobile
                  : window.innerWidth < 1200
                  ? "10vw" // tablet
                  : "4vw", // laptop
            });

            // set the background color of the progress bar
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },

        // when the video is ended, replace the progress bar with the indicator and change the background color
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId == 0) {
        anim.restart();
      }

      // update the progress bar
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        // ticker to update the progress bar
        gsap.ticker.add(animUpdate);
      } else {
        // remove the ticker when the video is paused (progress bar is stopped)
        gsap.ticker.remove(animUpdate);
      }
    }

  }, [videoId, startPlay]);

  // based on the state, will play or pause
  // videoRef is an array of refs, each ref is set by each video by the video's index in jsx 
  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // this is what sets the state based on cases
  // from the play/pause button or the video attributes
  // vd id is the id for every video until id becomes number 3
  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end": //set on the video jsx onEnd attr
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":    //set on the video jsx onEnd attr
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;

      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      default:
        return video;
    }
  };

  const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (

          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline={true}
                  className={`${
                    list.id === 2 && "translate-x-44"
                  } pointer-events-none`}
                  preload="auto"
                  muted
                  ref={(el) => (videoRef.current[i] = el)}  //fill the refs array with refs pointing to each video
                  onEnded={() =>
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  }
                  onPlay={() =>
                    setVideo((pre) => ({ ...pre, isPlaying: true }))
                  }
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text, i) => (
                  <p key={i} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>

        <button className="control-btn">
          <img //isLastVideo is set by video-last case
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying    //set by gsap onComplete or video onPlay or play/pause cases
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
