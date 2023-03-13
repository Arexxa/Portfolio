import React, { useEffect, useState } from "react";
import { BsPhone } from "react-icons/bs";
import { RiAccountPinBoxLine } from "react-icons/ri";
import Navbar from "../../components/Navbar";
import ClickMe from "../../assets/click-me.gif";

function Home() {
  const [clicked, setClicked] = useState(false);
  const [showTag, setShowTag] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowTag(true);
    }, 15000);
  });

  return (
    <div className="w-full h-screen flex flex-col justify-start bg-black overflow-hidden">
      <Navbar />
      <div className="flex flex-col justify-center items-center h-full">
        {clicked ? (
          <div className="Roboto">
            <div className="text-white md:text-3xl lg:text-3xl font-bold">
              <p className="line__1">
                Hello! I'm
                <span className="text-primary text-xl md:text-4xl lg:text-4xl">
                  &nbsp;Shahrulnizam
                </span>
                .
              </p>
              <p className="line__2">
                A{" "}
                <span className="text-primary text-xl md:text-4xl lg:text-4xl">
                  Frontend Developer
                </span>
              </p>
              <p className="line__3 md:text-xl lg:text-xl">
                with solid hands-on experiences.
              </p>
            </div>
            {showTag && (
              <>
                <div className="grid grid-cols-3 px-20 md:grid-rows-3 md:grid-flow-col lg:grid-rows-3 lg:grid-flow-col gap-4 text-white">
                  <p className="tag border-0 rounded-md bg-primary">HTML</p>
                  <p className="tag border-0 rounded-md bg-primary">CSS</p>
                  <p className="tag border-0 rounded-md bg-primary">
                    JavaScript
                  </p>
                  <p className="tag border-0 rounded-md bg-primary">
                    TypeScript
                  </p>
                  <p className="tag border-0 rounded-md bg-primary">ReactJS</p>
                  <p className="tag border-0 rounded-md bg-primary">Tailwind</p>
                  <p className="tag border-0 rounded-md bg-primary">Phaser3</p>
                  <p className="tag border-0 rounded-md bg-primary">Web3</p>
                  <p className="tag border-0 rounded-md bg-primary">Python</p>
                </div>
                <div className="flex flex-row gap-10 items-center justify-center text-primary py-6">
                  <a href="/contact">
                    <div className="flex flex-row gap-2 items-center border-2 rounded-md border-primary p-2 hover:border-dashed">
                      <BsPhone className="w-5 h-5" />
                      <div>Contact</div>
                    </div>
                  </a>
                  <a href="/portfolio">
                    <div className="flex flex-row gap-2 items-center border-2 rounded-md border-primary p-2 hover:border-dashed">
                      <RiAccountPinBoxLine className="w-6 h-6" />
                      <div>Portfolio</div>
                    </div>
                  </a>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center cursor-pointer w3-container w3-center w3-animate-zoom">
            <div className="glowing text-3xl md:text-6xl lg:text-6xl">
              SHAHRULNIZAM BIN IBRAHIM
            </div>
            <img src={ClickMe} alt="" className="h-28" onClick={handleClick} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
