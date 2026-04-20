"use client";

import React, { useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { cinzel } from "@/app/fonts";

const morphTime = 1.5;
const cooldownTime = 0.5;

const useMorphingText = (texts: string[]) => {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(0);
  const timeRef = useRef(new Date());

  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current];
      if (!current1 || !current2) return;

      // ✅ Reduce blur amount = huge performance improvement while scrolling
      const blur = 6;
      const maxBlur = 60;

      current2.style.filter = `blur(${Math.min(blur / fraction - blur, maxBlur)}px)`;
      current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      const invertedFraction = 1 - fraction;
      current1.style.filter = `blur(${Math.min(
        blur / invertedFraction - blur,
        maxBlur,
      )}px)`;
      current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`;

      current1.textContent = texts[textIndexRef.current % texts.length];
      current2.textContent = texts[(textIndexRef.current + 1) % texts.length];
    },
    [texts],
  );

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;

    let fraction = morphRef.current / morphTime;

    if (fraction > 1) {
      cooldownRef.current = cooldownTime;
      fraction = 1;
    }

    setStyles(fraction);

    if (fraction === 1) {
      textIndexRef.current++;
    }
  }, [setStyles]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const [current1, current2] = [text1Ref.current, text2Ref.current];
    if (current1 && current2) {
      current2.style.filter = "none";
      current2.style.opacity = "100%";
      current1.style.filter = "none";
      current1.style.opacity = "0%";
    }
  }, []);

  useEffect(() => {
    let animationFrameId = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const newTime = new Date();
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
      timeRef.current = newTime;

      cooldownRef.current -= dt;

      if (cooldownRef.current <= 0) doMorph();
      else doCooldown();
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [doMorph, doCooldown]);

  return { text1Ref, text2Ref };
};

interface MorphingTextProps {
  className?: string;
  texts: string[];
}

const Texts: React.FC<Pick<MorphingTextProps, "texts">> = ({ texts }) => {
  const { text1Ref, text2Ref } = useMorphingText(texts);

  return (
    <>
      <span
        ref={text1Ref}
        className={cn(
          "absolute inset-x-0 top-0 m-auto inline-block w-full text-white",
          // ✅ GPU + smoother during scroll
          "will-change-[filter,opacity,transform] transform-gpu",
          // ✅ prevent repaint storms
          "[backface-visibility:hidden]",
        )}
      />
      <span
        ref={text2Ref}
        className={cn(
          "absolute inset-x-0 top-0 m-auto inline-block w-full text-white",
          "will-change-[filter,opacity,transform] transform-gpu",
          "[backface-visibility:hidden]",
        )}
      />
    </>
  );
};

const SvgFilters: React.FC = () => (
  <svg id="filters" className="hidden" preserveAspectRatio="xMidYMid slice">
    <defs>
      <filter id="threshold">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
        />
      </filter>
    </defs>
  </svg>
);

const MorphingText: React.FC<MorphingTextProps> = ({ texts, className }) => (
  <div
    className={cn(
      // ✅ One step smaller (previous: 40pt + lg: 6rem)
      "relative mx-auto h-14 w-full max-w-screen-md text-center text-[32pt] font-bold leading-none md:h-20 lg:text-[4.5rem]",
      // ✅ isolate paint/layout → reduces flicker during scroll
      "isolate [contain:layout_paint]",
      // ✅ GPU + stable compositing
      "transform-gpu [backface-visibility:hidden]",
      // ✅ Keep your cinematic style
      "[filter:url(#threshold)_blur(0.6px)]",
      cinzel.className,
      "text-white",
      className,
    )}
  >
    <Texts texts={texts} />
    <SvgFilters />
  </div>
);

export { MorphingText };