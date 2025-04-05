import styles from "../style";
import Button from "./Button";

const CTA = () => (
  <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-document-gradient rounded-[20px] box-shadow relative overflow-hidden`}>
    {/* Background elements */}
    <div className="absolute -top-1/2 -left-1/2 w-[60%] h-[60%] rounded-full blue__gradient opacity-20 blur-[100px] z-[0]" />
    <div className="absolute -bottom-1/2 -right-1/2 w-[60%] h-[60%] rounded-full pink__gradient opacity-20 blur-[100px] z-[0]" />
    
    {/* Floating document elements */}
    <div className="absolute top-5 left-10 w-16 h-20 bg-white/5 backdrop-blur-sm rounded-lg shadow-xl border border-white/10 rotate-12 animate-float-slow z-[1]" />
    <div className="absolute bottom-5 right-10 w-14 h-18 bg-white/5 backdrop-blur-sm rounded-lg shadow-xl border border-white/10 -rotate-6 animate-float-delay z-[1]" />

    <div className="flex-1 flex flex-col relative z-[2]">
      <h2 className={`${styles.heading2} mb-4`}>
        Transform Your Research <br className="sm:block hidden" /> 
        <span className="text-gradient">Today</span>
      </h2>
      <p className={`${styles.paragraph} max-w-[500px] mt-2 text-lg leading-relaxed`}>
        Join thousands of researchers and students who save hours every week with our AI-powered document analysis platform. Get started in seconds.
      </p>
      
      <div className="flex items-center mt-8 space-x-4">
        <div className="flex -space-x-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-accent/50 bg-white/5 backdrop-blur-sm"></div>
          ))}
        </div>
        <p className="text-dimWhite text-sm">
          <span className="text-white font-medium">500+</span> new users this week
        </p>
      </div>
    </div>

    <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10 relative z-[2]`}>
      <Button 
        styles="group relative overflow-hidden"
        text={
          <>
            <span className="relative z-10">Start Analyzing Now</span>
            <span className="absolute inset-0 bg-accent-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </>
        }
      />
    </div>
  </section>
);

export default CTA;