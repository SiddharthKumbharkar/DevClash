import { features } from "../constants";
import styles, { layout } from "../style";
import Button from "./Button";

const FeatureCard = ({ icon, title, content, index }) => (
  <div className={`flex flex-row p-6 rounded-[20px] feature-card hover:bg-primary/10 transition-all duration-300 ${index !== features.length - 1 ? "mb-6" : "mb-0"}`}>
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-accent/20 backdrop-blur-sm`}>
      <img src={icon} alt={title} className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-5">
      <h4 className="font-poppins font-semibold text-white text-[20px] leading-[26px] mb-2">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
    <div className="w-8 h-8 rounded-full border border-accent flex items-center justify-center ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 11L11 1M11 1H3M11 1V9" stroke="#4DCCA7" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  </div>
);

const Features = () =>  (
  <section id="features" className={`${layout.section} relative`}>
    {/* Gradient background */}
    <div className="absolute z-[0] w-[40%] h-[35%] -left-1/2 top-0 pink__gradient" />
    
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Focus on learning, <br className="sm:block hidden" /> 
        we'll handle the research.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5 text-lg`}>
        Our AI analyzes all your course materials - textbooks, notes, and slides - 
        to deliver comprehensive answers with proper citations in seconds, 
        saving you hours of manual searching.
      </p>

      <Button 
        styles="mt-10 group"
        text={
          <>
            Get Started 
            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </span>
          </>
        } 
      />
    </div>

    <div className={`${layout.sectionImg} flex-col relative z-[1]`}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
      
      {/* Decorative element */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-accent/10 blur-xl z-[-1]" />
    </div>
  </section>
);

export default Features;