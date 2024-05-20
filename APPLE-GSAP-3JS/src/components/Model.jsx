import { useGSAP } from "@gsap/react"
import React, {useState, useRef, useEffect} from "react"
import gsap from "gsap";
import ModelView from "./ModelView";

import { yellowImg } from "../utils";
import { models, sizes } from "../constants";

import * as THREE from "three";
import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { animateWithGsapTimeline } from "../utils/modelAnimations";

// external css: common-padding, screen-max-width, section-heading

const Model = () => {

    //references to the phone model sizes
    //the size we are currently viewing
    const [size, setSize] = useState("small");

    //the model details - will be changed with user action
    const [model, setModel] = useState({
        title: "iPhone 15 Pro in Natural Titanium",
        color: ["#8F8A81", "#FFE7B9", "#6F6C64"],   //colors for different meshes
        img: yellowImg, // wallpaper texture
    });

    // camera control for the model view
    const cameraControlSmall = useRef();
    const cameraControlLarge = useRef();

    // a ref to keep track of the model to access its properties when animating
    // model
    const small = useRef(new THREE.Group());
    const large = useRef(new THREE.Group());

    // a ref to keep track of the rotation value of each model
    // so can be able to reset the position on model change
    const [smallRotation, setSmallRotation] = useState(0);
    const [largeRotation, setLargeRotation] = useState(0);

    // change between models
    const tl = gsap.timeline();

    // animateWithGsapTimeline is an external function
    useEffect(()=> {
        if (size === "large") {
            // passing small because we want to animate to the small from the large
            //translate to remove from view
            // we get the small model, then rotate by the value stored in the smallRotation
            // animate the small model view to the left
            // animate the large model view to the center
            animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", 
                {
                    transform: "translateX(-100%)",
                    duration: 2.
                },
            );
        }
        if (size === "small") {
            // display the large model and the large rotation
            // animate from view2 to view1
            animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", 
            {
                transform: "translateX(0)",
                duration: 2.
            },
        );
        }

    },[size]);

    useGSAP(()=> {
        gsap.to("#heading", {
            y: 0,
            opacity: 1,
        })
    }, []);


  return (
    <section className="common-padding">
        <div className="screen-max-width">
            <h1 id="heading" className="section-heading">
                Take a closer look.
            </h1>

            <div className="flex flex-col items-center mt-5">
                <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
                    <ModelView
                    index={1}
                    groupRef={small}
                    gsapType="view1"
                    controlRef={cameraControlSmall}
                    setRotationState={setSmallRotation}
                    item={model}
                    size={size}/>

                    <ModelView
                    index={2}
                    groupRef={large}
                    gsapType="view2"
                    controlRef={cameraControlLarge}
                    setRotationState={setLargeRotation}
                    item={model}
                    size={size}/>

                    {/* View port is a way to render multiple models in a React.Three canvas */}
                    {/* this will allow to animate that model
                    eventSource   // get access to the event source
                    // useful when want to interact with the model working with */}
                    <Canvas
                    className="w-full h-full"
                    style={{position: "fixed", top: 0, bottom: 0, left: 0, right: 0, overflow: "hidden"}}
                  
                    eventSource={document.getElementById("root")}
                    >
                        <View.Port/>
                    </Canvas>
                </div>

                <div className="mx-auto w-full">
                    <p className="text-sm font-light text-center mb-5">{model.title}</p>
                    <div className="flex-center">
                        <ul className="color-container">
                            {models.map((item, i) => (
                                <li key={i} className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                                style={{backgroundColor: item.color[0]}}
                                onClick={()=> setModel(item)}
                                >

                                </li>
                            ))}
                        </ul>

                        <button className="size-btn-container">
                            {sizes.map(({label, value})=> (
                                <span key={label}
                                className="size-btn"
                                style={{ backgroundColor: size === value ? "white" : "transparent",
                                color: size === value ? "black" : "white"
                                }}
                                onClick={()=> setSize(value)}>
                                    {label}
                                </span>
                            ))}
                        </button>

                    </div>
                    
                </div>


            </div>
        </div>

    </section>
  )
}

export default Model