import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Experience2 } from "./components/Experience2";
import { ScrollControls, Scroll} from "@react-three/drei";
import { Interface } from "./components/Interface";
import { Suspense, useEffect, useState } from "react";
import { ScrollManager } from "./components/ScrollManager";
import { Menu } from "./components/Menu";
import { MotionConfig } from "framer-motion";
import { Leva } from "leva";
import { framerMotionConfig } from "./components/config"
import { Cursor } from "./components/Cursor";
import { LoadingScreen } from "./components/LoadingScreen";
import {CanvasLoader} from "./components/CanvasLoader"
// Canvas is a scene where you define react three fiber scene
// shadows: It is a prop passed to the <Canvas> component to enable the rendering of shadows.
// Camera passes the position and field of view prop to canvas
// Color value is set same as background and it is set to "#ececec"
// Experience is the component being rendered.
// Use attach to bind objects to their parent. 
/*
 * We need to import scroll control from drei, gives us power to control how canvas appears when we scroll 
 * Scroll controls create a HTML scroll container in front of the canvas. Everything you drop into the <Scroll> component will be affected.
 */

const ScrollToEnd = () => {
  useEffect(() => {
    const handleScrollToEnd = () => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    };

    handleScrollToEnd();
  }, []);

  return null; // This component doesn't render anything, just scrolls to the end
};

function App() {
  // We have currently 4 section values
  const [section, setSection] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);
  const [started, setStarted] = useState(false);

  // To close menu whenever section changes
  useEffect(() => {
    setMenuOpened(false);
  }, [section])

  return (
    <>
    <LoadingScreen started={started} setStarted={setStarted}/>
    {/* Use framer motion motion config to wrap everything around it and set general animation setting */}
    <MotionConfig 
      transition={{
        ...framerMotionConfig,
      }}
    >
    <Canvas 
      shadows 
      camera={{ position: [0, 3, 10], fov: 42 }}
    >
      <color attach="background" args={["#dcffff"]} />

      <ScrollControls pages={4} damping={0.1}>
      <ScrollManager section = {section} onSectionChange = {setSection}/>
        {/* Add experiece to scroll, aka It scrolls up with animation */}

        {/* The Suspense component is a feature in React that allows you to suspend rendering a part of your component tree while waiting for some asynchronous data to load. */}
        <Suspense>
          <Scroll>
            {
              started && (<Experience section = {section} menuOpened = {menuOpened}/>)
            }
          </Scroll>
        </Suspense>

        <Scroll html>
          {
            started && (<Interface setSection={setSection}/>)
          }
        </Scroll>
        
        {/* <Scroll>
          <Experience2 section = {section} menuOpened = {menuOpened} />
        </Scroll> */}
      </ScrollControls>
          
    </Canvas>

    <Menu 
      onSectionChange = {setSection} 
      menuOpened = {menuOpened} 
      setMenuOpened = {setMenuOpened} 
      section = {section}
    />

    {/* <Cursor/>   */}
    {/* <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
      <Experience2 />
    </Canvas> */}

    </MotionConfig>
    {/* <Suspense>
            {
              started && (section === 5 && <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
                <Experience2 />
              </Canvas>)
            }
        </Suspense> */}
        
    {section === 5 &&<> <ScrollToEnd/>  <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
    {/* <color attach="background" args={["#dcffff"]} /> */}
    <Suspense fallback ={<CanvasLoader/>} > 
      <Experience2 />
      </Suspense>
      
    </Canvas>   </>}
    {/* <Cursor/> */}
    <Leva hidden/>
    </>
  );
}

export default App;
