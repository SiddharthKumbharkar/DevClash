// import { apple, bill, google } from "../assets";
// import styles, { layout } from "../style";

// const Billing = () => (
//   <section id="product" className={layout.sectionReverse}>
//     <div className={layout.sectionImgReverse}>
//       <img src={bill} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />

//       {/* gradient start */}
//       <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
//       <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
//       {/* gradient end */}
//     </div>

//     <div className={layout.sectionInfo}>
//       <h2 className={styles.heading2}>
//         Easily control your <br className="sm:block hidden" /> billing &
//         invoicing
//       </h2>
//       <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
//         Elit enim sed massa etiam. Mauris eu adipiscing ultrices ametodio
//         aenean neque. Fusce ipsum orci rhoncus aliporttitor integer platea
//         placerat.
//       </p>

//       <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
//         <img src={apple} alt="google_play" className="w-[128.86px] h-[42.05px] object-contain mr-5 cursor-pointer" />
//         <img src={google} alt="google_play" className="w-[144.17px] h-[43.08px] object-contain cursor-pointer" />
//       </div>
//     </div>
//   </section>
// );

// export default Billing;

import { fastProcessing } from "../assets";
import styles, { layout } from "../style";

const DocumentProcessing = () => (
  <section id="how-it-works" className={`${layout.sectionReverse} relative overflow-hidden`}>
    {/* Enhanced background elements */}
    <div className="absolute -left-1/4 top-1/4 w-[60%] h-[60%] rounded-full blue__gradient opacity-20 blur-[100px]" />
    <div className="absolute -right-1/4 bottom-1/4 w-[60%] h-[60%] rounded-full pink__gradient opacity-20 blur-[100px]" />
    <div className="absolute left-1/2 top-1/2 w-[40%] h-[40%] rounded-full green__gradient opacity-15 blur-[80px] transform -translate-x-1/2 -translate-y-1/2" />

    <div className={`${layout.sectionImgReverse} relative z-10`}>
      {/* Main document preview with enhanced floating annotations */}
      <div className="relative z-[5] group perspective-1000">
        <img 
          src={fastProcessing} 
          alt="Document analysis interface" 
          className="w-full h-auto rounded-3xl shadow-2xl transform group-hover:scale-[1.02] group-hover:rotate-y-2 transition-all duration-500 ease-out" 
        />
        
        {/* AI Processing Badge */}
        <div className="absolute -top-6 -right-0 bg-accent/90 text-white px-5 py-2.5 rounded-full flex items-center shadow-xl animate-float border-2 border-white/20">
          <div className="w-3.5 h-3.5 bg-white rounded-full mr-3 animate-pulse-fast"></div>
          <span className="text-sm font-medium tracking-wide">AI Analyzing Content</span>
        </div>
        
        {/* Sources Badge */}
        <div className="absolute bottom-4 -left-0 bg-white/10 backdrop-blur-lg text-white px-5 py-2.5 rounded-xl flex items-center shadow-xl border-2 border-white/20 transform group-hover:translate-y-1.5 transition-all duration-300">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className="text-sm font-medium">3 Sources Integrated</span>
        </div>
      </div>
    </div>

    <div className={`${layout.sectionInfo} relative z-10`}>
      <h2 className={`${styles.heading2} mb-6`}>
        Intelligent Document <br className="sm:block hidden" /> 
        <span className="text-gradient">Analysis Engine</span>
      </h2>
      <p className={`${styles.paragraph} max-w-[500px] mt-5 text-lg leading-relaxed`}>
        Our advanced AI processes and connects concepts across multiple documents simultaneously,
        delivering comprehensive insights with academic-grade citations in real-time.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
        <div className="feature-card-hover bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm p-5 rounded-xl border border-white/10 hover:border-accent/50 transition-all duration-300">
          <div className="icon-container bg-accent/20 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent">
              <path d="M12 15L8 11H16L12 15Z" fill="currentColor"/>
              <path d="M12 8L16 12H8L12 8Z" fill="currentColor"/>
              <path d="M18 6H6V18H18V6Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <h4 className="font-semibold text-white text-lg mb-2">Cross-Document Analysis</h4>
          <p className="text-dimWhite text-sm leading-relaxed">Discover hidden connections between concepts across all your materials</p>
        </div>

        <div className="feature-card-hover bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm p-5 rounded-xl border border-white/10 hover:border-accent/50 transition-all duration-300">
          <div className="icon-container bg-accent/20 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent">
              <path d="M12 3V21M8 8L12 4L16 8M8 16L12 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M17 13V19H7V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h4 className="font-semibold text-white text-lg mb-2">Export with Citations</h4>
          <p className="text-dimWhite text-sm leading-relaxed">Save fully referenced results in multiple academic formats</p>
        </div>
      </div>

      {/* Platform status with animated dots */}
      <div className="mt-12 flex flex-wrap items-center gap-5">
        <div className="flex items-center">
          <div className="relative mr-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-fast"></div>
            <div className="absolute inset-0 rounded-full bg-green-400 opacity-0 animate-ping-slow"></div>
          </div>
          <span className="text-sm text-dimWhite font-medium">Processing 1,500+ documents daily</span>
        </div>
        <div className="flex items-center">
          <div className="relative mr-3">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse-fast delay-100"></div>
            <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 animate-ping-slow delay-100"></div>
          </div>
          <span className="text-sm text-dimWhite font-medium">99.8% analysis accuracy</span>
        </div>
      </div>
    </div>
  </section>
);

export default DocumentProcessing;