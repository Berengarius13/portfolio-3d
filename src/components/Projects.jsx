import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

// Jotai is replacment of useState, which can be accessed globally by any component
// We are calling the 3D component from 2D interface for that we need a solution a global state

export const projects = [
  {
    title: "Movie Info",
    url: "https://github.com/Berengarius13/Movie-info",
    image: "projects/movie.png",
    description: "Simplify your mathematical tasks with this intuitive and straightforward React calculator.",
  },
  {
    title: "Calcualtor",
    url: "https://github.com/Berengarius13/react-calculator-",
    image: "projects/calculator.png",
    description: "Discover and explore movies, anime, series and more. Providing quick and basic information at your fingertips.",
  },
  {
    title: "Image Classifier",
    url: "https://github.com/Berengarius13/Image_Classifier",
    image: "projects/classifier.png",
    description: "Building a custom neural network from scratch. Image recognition, constructing a powerful model entirely from the ground up.",
  },
  {
    title: "Spam Guard",
    url: "https://github.com/Berengarius13/Spam-prediction",
    image: "projects/spam.png",
    description: "Say goodbye to inbox clutter with our LSTM-based model. Your AI-powered Email Spam Predictor.",
  },
  {
    title: "Geo Trackify",
    url: "https://github.com/Berengarius13/L-Getloc_CI",
    image: "projects/location.png",
    description: "Send a Targeted Link and Unlock Accurate Location Data Instantly. Robust Backend in PHP with CodeIgniter Framework.",
  },
  {
    title: "3D Portfolio",
    url: "https://github.com/Berengarius13/portfolio-3d",
    image: "projects/portfolio.png",
    description: "Immerse yourself in 3D portfolio experience crafted with React, Three.js, and the enchanting concept of portals.",
  },
  {
    title: "Bootcamp",
    url: "https://github.com/Berengarius13/Learn-web-development-website",
    image: "projects/frontend.png",
    description: "Sleek and responsive design. This frontend clone showcases a stunning interface while providing an immersive user experience.",
  },
];


// Defining individual project
// Use hightlighted prop to change the opacity of the mesh group
const Project = (props) => {
    const {project, highlighted} = props;
    const background = useRef();
    const bgOpacity = useMotionValue(0.4);

    useEffect(() => {
        animate(bgOpacity, highlighted ? 0.7 : 0.4);
    }, [highlighted])    

    useFrame(() => {
        background.current.material.opacity = bgOpacity.get();
    })
    return (
        // It is ... meaning it is passing all key value pairs
        <group {...props} >
            <mesh 
                position-z = {-0.001} 
                onClick={() => window.open(project.url, "_blank")} 
                ref = {background}
            >

                <planeGeometry args = {[2.2, 2]}/>
                <meshBasicMaterial color= "Black" transparent opacity = {0.4}/>
                
            </mesh>
            <Image scale={[2,1.2, 1]} url = {project.image} toneMapped = {false} position-y={0.3}/>
            <Text
                maxWidth={2}
                anchorX={"left"}
                anchorY={"top"}
                fontSize={0.2}
                position={[-1, -0.4, 0]}
            >
                {project.title.toUpperCase()}
            </Text>
            <Text
                maxWidth={2}
                anchorX="left"
                anchorY="top"
                fontSize={0.1}
                position={[-1, -0.6, 0]}
            >
                {project.description}
            </Text>
        </group>
    )
}
// Default hightlighted index is the middle element of the project so set it's value like that
// We are providing default value for it
export const currentProjectAtom = atom(Math.floor(projects.length/2));

// Here we are adjusting the values of how we want the group to appear in 3D space
export const Projects = () => {
    const {viewport} = useThree();
    const [currentProject] = useAtom(currentProjectAtom);
    return (
        <group position-y = {-viewport.height*2 - 0.5} scale={1.7}>
            {
                // Key value is necessary in react
                projects.map((project, index) => (
                    // Use index to spread the tiles out in 3D space
                    <motion.group key={"project_" + index} position={[index * 2.5, 0, -3]}
                        animate={{
                            x : 0 + (index - currentProject) * 2.7,
                            y : currentProject === index ? 0 : -0.1,
                            z : currentProject === index ? -1.9 : -3,
                            rotateX : currentProject === index ? 0 : -Math.PI/ 3,
                            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI * ((index-currentProject) / (Math.abs(index-currentProject))),
                        }}
                    >
                        <Project project = {project} highlighted={index === currentProject}/>
                    </motion.group>
                ))
            }
        </group>
    )
};