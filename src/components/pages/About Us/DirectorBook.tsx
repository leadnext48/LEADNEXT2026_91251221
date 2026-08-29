"use client";

import Image from "next/image";
import { playfair, cinzel } from "@/app/fonts";
import React, { JSX, useState, useEffect } from "react";
import { motion } from "framer-motion";

type TestimonialProps = {
  initials: string;
  name: string;
  role: string;
  text: string;
};

const testimonials: TestimonialProps[] = [
  {
    initials: "KC",
    name: "Kochouseph Chittilappilly",
    role: "Founder & CEO, V-Guard Industries",
    text: `'Preneur' by Dr. Thomas George is an insightful work that throws light on how one can consciously develop the right and left spheres of the human brain and unleash the untapped potentials hidden within to attain success. The book presents the subject in a captivating and humorous way, offering useful insights for an ambitious entrepreneurial journey.`,
  },
  {
    initials: "JT",
    name: "Jiji Thomson IAS",
    role: "Former Chief Secretary of Kerala",
    text: `Are you an aspiring entrepreneur? Then, read this book. It will guide you through the intricacies of the concept of left and right brain, explained meticulously by Dr. Thomas George. The author, in his second avatar as Thomman, deciphers the concept further. It's simply brilliant. This is a must-read for both academicians and budding entrepreneurs.`,
  },
];

function MarkerWord({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span className="relative inline-block px-1">
      <span className="relative z-10">{children}</span>

      <motion.span
        className="absolute inset-x-0 top-[55%] h-[0.85em] -translate-y-1/2 bg-yellow-300/80 rounded-sm z-0"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.7 }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
          delay,
        }}
        style={{ transformOrigin: "left" }}
      />
    </span>
  );
}

export default function ChairmanBookSection(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen w-full px-6 lg:px-20">
      {/* ✅ KEY FIX: stop stretching too wide on big screens */}
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[57%_43%] items-center gap-12">
          {/* LEFT */}
          <div className={`${playfair.className} space-y-8`}>
            <div>
              {/* Title fade in */}
              <motion.h2
                className={`${cinzel.className} text-xl sm:text-2xl lg:text-3xl font-bold leading-snug max-w-xl`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                Dr. <MarkerWord delay={0.08}>THOMAS GEORGE&apos;S</MarkerWord>{" "}
                LEFT BRAIN SPEAKS TO{" "}
                <MarkerWord delay={0.22}>THOMMAN&apos;S</MarkerWord> RIGHT BRAIN
              </motion.h2>

              {/* Description fade in */}
              <motion.p
                className="text-md text-gray-700 leading-relaxed mt-4 max-w-xl"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
              >
                This book on management is co-authored by two minds of a single
                people; Thomas George and{" "}
                <span className="relative inline-block font-semibold">
                  Thomman
                </span>
                , blending practicality and creativity for entrepreneurial
                success.
              </motion.p>
            </div>

            {/* ✅ Testimonial Card fade + slide in */}
            <motion.div
              className="relative px-3 py-2 rounded-md bg-white/80 backdrop-blur-sm shadow-sm w-full max-w-md"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.55 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.08,
              }}
            >
              <div className="absolute top-1 left-2 text-lg text-black font-bold font-serif leading-none pointer-events-none">
                "
              </div>

              <div
                className={`transition-opacity duration-500 ${
                  fade ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="text-[13px] text-gray-700 leading-6 mb-6 pt-3">
                  {testimonials[currentIndex].text}
                </p>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-[12px] shadow-sm flex-shrink-0">
                    {testimonials[currentIndex].initials}
                  </div>

                  <div className="leading-tight">
                    <p className="font-semibold text-[12px]">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-[12px] text-gray-600">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-1 justify-center mt-2">
                {testimonials.map((_, index) => (
                  <div
                    key={index}
                    className={`h-[2px] rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-5 bg-yellow-500"
                        : "w-1 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center items-center">
            {/* ✅ Book fade + slight zoom on entry */}
            <motion.div
              className="container-3d"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.55 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.12,
              }}
            >
              <div className="book">
                <span className="shadow" />
                <div className="back" />
                <div className="cover-end" />
                <div className="page last" />
                <div className="page fifth" />
                <div className="page fourth" />
                <div className="page third" />
                <div className="page second" />
                <div className="page first" />
                <div className="cover">
                  <Image src="/Preneur.jpg" alt="Book cover" fill priority />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
