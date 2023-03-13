import React, { useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { BsPhone, BsWhatsapp, BsGithub, BsLinkedin } from "react-icons/bs";

import Navbar from "../../components/Navbar";

function Contact() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  });

  return (
    <div className="w-full h-screen flex flex-col justify-start bg-black">
      <Navbar />
      <div className="Roboto flex flex-col justify-center items-center h-full">
        {show && (
          <>
            <div className=" text-3xl text-white py-8 w3-container w3-center w3-animate-bottom">
              Contact Me
            </div>
            <div className="py-4 w3-container w3-center w3-animate-left">
              <div className="flex flex-row gap-3 justify-center items-center text-primary">
                <HiOutlineMail />
                <div>EMAIL:</div>
              </div>
              <div className="text-white">shahrulayol31@gmail.com</div>
            </div>
            <div className="py-4 w3-container w3-center w3-animate-right">
              <div className="flex flex-row gap-3 justify-center items-center text-primary">
                <BsPhone />
                <div>PHONE:</div>
              </div>
              <div className="text-white">+6011-33314120</div>
            </div>
            <div className="py-4 w3-container w3-center w3-animate-left">
              <div className="flex flex-row gap-3 justify-center items-center text-primary">
                <BsWhatsapp />
                <div>WHATSAPP:</div>
              </div>
              <div className="text-white">+6011-33314120</div>
            </div>
            <div className="flex flex-row gap-6 justify-center items-center py-14">
              <a
                href="https://github.com/Arexxa"
                target="_blank"
                rel="noreferrer"
              >
                <div className="child bounce text-white">
                  <BsGithub className="w-8 h-8" />
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/shahrulnizam-ibrahim/"
                target="_blank"
                rel="noreferrer"
              >
                <div className="child bounce text-white">
                  <BsLinkedin className="w-8 h-8" />
                </div>
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Contact;
