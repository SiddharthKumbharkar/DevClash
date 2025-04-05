import { testimonials } from "../constants";
import styles from "../style";
import FeedbackCard from "./FeedbackCard";

const UserStories = () => (
  <section id="testimonials" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative overflow-hidden`}>
    {/* Enhanced background elements */}
    <div className="absolute z-[0] w-[70%] h-[70%] -right-[40%] rounded-full blue__gradient opacity-30 blur-[100px] bottom-40" />
    <div className="absolute z-[0] w-[50%] h-[50%] -left-[30%] rounded-full pink__gradient opacity-20 blur-[80px] top-20" />
    
    {/* Floating document elements */}
    <div className="absolute top-20 left-10 w-24 h-32 bg-white/5 backdrop-blur-sm rounded-lg shadow-xl border border-white/10 rotate-12 animate-float-slow z-[0]" />
    <div className="absolute bottom-40 right-10 w-20 h-28 bg-white/5 backdrop-blur-sm rounded-lg shadow-xl border border-white/10 -rotate-6 animate-float-delay z-[0]" />

    <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
      <div>
        <h2 className={`${styles.heading2} mb-4`}>
          Trusted by <span className="text-gradient">Researchers</span> <br className="sm:block hidden" /> 
          and <span className="text-gradient">Students</span> Worldwide
        </h2>
        <div className="flex items-center mt-2">
          <div className="flex mr-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-dimWhite text-sm">4.9/5 from 500+ reviews</span>
        </div>
      </div>
      <div className="w-full md:mt-0 mt-6 md:max-w-[450px]">
        <p className={`${styles.paragraph} text-left text-lg`}>
          Join thousands of academics and students who have transformed their research workflow with our AI-powered document analysis platform.
        </p>
      </div>
    </div>

    <div className="flex flex-wrap justify-center w-full relative z-[1] gap-6">
      {testimonials.map((card) => (
        <FeedbackCard 
          key={card.id} 
          {...card} 
          className="hover:transform hover:scale-[1.02] transition-all duration-300"
        />
      ))}
      
      {/* Stats card */}
      <div className="flex flex-col p-8 rounded-2xl bg-glass-gradient backdrop-blur-sm border border-white/10 hover:border-accent/30 transition-all w-full max-w-[400px]">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>
          <h3 className="font-semibold text-white text-xl">User Growth</h3>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-dimWhite text-sm">Monthly Active Users</p>
            <p className="text-white text-2xl font-medium">25,000+</p>
          </div>
          <div>
            <p className="text-dimWhite text-sm">Documents Processed Daily</p>
            <p className="text-white text-2xl font-medium">150,000+</p>
          </div>
          <div>
            <p className="text-dimWhite text-sm">Average Time Saved</p>
            <p className="text-white text-2xl font-medium">12 hours/week</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default UserStories;