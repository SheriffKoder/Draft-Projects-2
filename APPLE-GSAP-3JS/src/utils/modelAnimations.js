
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

// used in @Features
export const animateithGsap = (target, animationProps, scrollProps) => {
    gsap.to(target, {
        ...animationProps,
        scrollTrigger: {
            trigger: target,
            toggleActions: "restart reverse restart reverse",           //enter leave enter-back leave-back
            start: "top 85%",
            ...scrollProps,
        }
    })
}



// used in @Model
export const animateWithGsapTimeline = (
    timeline, rotationRef, rotationState, firstTarget, secondTarget, animationProps
) => {

    // get a specific rotation, 
    timeline.to(rotationRef.current.rotation, {     //small, large states
        y: rotationState,                           //smallRotation, largeRotation
        duration: 1,
        ease: "power2.inOut",
    })

    timeline.to(
        firstTarget,
        {
            ...animationProps,
            ease: "power2.inOut"
        },
        "<" //insert the animation at the start of the previous animation
    )

    timeline.to(
        secondTarget,
        {
            ...animationProps,
            ease: "power2.inOut"
        },
        "<" // animate from the first target to the second target
    )
    
}