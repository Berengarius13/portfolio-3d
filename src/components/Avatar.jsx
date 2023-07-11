
// Command: npx gltfjsx@6.2.4 public/models/my_model.glb
// both ref and useRef provide a way to reference and interact with DOM elements or components directly.

import React, { useEffect, useRef } from 'react'
import { useAnimations, useFBX, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from "three";

export function Avatar(props) {
  // Destructure animation object to get a string
  const {animation, wireFrame, bow} = props;

  // Provides a state, which can be controlled by GUI and changes in it trigger reRender
  // Just a GUI for updating state variable  
  const { headFollow, cursorFollow } = useControls({
    headFollow : false,
    cursorFollow : false,
    wireFrame : false,
  });

  // add reference to 3D object
  const group = useRef();
  // nodes represent individual objects from model, used to animate
  // Materials are used to define apperance and properties of 3D surface
  const { nodes, materials } = useGLTF('models/my_model.glb');
  // Import typing animation using useFBX method of react-three-fiber
  // Animations is renamed to typingAnimation
  // Animations defines sequence of keyframe and transformation that can be applied to 3D object
  const {animations : typingAnimation} = useFBX("animations/Typing.fbx");
  const {animations : standingAnimation} = useFBX("animations/standing_Idle.fbx");
  const {animations : fallingAnimation} = useFBX("animations/falling_Idle.fbx");
  const {animations : bowingAnimation} = useFBX("animations/bow.fbx");


  typingAnimation[0].name = "Typing";
  standingAnimation[0].name = "Standing";
  fallingAnimation[0].name = "Falling";
  bowingAnimation[0].name = "Bowing";

  // Helps to use imported animation to our 3D object
  // Actions is used to control playback, starting, stopping, time
  const {actions} = useAnimations([typingAnimation[0], standingAnimation[0], fallingAnimation[0], bowingAnimation[0]], group);

  // we are programmatically changing HTML, thus using useRef Hook
  // This hook calls a functionS called when component is initialized  

  // Hook provided by fiber, call back function is invoked just before frame is rendered
  // State parameter represents the current state of the scene and provides access to various properties and methods.
  // State is provided by useFrame call back function
  useFrame((state) => {
    if(headFollow){
      group.current.getObjectByName("Head").lookAt(state.camera.position);
    }
    if(cursorFollow){
      const target = new THREE.Vector3(state.mouse.x, state.mouse.y, 1);
      group.current.getObjectByName("Spine2").lookAt(target);
    }
  });

  // It wil run every time DOM is mounted
  // Set it's dependency aka when this value change run this value updates run again
  // Use fandin and fadeout so animations don't change abruptly
  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();
    return () => {
      // It is run just before animation value changes aka taken out of dome.
      actions[animation].reset().fadeOut(0.5);
    }
  }, [animation]);

  // Everytime wireframe is changed this is called
  // We will iterate over all materials, and set it's value 
  useEffect(() => {
    Object.values(materials).forEach((material) => {
      material.wireframe = wireFrame;
    })
  }, [wireFrame]);

  useEffect(() => {

  }, [bow]);

  return (
    <group {...props} ref={group} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh frustumCulled = {false} geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
      <skinnedMesh frustumCulled = {false} geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
      <skinnedMesh frustumCulled = {false} geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
      <skinnedMesh frustumCulled = {false} geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
      <skinnedMesh frustumCulled = {false} geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
      <skinnedMesh frustumCulled = {false} geometry={nodes.Wolf3D_Glasses.geometry} material={materials.Wolf3D_Glasses} skeleton={nodes.Wolf3D_Glasses.skeleton} />
      <skinnedMesh frustumCulled = {false} name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
      <skinnedMesh frustumCulled = {false} name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
      <skinnedMesh frustumCulled = {false} name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
      <skinnedMesh frustumCulled = {false} name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
    </group>
  )
}

// By preloading resources, the browser can start downloading and caching them early, reducing the latency when they are actually needed
useGLTF.preload('models/my_model.glb');
useFBX.preload("animations/Typing.fbx");
useFBX.preload("animations/standing_Idle.fbx");
useFBX.preload("animations/falling_Idle.fbx");
useFBX.preload("animations/bow.fbx");

