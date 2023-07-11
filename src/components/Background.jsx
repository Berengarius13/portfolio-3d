import { Sphere, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// Used to animate the the transition of background color
// It uses gsap timeline
export const Background = () => {
    // side means it will only be visible from backside
    const material = useRef();
    const color = useRef({
        // Default color
        color : "#dcffff",
    })
    const data = useScroll();
    const tl = useRef();
    useFrame(() => {
        // Update the progress of time line
        tl.current.progress(data.scroll.current);
    material.current.color = new THREE.Color(color.current.color);
    });
    
    useEffect(() => {
        tl.current = gsap.timeline();
        // It defines the transition over time 
        tl.current.to(color.current, {
            color: "#212121",
        });
        tl.current.to(color.current, {
            color: "#7a7ca5",
        });
        tl.current.to(color.current, {
            color: "#9b96dd",
        });
        

    }, []);
    return (
        <group>
            <Sphere scale = {[30, 30, 30]}>
                <meshBasicMaterial ref = {material} side = {THREE.BackSide} toneMapped={false}/>
            </Sphere>
        </group>
    )
}