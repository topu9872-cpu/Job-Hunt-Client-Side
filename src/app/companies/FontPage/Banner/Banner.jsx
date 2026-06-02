"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";

const Banner = () => {
  const slides = [
    {
      image: "/assets/banner-image1.png",
      title: "Find Your Dream Job",
      tag: "10k+ Jobs",
    },
    {
      image: "/assets/banner-image2.png",
      title: "Hire Top Talent",
      tag: "Top Companies",
    },
    {
      image: "/assets/banner-image3.png",
      title: "Grow Your Career",
      tag: "Career Boost",
    },
    {
      image: "/assets/banner-image4.png",
      title: "Remote Jobs",
      tag: "Work Anywhere",
    },
  ];

  return (
    <section className="w-full">
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-120 md:h-150">
          
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="w-11/12 mx-auto">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-4xl md:text-6xl font-bold">
                      {slide.title}
                    </h1>

                    <div className="mt-8 flex gap-4">
                      <button className="btn btn-info">Browse Jobs</button>

                      <button className="btn btn-outline text-white border-white hover:bg-white hover:text-black">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-20 right-10 hidden md:block"
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-3 rounded-2xl">
                  <p className="text-xs opacity-70">Live Jobs</p>
                  <h2 className="text-xl font-bold">12,450+</h2>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute bottom-20 right-16 hidden md:block"
              >
                <div className="bg-liner-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-md border border-white/20 text-white px-5 py-3 rounded-2xl">
                  <p className="text-xs">🔥 Hot Hiring</p>
                  <h3 className="font-bold">{slide.tag}</h3>
                </div>
              </motion.div>

              {/* Card 3 - Success Rate */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="absolute top-24 left-10 hidden md:block"
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-3 rounded-2xl">
                  <p className="text-xs opacity-70">Success Rate</p>
                  <h2 className="text-xl font-bold text-green-400">98%</h2>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
