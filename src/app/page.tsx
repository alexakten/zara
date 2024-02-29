"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function LandingPage() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const textPhrases = ["networking.", "sales.", "recruiting."];

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
          style={{ maxWidth: 1050 }}
        >
          <div className="rounded-full border border-zinc-300 bg-white  px-4 py-1 text-zinc-400">
            v1.0 under construction <span className="text-[12px]">🚧</span>
          </div>
          <div>
            <h1 className="gray-shadow text-4xl leading-[1.1] font-bold tracking-tighter sm:text-7xl">
              AI Assisted LinkedIn <br />
              outreach for <span className="black-shadow">{currentTextPhrase}</span>
              <span className="typing-cursor">|</span>
            </h1>
          </div>

          <div className="text-md xs:text-xl" style={{ maxWidth: 624 }}>
            <p>
              Zara automatically writes personalized LinkedIn outreach messages,
              exactly in your style. Write cold outbound messages 10x faster.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 xs:flex-row">
            <Link href={"/form"}>
              <button
                type="button"
                className="box-shadow flex h-12 items-center justify-center rounded-lg border border-black bg-white px-4 font-medium text-black hover:bg-gray-100"
              >
                Try demo 🌵
              </button>
            </Link>
          </div>
          <p className="text-zinc-400">It&apos;s so easy!</p>
        </div>
      </section>
    </main>
  );
}
