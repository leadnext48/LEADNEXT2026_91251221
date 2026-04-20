"use client";

import { ReactLenis } from "lenis/react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { SiSpacex } from "react-icons/si";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { useRef } from "react";
import { cinzel, playfair } from "@/app/fonts"; // ✅ fonts

type ParallaxImgProps = {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
};

type ScheduleItemProps = {
  title: string;
  date: string;
  location: string;
};

export const SmoothScrollHero = () => {
  return (
    <div className="bg-zinc-950">
      {/* ✅ Lenis wrapper for smooth scrolling */}
      <ReactLenis root>
        {/* <Nav /> */}
        <Hero />
        <Schedule />
      </ReactLenis>
    </div>
  );
};

const Nav = () => {
  return (
    <nav
      className={`${cinzel.className} fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white`}
    >
      <SiSpacex className="text-3xl mix-blend-difference" />
      <button
        onClick={() => {
          document.getElementById("launch-schedule")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        className="flex items-center gap-1 text-xs text-zinc-400"
      >
        LAUNCH SCHEDULE <FiArrowRight />
      </button>
    </nav>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath =
    useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );

  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
      backgroundImage: "url(/h1.jpg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
src="/h2.jpg"
        alt="An example of a space launch"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
src="/hr3.jpg"
        alt="An example of a space launch"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
src="/hr4.jpg"
        alt="Orbiting satellite"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
src="/hr5.jpg"
        alt="Orbiting satellite"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }: ParallaxImgProps) => {
  const ref = useRef<HTMLImageElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const Schedule = () => {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 py-48 text-white"
    >
      {/* ✅ Title in Cinzel */}
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className={`${cinzel.className} mb-12 text-5xl font-semibold tracking-tight text-zinc-50`}
      >
        Not Just a Campus. <br />
        A Commitment.
      </motion.h1>

      {/* ✅ Paragraphs in Playfair */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75, delay: 0.15 }}
        className={`${playfair.className} space-y-6 text-lg md:text-xl leading-relaxed text-zinc-300`}
      >
        <p>
          LEAD was never meant to be loud. It was meant to be lasting. Founded in
          Palakkad in 2010 with a simple but demanding idea — that education
          should create leaders who can think independently, act responsibly,
          and endure uncertainty — LEAD has grown into an autonomous,
          AICTE-approved institution shaping professionals for a world that
          refuses to stand still.
        </p>

        <p>
          Here, MBA and MCA programs are not treated as credentials to collect,
          but as disciplines to master. With industry-integrated learning, close
          mentorship from experienced professionals, and a culture that values
          resilience as much as results, LEAD has quietly built a record that
          speaks for itself — consistent placements, global exposure, and
          alumni who lead with clarity rather than noise.
        </p>

        <p>
          What sets LEAD apart is not scale, but intent. From standing by its
          first students during regulatory setbacks to becoming a campus powered
          largely by solar energy, the institution has made choices that reveal
          character. Today, with a future-focused MCA program, a
          sustainability-driven campus, and a community that never stopped
          believing in the long game, LEAD continues to do what it has always
          done best — build careers with conscience, and progress with purpose.
        </p>
      </motion.div>
    </section>
  );
};

const ScheduleItem = ({ title, date, location }: ScheduleItemProps) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9"
    >
      {/* ✅ Title in Cinzel */}
      <div className={cinzel.className}>
        <p className="mb-1.5 text-xl text-zinc-50 font-semibold">{title}</p>
        <p className="text-sm uppercase text-zinc-500">{date}</p>
      </div>

      <div className="flex items-center gap-1.5 text-end text-sm uppercase text-zinc-500">
        <p>{location}</p>
        <FiMapPin />
      </div>
    </motion.div>
  );
};