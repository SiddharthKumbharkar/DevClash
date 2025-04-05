// import { useState } from "react";
// import { Link } from "react-router-dom";

// import { close, logo, menu } from "../assets";

// const Navbar = () => {
//   const [active, setActive] = useState("Home");
//   const [toggle, setToggle] = useState(false);

//   const navLinks = [
//     { id: "home", title: "Home", path: "/" },
//     { id: "search", title: "Search", path: "/search" },
//     { id: "about", title: "About", path: "/about" },
//   ];

//   return (
//     <nav className="w-full flex py-6 justify-between items-center navbar">
//       <Link to="/" onClick={() => setActive("Home")}>
//         <img src={logo} alt="Notewise" className="w-auto h-[50px]" />
//       </Link>

//       <ul className="list-none sm:flex hidden justify-end items-center flex-1">
//         {navLinks.map((nav, index) => (
//           <li
//             key={nav.id}
//             className={`font-poppins font-normal cursor-pointer text-[16px] ${
//               active === nav.title ? "text-white" : "text-dimWhite"
//             } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
//             onClick={() => setActive(nav.title)}
//           >
//             <Link to={nav.path}>{nav.title}</Link>
//           </li>
//         ))}
//       </ul>

//       <div className="sm:hidden flex flex-1 justify-end items-center">
//         <img
//           src={toggle ? close : menu}
//           alt="menu"
//           className="w-[28px] h-[28px] object-contain"
//           onClick={() => setToggle(!toggle)}
//         />

//         <div
//           className={`${
//             !toggle ? "hidden" : "flex"
//           } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
//         >
//           <ul className="list-none flex justify-end items-start flex-1 flex-col">
//             {navLinks.map((nav, index) => (
//               <li
//                 key={nav.id}
//                 className={`font-poppins font-medium cursor-pointer text-[16px] ${
//                   active === nav.title ? "text-white" : "text-dimWhite"
//                 } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
//                 onClick={() => {
//                   setActive(nav.title);
//                   setToggle(false); // close menu on mobile after navigation
//                 }}
//               >
//                 <Link to={nav.path}>{nav.title}</Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { useState } from "react";
import { Link } from "react-router-dom";

import { close, logo, menu } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  const navLinks = [
    { id: "home", title: "Home", path: "/" },
    { id: "search", title: "Search", path: "/search" },
    { id: "about", title: "About", path: "/about" },
  ];

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar relative z-50 bg-primary px-4">
      <Link to="/" onClick={() => setActive("Home")}>
        <img src={logo} alt="Notewise" className="w-auto h-[50px]" />
      </Link>

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <Link to={nav.path}>{nav.title}</Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu */}
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain cursor-pointer"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            toggle ? "flex" : "hidden"
          } p-6 bg-black-gradient absolute top-20 right-4 min-w-[140px] rounded-xl sidebar z-50`}
        >
          <ul className="list-none flex flex-col justify-start items-start">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index !== navLinks.length - 1 ? "mb-4" : ""}`}
                onClick={() => {
                  setActive(nav.title);
                  setToggle(false); // close after click
                }}
              >
                <Link to={nav.path}>{nav.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
