
/*




*/


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