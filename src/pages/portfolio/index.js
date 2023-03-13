/* eslint-disable import/no-unresolved */
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { BsGlobe } from "react-icons/bs";
import Navbar from "../../components/Navbar";
import projectOasis1 from "../../assets/img/projectoasis/projectoasis1.png";
import projectOasis2 from "../../assets/img/projectoasis/projectoasis2.png";
import projectOasis3 from "../../assets/img/projectoasis/projectoasis3.png";
import nverse1 from "../../assets/img/nverse/nverse1.png";
import nverse2 from "../../assets/img/nverse/nverse2.png";
import king1 from "../../assets/img/12king/12king1.png";
import king2 from "../../assets/img/12king/12king2.png";
import oasis1 from "../../assets/img/oasislab/oasislab1.png";
import oasis2 from "../../assets/img/oasislab/oasislab2.png";
import skin1 from "../../assets/img/skinGenerator/skin1.png";
import skin2 from "../../assets/img/skinGenerator/skin2.png";

function Portfolio() {
  return (
    <div className="w-full h-full flex flex-col justify-start bg-black">
      <Navbar />
      <div className="px-8 py-10 flex flex-col justify-center items-center w3-container w3-center w3-animate-bottom overflow-x-hidden">
        <div>
          <div className="Roboto text-primary text-3xl py-10">Portfolio</div>
          {/* first project */}
          <div className="flex flex-col md:flex-row lg:flex-row gap-9 Roboto justify-center items-center md:justify-start lg:justify-start text-white">
            <div className="w-72 h-60 border-2 rounded-md border-primary">
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <img src={projectOasis1} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={projectOasis2} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={projectOasis3} alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="">
              <div className="text-primary font-medium text-2xl text-left py-2">
                ProjectOasis
              </div>
              <div className="flex flex-row gap-2">
                <p className="border-0 rounded-md bg-primary px-2 py-1">
                  Frontend
                </p>
                <p className="border-0 rounded-md bg-primary px-2 py-1">
                  2D game
                </p>
                <p className="border-0 rounded-md bg-primary px-2 py-1">
                  Web3js
                </p>
              </div>
              <div className="py-2 text-left">
                <p>
                  A Gamified Metaverse that integrated Web3 elements into a 2D
                  virtual ecosphere.
                </p>
              </div>
              <div className="text-left">
                <ul>
                  <li>
                    Transformed the design into interactable code using Phaser 3
                    and typescript.
                  </li>
                  <li>Involved in 2D game development.</li>
                  <li>Wallet Integration using web3js.</li>
                </ul>
              </div>
              <div className="flex flex-row gap-1 items-center hover:underline py-2">
                <BsGlobe />
                <a
                  href="https://game.projectoasis.io/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Website
                </a>
              </div>
            </div>
          </div>

          {/* second project */}
          <div className="flex flex-col md:flex-row lg:flex-row gap-9 Roboto justify-center items-center md:justify-start lg:justify-start text-white pt-10">
            <div className="w-72 h-60 border-2 rounded-md border-primary">
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <img src={nverse1} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={nverse2} alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="">
              <div className="text-primary font-medium text-2xl text-left py-2">
                Nverse
              </div>
              <div className="flex flex-row gap-2">
                <p className="border-0 rounded-md bg-primary px-2 py-1">
                  Frontend
                </p>
              </div>
              <div className="py-2 text-left">
                <p>
                  Nverse Labs is building the future of digital asset ownership.
                </p>
              </div>
              <div className="text-left">
                <ul>
                  <li>
                    Transformed the design into interactable code using ReactJs.
                  </li>
                  <li>Involved in team development.</li>
                  <li>Responsive website in dekstop and mobile view.</li>
                </ul>
              </div>
              <div className="flex flex-row gap-1 items-center hover:underline py-2">
                <BsGlobe />
                <a
                  href="https://www.nverselabs.io/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Website
                </a>
              </div>
            </div>
          </div>

          {/* third project */}
          <div className="flex flex-col md:flex-row lg:flex-row gap-9 Roboto justify-center items-center md:justify-start lg:justify-start text-white pt-10">
            <div className="w-72 h-60 border-2 rounded-md border-primary">
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <img src={king1} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={king2} alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="">
              <div className="text-primary font-medium text-2xl text-left py-2">
                12 Kings
              </div>
              <div className="flex flex-row gap-2">
                <p className="border-0 rounded-md bg-primary px-2 py-1">
                  Frontend
                </p>
                <p className="border-0 rounded-md bg-primary px-2 py-1">
                  Wallet Integration
                </p>
                <p className="border-0 rounded-md bg-primary px-2 py-1">
                  Web3js
                </p>
              </div>
              <div className="py-2 text-left">
                <p>
                  Website integrated with Web3 elements for a well known Feng
                  Shui Master.
                </p>
              </div>
              <div className="text-left">
                <ul>
                  <li>
                    Transformed the design into interactable code using ReactJs.
                  </li>
                  <li>Involved in team development.</li>
                  <li>Web 3 wallet integration using Web3js.</li>
                </ul>
              </div>
              <div className="flex flex-row gap-1 items-center hover:underline py-2">
                <BsGlobe />
                <a
                  href="https://the12kings.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Website
                </a>
              </div>
            </div>
          </div>

          {/* fourth project */}
          <div className="flex flex-col md:flex-row lg:flex-row gap-9 Roboto justify-center items-center md:justify-start lg:justify-start text-white pt-10">
            <div className="w-72 h-60 border-2 rounded-md border-primary">
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <img src={oasis1} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={oasis2} alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="">
              <div className="text-primary font-medium text-2xl text-left py-2">
                Oasis Labs
              </div>
              <div className="flex flex-row gap-2">
                <p className="border-0 rounded-md bg-primary px-2 py-1">
                  Frontend
                </p>
              </div>
              <div className="py-2 text-left">
                <p>A website that introduced company expertises and services</p>
              </div>
              <div className="text-left">
                <ul>
                  <li>
                    Transformed the design into interactable code using ReactJs.
                  </li>
                  <li>Involved in team development.</li>
                </ul>
              </div>
              <div className="flex flex-row gap-1 items-center hover:underline py-2">
                <BsGlobe />
                <a
                  href="https://oasislabs.tech/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Website
                </a>
              </div>
            </div>
          </div>

          {/* fifth project */}
          <div className="flex flex-col md:flex-row lg:flex-row gap-9 Roboto justify-center items-center md:justify-start lg:justify-start text-white pt-10">
            <div className="w-72 h-60 border-2 rounded-md border-primary">
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <img src={skin1} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={skin2} alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="">
              <div className="text-primary font-medium text-2xl text-left py-2">
                Skin Generator
              </div>
              <div className="flex flex-row gap-2">
                <p className="border-0 rounded-md bg-primary px-2 py-1">
                  Frontend
                </p>
                <p className="border-0 rounded-md bg-primary px-2 py-1">
                  Images
                </p>
              </div>
              <div className="py-2 text-left">
                <p>An automated skin generator for ProjectOasis characters.</p>
              </div>
              <div className="text-left">
                <ul>
                  <li>Design the website using ReactJs.</li>
                  <li>Integrated on handling images processing.</li>
                </ul>
              </div>
              <div className="flex flex-row gap-1 items-center hover:underline py-2">
                <BsGlobe />
                <a href="#" target="_blank" rel="noreferrer">
                  Website
                </a>
              </div>
            </div>
          </div>

          <div className="Roboto text-white py-12">
            <a href="/project">
              <button
                type="button"
                className=" border-4 border-primary rounded-md p-3 hover:border-double"
              >
                Other Projects
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
