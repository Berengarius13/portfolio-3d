import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
// Use ref for lastScrool to prevent it from changing values during rerender
// Gsap makes scrolling to top way easier
// Function to implement scrolling which happens automatically

export const ScrollManager = (props) => {
    const {section, onSectionChange} = props;

    const data = useScroll();
    const lastScroll = useRef(0);
    const isAnimating = useRef(false);

    // Fix we need to add to make sure gsap is working
    data.fill.classList.add("top-0");
    data.fill.classList.add("absolute");

    // Use gsap to implement section change functionality
    // The automatic scroll functionality
    useEffect(() => {
        gsap.to( data.el, {
            duration:1,
            scrollTop : section * data.el.clientHeight,
            onStart : () => {
                isAnimating.current = true;
            },
            onComplete: () =>{
                isAnimating.current = false;
            }
        })
    }, [section]);
    

    // Make changes when section value changes, runs before every frame is being rendered.
    // When we are scrolling and we leave section 0
    // When we are scrolling and we arrive section 0
    useFrame(() => {
        if(isAnimating.current){
            lastScroll.current = data.scroll.current;
            return;
        }
        // percentage of scroll and how many pages
        const curSection = Math.floor(data.scroll.current * data.pages);
        if(data.scroll.current > lastScroll.current && curSection == 0){
            onSectionChange(1);
        }
        if(data.scroll.current < lastScroll.current && data.scroll.current < 1 /(data.pages-1)){
            onSectionChange(0);
        }
        lastScroll.current = data.scroll.current;
    })
    return null;
}