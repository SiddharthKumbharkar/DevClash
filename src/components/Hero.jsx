// import styles from "../style";
// import { discount, robot } from "../assets";
// import GetStarted from "./GetStarted";

// const Hero = () => {
//   return (
//     <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
//       <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
//         <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
//           {/* <img src={discount} alt="discount" className="w-[32px] h-[32px]" /> */}
//           <p className={`${styles.paragraph} ml-2`}>
//             <span className="text-white">20%</span> Discount For{" "}
//             <span className="text-white">1 Month</span> Account
//           </p>
//         </div>

//         <div className="flex flex-row justify-between items-center w-full">
//           <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
//             The Next <br className="sm:block hidden" />{" "}
//             <span className="text-gradient">Generation</span>{" "}
//           </h1>
//           <div className="ss:flex hidden md:mr-4 mr-0">
//             <GetStarted />
//           </div>
//         </div>

//         <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
//           Payment Method.
//         </h1>
//         <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
//           Our team of experts uses a methodology to identify the credit cards
//           most likely to fit your needs. We examine annual percentage rates,
//           annual fees.
//         </p>
//       </div>

//       <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
//         {/* <img src={robot} alt="billing" className="w-[100%] h-[100%] relative z-[5]" /> */}

//         {/* gradient start */}
//         <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
//         <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
//         <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
//         {/* gradient end */}
//       </div>

//       <div className={`ss:hidden ${styles.flexCenter}`}>
//         <GetStarted />
//       </div>
//     </section>
//   );
// };

// export default Hero;

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { Suspense } from 'react';
import styles from "../style";
import GetStarted from "./GetStarted";
import { Model as Book3D } from "../components/Book3D"; 

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY} min-h-screen`}>
      
      {/* Left Content */}
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row items-center py-3 px-4 bg-knowledge-gradient rounded-[16px] mb-4 shadow-lg">
          <div className="flex">{/* Icons */}</div>
          <p className={`${styles.paragraph} ml-3 font-medium`}>
            <span className="text-accent">AI-powered</span> study assistant for{" "}
            <span className="text-accent">smarter learning</span>
          </p>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]">
            Transform Your <br className="sm:block hidden" />
            <span className="text-gradient">Study Sessions</span>
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted />
          </div>
        </div>

        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[90px] leading-[75px] w-full">
          With AI-Powered Insights.
        </h1>

        <p className={`${styles.paragraph} max-w-[550px] mt-5 text-lg`}>
          Upload your course materials and get instant answers. Our AI analyzes all your 
          sources - textbooks, notes, slides - to deliver comprehensive explanations with 
          proper citations to original materials.
        </p>

        <div className="flex flex-wrap gap-4 mt-8">
          <button className="bg-accent hover:bg-accent-dark text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
            Try It Free
          </button>
          <button className="bg-transparent border-2 border-accent text-accent hover:bg-accent/10 font-medium py-3 px-6 rounded-xl transition-all duration-300">
            See How It Works
          </button>
        </div>
      </div>

      {/* Right 3D Model */}
      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
       <Canvas
  style={{
    width: '100%',
    height: '500px',
    position: 'relative',
    zIndex: 5
  }}
  camera ={{near: 0.1 , far: 1000}}
  gl={{ antialias: true }}
>
  <ambientLight intensity={0.8} />
  <spotLight
    position={[5, 5, 5]}
    angle={0.3}
    penumbra={1}
    intensity={1}
    castShadow
  />
  <Suspense fallback={null}>
    <Center>
      <Book3D/> {/* Slightly smaller */}
    </Center>
  </Suspense>
  <OrbitControls
    enableZoom={true}
    autoRotate
    autoRotateSpeed={1}
    minDistance={7} // prevent getting too close
    maxDistance={12}
    minPolarAngle={Math.PI / 4}
    maxPolarAngle={Math.PI / 1.8}
    enablePan={false}
  />
</Canvas>

        {/* Gradients */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient animate-pulse-slow" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40 opacity-70" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient animate-pulse-slow delay-1000" />
      </div>

      {/* Mobile GetStarted */}
      <div className={`ss:hidden ${styles.flexCenter} mt-8`}>
        <GetStarted />
      </div>
    </section>
  );
};

export default Hero;
