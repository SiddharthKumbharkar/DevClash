// import { stats } from "../constants";
// import styles from "../style";

// const Stats = () => (
//   <section className={`${styles.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}>
//     {stats.map((stat) => (
//       <div key={stat.id} className={`flex-1 flex justify-start items-center flex-row m-3`} >
//         <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-white">
//           {stat.value}
//         </h4>
//         <p className="font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] text-gradient uppercase ml-3">
//           {stat.title}
//         </p>
//       </div>
//     ))}
//   </section>
// );

// export default Stats;

import { stats } from "../constants";
import styles from "../style";
import { motion } from "framer-motion";

const Stats = () => (
  <motion.section 
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.25 }}
    variants={{
      hidden: {},
      show: {
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0,
        },
      },
    }}
    className={`${styles.flexCenter} flex-row flex-wrap sm:mb-20 -mb-6`}
  >
    {stats.map((stat, index) => (
      <motion.div
        key={stat.id}
        variants={{
          hidden: {
            x: -100,
            opacity: 0,
          },
          show: {
            x: 0,
            opacity: 1,
            transition: {
              type: 'spring',
              delay: index * 0.2,
              duration: 0.75,
              ease: 'easeOut',
            },
          },
        }}
        whileHover={{ scale: 1.05 }}
        className={`flex-1 flex justify-start items-center flex-row m-3 bg-black-gradient-2 rounded-[20px] p-6 shadow-card hover:shadow-hover transition-all duration-300`}
      >
        <div className="relative">
          <h4 className="font-poppins font-bold xs:text-[48px] text-[36px] xs:leading-[60px] leading-[48px] text-white">
            {stat.value}
            {stat.id === 'stats-1' && <span className="text-secondary">+</span>}
            {stat.id === 'stats-2' && <span className="text-secondary">%</span>}
          </h4>
        </div>
        <p className="font-poppins font-normal xs:text-[21px] text-[16px] xs:leading-[27px] leading-[22px] text-gradient uppercase ml-4 tracking-wider">
          {stat.title}
        </p>
      </motion.div>
    ))}
  </motion.section>
);

export default Stats;