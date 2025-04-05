// import { card } from "../assets";
// import styles, { layout } from "../style";
// import Button from "./Button";

// const CardDeal = () => (
//   <section className={layout.section}>
//     <div className={layout.sectionInfo}>
//       <h2 className={styles.heading2}>
//         Find a better card deal <br className="sm:block hidden" /> in few easy
//         steps.
//       </h2>
//       <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
//         Arcu tortor, purus in mattis at sed integer faucibus. Aliquet quis
//         aliquet eget mauris tortor.ç Aliquet ultrices ac, ametau.
//       </p>

//       <Button styles={`mt-10`} />
//     </div>

//     <div className={layout.sectionImg}>
//       <img src={card} alt="billing" className="w-[100%] h-[100%]" />
//     </div>
//   </section>
// );

// export default CardDeal;
import { motion } from 'framer-motion';
import { QuoteIcon } from "lucide-react";
import styles, { layout } from "../style";
import Button from "./Button";

// Quote block component
const BlockQuote = ({ quote, author }) => (
  <motion.blockquote 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="rounded-xl border-l-4 border-amber-500/70 bg-amber-500/15 px-6 py-4 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 mt-10 max-w-[500px]"
  >
    <p className="italic text-lg leading-relaxed">
      <QuoteIcon
        aria-hidden="true"
        className="-translate-y-1 mr-2 inline size-4 fill-amber-700 stroke-none dark:fill-amber-400"
      />
      {quote}
      <QuoteIcon
        aria-hidden="true"
        className="ml-2 inline size-4 translate-y-1 fill-amber-700 stroke-none dark:fill-amber-400"
      />
    </p>
    <p className="mt-3 text-end font-medium text-sm italic tracking-tighter">
      — {author}
    </p>
  </motion.blockquote>
);

const DocumentInsights = () => (
  <section className={`${layout.section} relative overflow-hidden py-20`}>
    <div className="flex flex-col lg:flex-row gap-12 items-center z-10 relative">
      {/* Left: Content */}
      <div className={`${layout.sectionInfo} max-w-2xl`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`${styles.heading2} mb-6 leading-tight`}>
            Unlock <span className="text-gradient">deeper understanding</span> <br className="sm:block hidden" /> 
            from your documents
          </h2>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className={`${styles.paragraph} max-w-[500px] mt-5 text-lg leading-relaxed`}
        >
          Our AI-powered platform transforms static documents into dynamic knowledge networks, revealing connections and insights you never knew existed.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Button 
            styles="group relative overflow-hidden"
            text={
              <>
                <span className="relative z-10 flex items-center">
                  Discover Insights
                  <span className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                    →
                  </span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></span>
              </>
            } 
          />
        </motion.div>
      </div>

      {/* Right: Visualization + Quote */}
      <div className={`${layout.sectionImg} relative min-h-[400px] w-full lg:w-[50%] flex flex-col items-center gap-6`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full max-w-[500px]"
        >
          <BlockQuote
            quote="This AI document analysis transformed how our team researches. We discovered connections between papers that would have taken months to find manually."
            author="Dr. Sarah Chen, Research Director"
          />
        </motion.div>

        {/* Floating elements */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-10 -right-10 w-28 h-28 rounded-full border-2 border-accent/20 z-[1]"
        ></motion.div>
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full border-2 border-secondary/20 z-[1]"
        ></motion.div>
      </div>
    </div>
  </section>
);

export default DocumentInsights;

