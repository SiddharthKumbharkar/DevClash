import styles from "../style";
import { BookIcon } from "lucide-react";

// Book Cover Subcomponents
export const BookHeader = ({ children }) => (
  <div className="flex gap-2">{children}</div>
);

export const BookTitle = ({ children }) => (
  <h2 className="font-bold mt-3 mb-1 text-white text-xl">{children}</h2>
);

export const BookDescription = ({ children }) => (
  <p className="text-sm text-white/80">{children}</p>
);

// ModernBookCover Component
export const ModernBookCover = ({
  size = "md",
  color = "neutral",
  className = "",
  children,
}) => {
  const sizeMap = {
    sm: { width: "200px", height: "300px", spine: "170px" },
    md: { width: "240px", height: "360px", spine: "210px" },
    lg: { width: "280px", height: "420px", spine: "250px" },
  };

  const gradient = {
    neutral: { from: "from-neutral-900", to: "to-neutral-700" },
    amber: { from: "from-amber-900", to: "to-amber-700" },
    blue: { from: "from-blue-900", to: "to-blue-700" },
  }[color];

  return (
    <div className={`group [perspective:1000px] ${className}`}>
      <div
        className="relative h-full [transform-style:preserve-3d] transition-transform duration-700 ease-out group-hover:[transform:rotateY(-25deg)]"
        style={{ width: sizeMap[size].width }}
      >
        {/* Front Cover */}
        <div
          className={`absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-tr ${gradient.from} ${gradient.to} rounded-lg shadow-xl`}
          style={{
            transform: "translateZ(30px)",
            height: sizeMap[size].height,
          }}
        >
          {children}
        </div>

        {/* Spine */}
        <div
          className="absolute left-full top-2 bottom-2 w-8 bg-gradient-to-r from-neutral-800 to-neutral-700"
          style={{
            transform: "rotateY(90deg) translateX(10px)",
            transformOrigin: "left center",
          }}
        />

        {/* Back Cover */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr ${gradient.from} ${gradient.to} rounded-lg`}
          style={{
            transform: "translateZ(-30px) scale(0.95)",
            height: sizeMap[size].height,
            filter: "brightness(0.8)",
          }}
        />
      </div>
    </div>
  );
};

// Hero Component
const Hero = () => {
  return (
    <section
      id="home"
      className={`relative overflow-visible flex md:flex-row flex-col ${styles.paddingY} min-h-[90vh]`}
    >
      {/* Left Content */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-16 xl:px-0">
        <div className="flex items-center py-3 px-4 bg-knowledge-gradient rounded-[16px] mb-4 shadow-lg">
          <p className={`${styles.paragraph} ml-3 font-medium`}>
            <span className="text-accent">AI-powered</span> study assistant for{" "}
            <span className="text-accent">smarter learning</span>
          </p>
        </div>

        <h1 className="font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]">
          Transform Your <br className="sm:block hidden" />
          <span className="text-gradient">Study Sessions</span>
        </h1>

        <h2 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[90px] leading-[75px] w-full">
          With AI-Powered Insights.
        </h2>

        <p className={`${styles.paragraph} max-w-[550px] mt-5 text-lg`}>
          Upload your course materials and get instant answers. Our AI analyzes your
          textbooks, notes, and slides to give comprehensive explanations with proper
          citations.
        </p>

        <div className="flex flex-wrap gap-4 mt-8">
          <button className="bg-accent hover:bg-accent-dark border-white border-2 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
            Try It Free
          </button>
        </div>
      </div>

      {/* Right Content - Books */}
      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative min-h-[600px]`}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Left Book */}
          <div className="absolute left-0 md:left-10 bottom-1/4 z-10 h-[300px]">
            <ModernBookCover
              size="sm"
              color="neutral"
              className="transform -rotate-6 hover:-rotate-12 h-full"
            >
              <BookHeader>
                <BookIcon size={24} />
              </BookHeader>
              <BookTitle>TextBooks</BookTitle>
              <BookDescription>
                Key concepts, formulas, and solved problems
              </BookDescription>
            </ModernBookCover>
          </div>

          {/* Center Book */}
          <div className="absolute z-20 transform -translate-y-10 h-[360px]">
            <ModernBookCover
              size="md"
              color="amber"
              className="hover:-rotate-12 h-full"
            >
              <BookHeader>
                <BookIcon size={20} />
              </BookHeader>
              <BookTitle>Handwritten Notes</BookTitle>
              <BookDescription>
                Search within Your handwritten Notes
              </BookDescription>
            </ModernBookCover>
          </div>

          {/* Right Book */}
          <div className="absolute right-0 md:right-10 bottom-1/4 z-10 h-[420px]">
            <ModernBookCover
              size="lg"
              color="blue"
              className="transform rotate-6 hover:rotate-12 h-full"
            >
              <BookHeader>
                <BookIcon size={20} />
              </BookHeader>
              <BookTitle>Interactive Q&A</BookTitle>
              <BookDescription>
                Ask questions directly from materials
              </BookDescription>
            </ModernBookCover>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
