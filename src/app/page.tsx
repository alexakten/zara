"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function LandingPage() {
  const textPhrases = ["your website.", "social media.", "marketing."];

  const [currentTextPhrase, setCurrentTextPhrase] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const typingSpeed = 65; // Adjust typing speed

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      if (currentTextPhrase === "") {
        setIsDeleting(false);
        setTextIndex((index) => (index + 1) % textPhrases.length);
        timeoutId = setTimeout(() => {
          setCurrentTextPhrase(
            textPhrases[(textIndex + 1) % textPhrases.length].substring(0, 1)
          );
        }, 2000); // Wait half a second before typing new phrase
      } else {
        timeoutId = setTimeout(() => {
          setCurrentTextPhrase(
            currentTextPhrase.substring(0, currentTextPhrase.length - 1)
          );
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [currentTextPhrase, isDeleting, textIndex, textPhrases]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!isDeleting && currentTextPhrase !== textPhrases[textIndex]) {
      timeoutId = setTimeout(() => {
        setCurrentTextPhrase(
          textPhrases[textIndex].substring(0, currentTextPhrase.length + 1)
        );
      }, typingSpeed);
    } else if (currentTextPhrase === textPhrases[textIndex]) {
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, 2000); // Wait 2 seconds before starting to delete
    }

    return () => clearTimeout(timeoutId);
  }, [currentTextPhrase, isDeleting, textIndex, textPhrases]);


  return (
    <main className="flex flex-col items-center justify-center bg-zinc-100 px-4">
      <Navbar />
      {/* Hero Section */}
      <section className="flex h-screen w-screen items-center justify-center px-4">
        <div
          className="flex  flex-col items-center gap-6 text-center text-gray-900"
          style={{ maxWidth: 880 }}
        >
          <div className="rounded-full border border-zinc-300 bg-white  px-4 py-1 text-zinc-400">
            v1.0 under construction <span className="text-[12px]">🚧</span>
          </div>
          <div>
            <h1 className="gray-shadow text-5xl font-bold tracking-tighter sm:text-8xl">
              Video testimonials <br /> for{" "}
              <span className="black-shadow">{currentTextPhrase}</span>
              <span className="typing-cursor">|</span>
            </h1>
          </div>

          <div className="text-md xs:text-xl" style={{ maxWidth: 624 }}>
            <p>
              Introducing the simplest way to collect & publish video
              testimonials. Start boosting your business with social proof
              today.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 xs:flex-row">
            <Link href={"/form"}>
              <button
                type="button"
                className="box-shadow flex h-12 items-center justify-center rounded-lg border border-black bg-white px-4 font-medium text-black hover:bg-purple hover:text-white"
              >
                Try demo 🌵
              </button>
            </Link>
          </div>
          <p className="text-zinc-400">
            {lang === "en" ? "It's so easy! " : "Det är så enkelt! 🌵"}
          </p>
        </div>
      </section>

      {/* <section className="flex w-screen pb-40 items-center justify-center px-4">
        <Record question="How did you hear about us?"/>
      </section> */}
    </main>
  );
}
