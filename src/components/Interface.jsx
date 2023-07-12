import {motion} from "framer-motion";
import {  useAtom } from "jotai";
import { currentProjectAtom } from "./Projects";
import { projects } from "./Projects";
import { useForm, ValidationError } from '@formspree/react';

// use {``} to add multi line css in classname
// children are reserved props used to identify what is inside opening and closing bracket of who is calling it
// Just add motion.dev to use framer
// Initial represents before state, opacitiy:0 means not visible, y means animation is positioned 50 pixel down
// While in view it should be fully visible, and animation with certain delay and duration
// scaleX property is set to 0, indicating that the element is initially scaled down horizontally to have no width.
// The originX property is set to 0, indicating that the transformation origin is at the left side of the element.
// we can add cursor none property here
// we use k for global and md:k for tailwind css
const Section = (props) => {
    const {children, mobileTop} = props;
    return (
        // Content is justified center when bigger device is used
        <motion.section className={`
            h-screen w-screen p-8 max-w-screen-2xl mx-auto
            flex flex-col items-start 
            ${mobileTop? "justify-start md:justify-center" : "justify-center"}
        `}
           initial = {{
            opacity: 0.02,
            y: 50,
           }}     
           whileInView={{
            opacity: 1,
            y: 0,
            transition:{
                duration : 1.1,
                delay : 0.4,
            }
           }}
        >
            {children}
        </motion.section>
    )
}
// Create 4 section here
export const Interface = (props) => {
    const {setSection} = props;
    return (
        <div className="flex flex-col items-center w-screen">
            <AboutSection setSection = {setSection}/>
            <SkillsSection/>
            <Section>
            <ProjectsSection/>
            </Section>
            <ContactSection/>
            
        </div>
    );
};

const AboutSection = (props) => {
    const {setSection} = props;

    return (
      // When we reach bigger screen md represents value then
      <Section mobileTop>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-snug mt-8 md:mt-0 ">
            Hi, I'm
        <br />
        <span className="bg-white px-1 italic text-teal-800">Piyush</span>
        </h1>
        <motion.p className="text-lg drop-shadow-2xl  text-black md:text-gray-700 mt-4"
            initial = {{
                opacity: 0,
                y: 25,
            }}
            whileInView={{
                opacity:1,
                y:0,
            }}
            transition={{
                duration : 1,
                delay: 1.5,
            }}
        >
            Debugging Bugs, Sipping Mugs:
        <br />
            My Superpowers Include ML, Web Dev, 
        <br/>
            and Competitive Programming.
        <br/>
        <button onClick={() => setSection(5)} className="text-teal-800 italic font-semibold mt-1"> Start</button> <span className="text-gray-500 italic" > the portal game and <br/> discover more about me. </span>
        </motion.p>
        <motion.button
          onClick={() => setSection(3)}
        className="bg-indigo-700 text-white py-4 px-8 
        rounded-lg font-bold text-lg mt-4 md:mt-12"
            initial = {{
                opacity: 0,
                y: 25,
            }}
            whileInView={{
                opacity:1,
                y:0,
            }}
            transition={{
                duration : 1,
                delay: 2.5,
            }}
        >
        Contact me
        </motion.button>

      </Section>
    );
  };

const skills = [
{
    title: "Data Structures and Algorithms",
    level: 90,
},
{
    title: "Web Development",
    level: 70,
},
{
    title: "Machine Learning",
    level: 55,
},
// {
//     title: "Competitive Programming",
//     level: 76,
// },
{
    title: "OOPs",
    level: 94-10,
},
{
    title: "DBMS",
    level: 89-10,
},
{
    title: "Operating Systems",
    level: 86-10,
},
{
    title: "Robotic Additive Manufacturing",
    level: 45,
},
{
    title: "3D Modeling",
    level: 30,
},
];
// const languages = [
// {
//     title: "🇫🇷 French",
//     level: 100,
// },
// {
//     title: "🇺🇸 English",
//     level: 80,
// },
// {
//     title: "🇯🇵 Japanese",
//     level: 20,
// },
// ];
  
// Use javaScript in CSS to change different level of skills
const SkillsSection = () => {
    return (
      <Section>
        <motion.div className="w-full" whileInView={"visible"}>
          <h2 className="text-3xl md:text-5xl font-bold text-white">Skills</h2>
          <div className=" mt-8 space-y-4">
            {skills.map((skill, index) => (
              <div className="w-full md:w-64" key={index}>
                <motion.h3
                  className="text-lg md:text-xl font-bold text-gray-200"
                  initial={{
                    opacity: 0,
                  }}
                  // animation will be triggerd only when it is visible
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                >
                  {skill.title}
                </motion.h3>
                <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                  <motion.div
                    className="h-full bg-indigo-500 rounded-full "
                    style={{ width: `${skill.level}%` }}
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: {
                          duration: 1,
                          delay: 1 + index * 0.2,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>
    );
  };
  

  const ContactSection = () => {
    const [state, handleSubmit] = useForm("mnqkakqy");
    return (
      <Section>
        <h2 className="text-3xl md:text-5xl font-bold">Contact me</h2>
        <div className="mt-8 p-8 rounded-md bg-white bg-opacity-50 w-96 max-w-full">
          {state.succeeded ? (
            <p className="text-gray-900 text-center">Thanks for your message !</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <label for="name" className="font-medium text-gray-900 block mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
              />
              <label
                for="email"
                className="font-medium text-gray-900 block mb-1 mt-8"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
              />
              <ValidationError
                className="mt-1 text-red-500"
                prefix="Email"
                field="email"
                errors={state.errors}
              />
              <label
                for="email"
                className="font-medium text-gray-900 block mb-1 mt-8"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="h-32 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
              />
              <ValidationError
                className="mt-1 text-red-500"
                errors={state.errors}
              />
              <button
                disabled={state.submitting}
                className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16 "
              >
                Submit
              </button>
            </form>
          )}
        </div>
        {/* <h2 className="text-3xl md:text-5xl font-bold text-white ">Skills</h2> */}
      </Section>
    );
  };

  const ProjectsSection = () => {
    // Use atom to set a global state
    const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);
  
    // To wrap around when reached end
    const nextProject = () => {
      setCurrentProject((currentProject + 1) % projects.length);
    };
  
    const previousProject = () => {
      setCurrentProject((currentProject - 1 + projects.length) % projects.length);
    };
  
    return (
      <Section>
        <div className="flex w-full h-full gap-8 items-center justify-center translate-y-[120px] translate-x-[-49px]">
          <button
            className="text-indigo-100 hover:text-indigo-700 transition-colors text-lg md:text-xl font-medium focus:outline-none"
            onClick={previousProject}
          >
            ← Previous
          </button>
          <h2 className="text-3xl md:text-5xl font-bold">Projects</h2>
          <button
            className="text-indigo-100 hover:text-indigo-700 transition-colors text-lg md:text-xl font-medium focus:outline-none"
            onClick={nextProject}
          >
            Next →
          </button>
        </div>
      </Section>
    );
  };
  