import {
  CameraControls,
  Environment,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  useCursor,
  useTexture,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion-3d";


export const Experience2 = () => {
  // Active and setActive will take a name, which will be which world is currently open
  // Whenver this value changes we will open the world, 
  const [active, setActive] = useState(null);
  // If we are at hovered state, aka make world clickable, same logic as active and set active
  const [hovered, setHovered] = useState(null);
  // It will set curser to show that it is clickable
  useCursor(hovered);
  // To animate camera use controlsRef
  const controlsRef = useRef();

  // It is used to access and interact with the three.js scene instance within a React component.
  // The useThree hook accepts a callback function as its argument, which receives the state object containing various properties and methods related to the three.js scene. In this case, the state.scene property is used to access the scene instance.
  const scene = useThree((state) => state.scene);

  // So this will animate the enterance of camera to cneter
  useEffect(() => {
    if (active) {
      const targetPosition = new THREE.Vector3();
      // Store the position of active round box in the target position
      scene.getObjectByName(active).getWorldPosition(targetPosition);
      // 0, 0, 5 represents we are going inside the world
      controlsRef.current.setLookAt(
        0,
        0,
        5, 
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      );
    } else{
      // We want to go back to the current camera then we do this
      controlsRef.current.setLookAt(0, 0, 10, 0, 0, 0, true);
    }
  }, [active]);


  return (
    <motion.group 
    initial = {{
      opacity: 0,
      y: 2,
      scale:0.5,
     }} 
      transition={{
        duration:2.2,
        delay:0.2,
      }}
      animate={{
        y : 0,
        scale :1,
      }}
    >
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      {/* Use camera controls to edit the camera enterance in world*/}
      {(
        <CameraControls
          ref={controlsRef}
          maxPolarAngle={Math.PI / 1.4}
          minPolarAngle={Math.PI / 6}
        />
      )}
      
      
      <JourneyStage
        texture={"textures/tech_stack.jpg"}
        name="Tech Stack"
        color={"#f70000"}
        position-x={-1.5}
        rotation-y={Math.PI / 8.5}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >

      </JourneyStage>
      <JourneyStage
        name="My Stats"
        color="#8ecc50"
        texture={"textures/achievement.jpg"}
        position-x={1.5}
        rotation-y={-Math.PI / 8.5}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
      </JourneyStage>
    </motion.group>
  );
};

const JourneyStage = ({
  children,
  texture,
  name,
  color,
  active,
  setActive,
  hovered,
  setHovered,
  ...props
}) => {
  const map = useTexture(texture);
  // Below lines are because textures are inverted 
  map.wrapS = THREE.RepeatWrapping;
  map.repeat.x = - 1;
  const portalMaterial = useRef();

  // Use Maath to get a easing function, and animate opening of world
  useFrame((_state, delta) => {
    // Wether world is open or not
    const worldOpen = active === name;
    // We want to edit the blend property
    easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2, delta);
  });

  return (
    <group {...props}>
      <Text
        font="fonts/Fasthand-Regular.ttf"
        fontSize={0.4}
        position={[0, -1.3, 0.051]}
        anchorY={"bottom"}
      >
        {name}
        {/* Add color to text geometry */}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      {/* Mesh portal material is inside a rounded box */}
      {/* Add name property to set the position of camera while entering inside */}
      {/* When pointer is on rounded box we will set the hovered as the current active window */}
      <RoundedBox
        name={name}
        args={[2 + 0.1, 3 + 0.1, 0.1]}
        onDoubleClick={() => setActive(active === name ? null : name)}
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}
      >
        
        {/* Double side because we want to be on back ise of it too */}
        {/* When "Blend" property of mesh portal material is 1 world will be open and 0 world will be closed, 0.5 is in between 
          * Use reference to our portal material to change it
          */}

        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
          {/* Set intensity of light inside portal material */}
          <ambientLight intensity={0.8}  />
          <Environment preset="sunset" />
          {/* {children} */}
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            {/* Backside because we want to wrap inside of sphere */}
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};
