"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "../style/TextType.css";

const TextType = ({
  text,
  typingSpeed = 75,
  initialDelay = 0,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "|",
  className = "",
  ...props
}) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const cursorRef = useRef(null);

  const textArray = Array.isArray(text) ? text : [text];

  useEffect(() => {
    if (lineIndex >= textArray.length) return;

    const currentLine = textArray[lineIndex];

    if (charIndex === 0 && lineIndex === 0) {
      setTimeout(() => {
        setDisplayedLines([""]);
      }, initialDelay);
    }

    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[lineIndex] = (updated[lineIndex] || "") + currentLine[charIndex];
          return updated;
        });
        setCharIndex(charIndex + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        if (lineIndex < textArray.length - 1) {
          setLineIndex(lineIndex + 1);
          setCharIndex(0);
        }
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, lineIndex, textArray, typingSpeed, pauseDuration, initialDelay]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }
  }, [showCursor]);

  return (
    <div
      className={`text-type-container ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "200px",
        textAlign: "center",
        ...props.style,
      }}
    >
      {displayedLines.map((line, idx) => (
        <div key={idx} className="text-type-line">
          {line}
          {showCursor && idx === displayedLines.length - 1 && (
            <span ref={cursorRef} className="text-type-cursor">
              {cursorCharacter}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default TextType;