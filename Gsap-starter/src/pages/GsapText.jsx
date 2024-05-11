import {ScrollTrigger} from "gsap/all";
import gsap from "gsap";
import {useRef} from "react";
import { useGSAP } from "@gsap/react";


const GsapText = () => {
  // TODO: Implement gsap text animation

  const Reff = useRef();
  const doubleT = useRef();


  useGSAP(()=> {

    //
    gsap.to("#text", {
      ease: "power1.out",
      opacity: 1,
      y: 0,
    })

    //
    gsap.fromTo(".para", {
      opacity: 0,
      y: 20,
    }, {
      opacity: 1,
      y: 0,
      repeat: -1,
      yoyo: true,
      repeatDelay: 3,
      // delay: 1,
      stagger: 0.1  //for each para element
    })

    //
    const boxes = gsap.utils.toArray(Reff.current.children);

    boxes.forEach((box, index) => {
      gsap.to(box, {
        ease: "power1.out",
        opacity: 1,
        y: 0,
        // repeat: -1,
        // yoyo: true,
        delay: (index+1)/2,
        // repeatDelay: 2,
      })
  
    });


    //
    const timeline = gsap.timeline({
      repeat: -1,
      // repeatDelay: 1+index,
      // yoyo: true,
    });
    
    const text = gsap.utils.toArray(doubleT.current.children);

    text.forEach((box2, index) => {
        
      timeline.to(box2, {
        y: 30,
        opacity: 0,
        duration: 0.05
      });
  
      timeline.to(box2, {
        y: 0,
        opacity: 1,
      });
  
      timeline.to(box2, {
        y: 0,
        opacity: 1,
        delay: 0.05,
      });
  
      timeline.to(box2, {
        y: -30,
        opacity: 0,
      });
    });


    

    
    


  }, []);

  return (
    <main>

      <h1 id="text" className="opacity-0 translate-y-10">
        GsapText
      </h1>

      <div ref={Reff} className="text-white flex flex-row">
        <h1 id="" className="opacity-0 translate-y-10">
          One
        </h1>
        <h1 id="" className="opacity-0 translate-y-10">
          Two
        </h1>
      </div>

      <div className="relative text-white" ref={doubleT}>
        <span className="absolute left-0 translate-y-30 opacity-0">Hello</span>
        <span className="absolute left-0translate-y-30 opacity-0">World</span>
        <span className="absolute left-0translate-y-30 opacity-0">Again</span>

      </div>

      <p className="mt-5 text-gray-500 para" >
        We can use same method like <code>gsap.to()</code>,{" "}
        <code>gsap.from()</code>, <code>gsap.fromTo()</code> and{" "}
        <code>gsap.timeline()</code> to animate text.
      </p>

      <p className="mt-5 text-gray-500 para">
        Using these methods we can achieve various text animations and effects
        like fade in, fade out, slide in, slide out, and many more.
      </p>

      <p className="mt-5 text-gray-500 para">
        For more advanced text animations and effects, you can explore the GSAP
        TextPlugin or other third-party libraries that specialize in text
        animations.
      </p>

      <p className="mt-5 text-gray-500 para">
        Read more about the{" "}
        <a
          href="https://greensock.com/docs/v3/Plugins/TextPlugin"
          target="_blank"
          rel="noreferrer noopener nofollow"
        >
          TextPlugin
        </a>{" "}
        plugin.
      </p>
    </main>
  );
};

export default GsapText;
