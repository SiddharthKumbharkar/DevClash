import styles from "../style";
import { logo } from "../assets";
import { footerLinks, socialMedia } from "../constants";

const Footer = () => (
  <section className={`${styles.flexCenter} ${styles.paddingY} flex-col bg-footer-gradient`}>
    <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
      
      {/* Logo + Description */}
      <div className="flex-[1] flex flex-col justify-start mr-10">
        <img
          src={logo}
          alt="Sarthi"
          className="w-[220px] h-auto object-contain mb-3"
        />
        <p className={`${styles.paragraph} mt-2 max-w-[320px] text-dimWhite`}>
          Your smart AI companion for mastering any subject. Upload notes, ask questions, and get instant, personalized insights — all in one place.
        </p>
      </div>

      {/* Footer Links */}
      <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
        {footerLinks.map((footerlink) => (
          <div
            key={footerlink.title}
            className="flex flex-col ss:my-0 my-4 min-w-[150px]"
          >
            <h4 className="font-poppins font-semibold text-[18px] leading-[27px] text-white">
              {footerlink.title}
            </h4>
            <ul className="list-none mt-4">
              {footerlink.links.map((link, index) => (
                <li
                  key={link.name}
                  className={`font-poppins text-[16px] leading-[24px] text-dimWhite hover:text-accent cursor-pointer transition-colors ${
                    index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                  }`}
                >
                  {link.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom Row */}
    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t border-t-[#3F3E45]">
      <p className="font-poppins font-normal text-[16px] text-center text-dimWhite">
        © {new Date().getFullYear()} Sarthi AI. All rights reserved.
      </p>

      <div className="flex flex-row md:mt-0 mt-4">
        {socialMedia.map((social, index) => (
          <img
            key={social.id}
            src={social.icon}
            alt={social.id}
            className={`w-[21px] h-[21px] object-contain cursor-pointer hover:scale-110 transition-transform ${
              index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
            }`}
            onClick={() => window.open(social.link)}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Footer;
