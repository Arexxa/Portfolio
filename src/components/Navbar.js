import React from "react";
import { BsPhone } from "react-icons/bs";
import { RiAccountPinBoxLine } from "react-icons/ri";

function Navbar() {
  return (
    <div className="bg-black sticky top-0 z-20">
      <div className="flex justify-between max-w-7xl mx-auto px-4 lg:px-8 py-4 lg:py-5">
        <div className="Rubik flex justify-start items-center font-bold text-white hover:text-primary lg:text-2xl">
          <a href="/">AYOL</a>
        </div>
        <div className="Roboto flex flex-row gap-6">
          <a href="/contact">
            <div className="flex flex-row gap-2 items-center text-white hover:text-primary">
              <BsPhone className="w-5 h-5" />
              <div>Contact</div>
            </div>
          </a>
          <a href="/portfolio">
            <div className="flex flex-row gap-2 items-center text-white hover:text-primary">
              <RiAccountPinBoxLine className="w-6 h-6" />
              <div>Portfolio</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
