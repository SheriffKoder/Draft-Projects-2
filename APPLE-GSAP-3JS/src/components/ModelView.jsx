import { Html, OrbitControls, PerspectiveCamera, View } from "@react-three/drei"
import React, { Suspense } from "react"
import Lights from "../utils/Lights"
import Model from "../utils/IPhone"
import Loader from "../utils/Loader"
import * as THREE from "three";



const ModelView = ({index, groupRef, gsapType, controlRef, setRoationState, size, item}) => {
  return (
    <View
    index={index}
    id={gsapType}
    className={`w-full h-full absolute
    ${index === 2 ? "right-[-100%]"  : ""}`}>

        <ambientLight intensity={0.3} />

        {/* camera like the human eye */}
        <PerspectiveCamera makeDefault position={[0,0,4]}/>

        <Lights/>

        <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0,0,0)}   //provide a target, to target the center of the screen
        onEnd={()=> setRoationState(controlRef.current.getAzimuthalAngle())} //get the angle of the camera to know where we are
        />
        
        <group ref={groupRef} name={`${index === 1} ? "small" : "large"`}>
            <Suspense fallback={<Html><Loader/></Html>}>
                <Model scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
                item={item}
                size={size}/>
            </Suspense>
        </group>

    </View>
  )
}

export default ModelView