import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  useScroll,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "./Avatar";
import { Office } from "./Office";
import { framerMotionConfig } from "./config";
import { Projects } from "./Projects";
import { Background } from "./Background";


// adding orbit controls, to box buffer geometry
// groups is to make working with group of object clearer
// - line is used to reach to nested object, position.x
// group provides set of properties to manupulate 3D objects in space.
// Animation state object is defined with three possible values, default to string "Typing"
// animate y will move in y direction
// viewport height is height of viewport in pixels
// also we are using a dynamic scroll defined here to get section value
export const Experience = (props) => {
  const { menuOpened} = props;
  const {viewport} = useThree();
  const data = useScroll();
  // to dynamically calculate section value
  const isMobile = window.innerWidth < 768; // For mobile
  const responsiveRatio = viewport.width / 12;
  // We set range for office scale
  const officeScaleRatio =  Math.max(0.5, Math.min(0.9 * responsiveRatio, 0.9));

  const [section, setSection] = useState(0);

  // Value can be used to control animations or dynamic properties of elements
  const cameraPostionX = useMotionValue(0);
  const cameraLookAtx = useMotionValue(0);

  // We will animate our values, We are changing camera position as menu is opening and closing
  // We have to redefine the config file for framer motion that we have defined earlier in app
  useEffect(() => {
    animate(cameraPostionX, menuOpened ? -5 : 0, {...framerMotionConfig});
    animate(cameraLookAtx, menuOpened? 5 : 0, {...framerMotionConfig});
  }, [menuOpened]);

  const characterContainerAboutRef = useRef();

  // To store and track changes to character animation, also trigger falling during section change
  const [characterAnimation, setCharacterAnimation] = useState("Typing");
  useEffect(()=>{
    setCharacterAnimation("Falling");
    // Schedules a callback function after delay of x milli seconds
    setTimeout(() => {
      setCharacterAnimation(section === 0 ? "Typing" : "Standing");
    }, 600);
    if(section === 4){
      setTimeout(() => {
        setCharacterAnimation("Bowing");
      }, 1500);
      setTimeout(() => {
        setCharacterAnimation("Standing");
      }, 3300);
    }
  }, [section]);

  const characterGroup = useRef();
  // state is provided by useFrame call back function and contains various properties of state
  // Update state whenever according to values of cameralookat and camera position
  useFrame((state) => {
    

    // curSection is used to calculate the section we are at
    const curSection = Math.floor(data.scroll.current * data.pages);
    if(curSection !== section){
      setSection(curSection);
    }
    // console.log(section);
    

    state.camera.position.x = cameraPostionX.get();
    state.camera.lookAt(cameraLookAtx.get(), 0, 0);

    // We are applying the position of character in office that would otherwise have to be hardcoded
    // We are getting position from it's container inside office, then applying it to its changed location
    if (section === 0) {
      characterContainerAboutRef.current.getWorldPosition(
        characterGroup.current.position
      );
    }
  })
  return (
    <>
      {/* Avatar is put here */}
      {/* Bug: it is detecting a section 4 at end so just write repeat value for section 3 */}
      <Background/>
      <motion.group
        ref = {characterGroup}
        rotation={[-3.141592653589793, 1.2053981633974482, 3.141592653589793]}
        scale = {[officeScaleRatio,officeScaleRatio,officeScaleRatio]}
        // This suggest section value is used as "variant" or the value which define the trigger for animation
        // Variants suggest the action for each group
        animate = {"" + section}
        transition={{
          duration : 0.6,
        }}
        variants={{
          0: {
            
            scaleX: officeScaleRatio,
            scaleY: officeScaleRatio,
            scaleZ: officeScaleRatio,
          },
          1: {
            y: -viewport.height + 1,
            x: isMobile ? 0.3 : 0,
            z: 7,
            rotateX: 0,
            rotateY: isMobile ? -Math.PI / 2 : 0,
            rotateZ: 0,
            scale : isMobile ? 1.2 : 1.1,
          },
          2: {
            x: isMobile ? -1.4 : -2 + 0.2,
            y: -viewport.height * 2 + 0.2,
            z: 3,
            rotateX: 0,
            rotateY: Math.PI / 2,
            rotateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
          },
          3: {
            y: isMobile? -viewport.height * 3 + 2 :  -viewport.height * 3 + 1.2,
            x: 0.24,
            z: 8.5,
            rotateX: 0,
            rotateY: -Math.PI / 4,
            rotateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
          },
          4: {
            y: isMobile? -viewport.height * 3 + 2 :  -viewport.height * 3 + 1.2,
            x: 0.24,
            z: 8.5,
            rotateX: 0,
            rotateY: -Math.PI / 4,
            rotateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
          },
        }}

      >
        <Avatar animation={characterAnimation} wireFrame = {section === 1} bow = {section === 4}/>
      </motion.group>
      <ambientLight intensity={1}/>
      <motion.group 
        position={[isMobile? 0 : 1.5 * officeScaleRatio, isMobile? -viewport.height/6 : 2, 3]} 
        scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]} 
        rotation-y={-Math.PI / 4}
        animate = {{
          y : isMobile ? -viewport.height/6 : 0,
        }}
        transition={{
          duration : 0.8,
        }}
      >
        <Office section= {section}/>
        {/* Old character position inside group office, place it globally */}
        {/* Add the avatar with proper position and rotation  */}
        {/* Here we have marked the position of where is the position of sitting character and pass by ref */}
        <group
          ref={characterContainerAboutRef}
          name="CharacterSpot"
          position={[0.07, 0.16, -0.57]}
          rotation={[-Math.PI, 0.42, -Math.PI]}
        ></group>
      </motion.group>
        
      {/* Float makes the component float or hower */}
      {/* Motion group is allowing our 3d objects to continue to remain on screen even after scrolling up */}
      {/* When we are going from section 1 to 2 whole group shifts up */}
      {/* animate is used to define initial and target state of animation */}
      
      <motion.group
        position={[0, isMobile? -viewport.height :  -1.5 * officeScaleRatio, -10]}
        animate={{
          z: section === 1 ? 0 : -10,
          y: section === 1 ? -viewport.height : (isMobile ? -viewport.height : -1.5 * officeScaleRatio),
        }}
      >
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        <Float>
          <mesh position={[1, -3, -15]} scale={[2, 2, 2]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.4}
              speed={4}
              color={"red"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[3, 3, 3]} position={[3, 1, -18]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color="yellow"
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[1.4, 1.4, 1.4]} position={[-3, -1, -11]}>
            <boxGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={1}
              speed={5}
              color={"blue"}
            />
          </mesh>
        </Float>
        
      </motion.group>
      <Projects/>
    </>
  );
};
