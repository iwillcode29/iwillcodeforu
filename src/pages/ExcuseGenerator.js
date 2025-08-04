import React, { useState } from "react";
import { getRandomExcuse, languages, uiText } from "../utils/excuseData";
import { cardBoxStyle } from "../utils/sharedStyles";
import "../styles/animations.css";

const ExcuseGenerator = () => {
  const [currentExcuse, setCurrentExcuse] = useState("");
  const [language, setLanguage] = useState(languages.THAI);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  const generateExcuse = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setAnimationClass("fadeOut");

    setTimeout(() => {
      setCurrentExcuse(getRandomExcuse(language));
      setAnimationClass("fadeIn");

      setTimeout(() => {
        setIsAnimating(false);
        setAnimationClass("");
      }, 500);
    }, 300);
  };

  const handleButtonClick = (e) => {
    if (!isAnimating) {
      e.target.classList.add("bounce");
      setTimeout(() => {
        e.target.classList.remove("bounce");
      }, 600);
      generateExcuse();
    }
  };

  const LanguageButton = ({ lang, isActive, onClick, children }) => (
    <button
      onClick={onClick}
      className={`${
        isActive ? "bg-yellow-400" : "bg-white"
      } py-4 px-8 rounded-full cursor-pointer text-lg font-semibold transition-all duration-300 transform hover:-translate-y-0.5 border-4`}
      style={{
        color: "#2a2a2a",
        borderColor: "#2a2a2a",
        minWidth: "120px",
      }}
    >
      {children}
    </button>
  );

  const ExcuseDisplay = () => (
    <div
      className={`${animationClass} bg-white py-10 px-7 mb-10 flex items-center justify-center border-4`}
      style={{
        ...cardBoxStyle,
        color: "#2a2a2a",
      }}
    >
      {currentExcuse ? (
        <p className="text-xl leading-relaxed m-0 text-center font-medium">
          "{currentExcuse}"
        </p>
      ) : (
        <p className="text-lg text-gray-500 m-0 text-center">
          {uiText[language].clickToGenerate}
        </p>
      )}
    </div>
  );

  const GenerateButton = () => (
    <button
      className={`${!currentExcuse ? "custom-pulse" : ""} ${
        isAnimating ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
      } py-5 px-16 rounded-full text-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 border-4`}
      style={{
        backgroundColor: isAnimating ? "#d4af37" : "#f4c430",
        color: "#2a2a2a",
        borderColor: "#2a2a2a",
        boxShadow: "0 4px 0 #2a2a2a",
        minWidth: "200px",
      }}
      onMouseEnter={(e) => {
        if (!isAnimating) {
          e.target.style.boxShadow = "0 6px 0 #2a2a2a";
        }
      }}
      onMouseLeave={(e) => {
        if (!isAnimating) {
          e.target.style.boxShadow = "0 4px 0 #2a2a2a";
        }
      }}
      disabled={isAnimating}
      onClick={handleButtonClick}
    >
      {isAnimating ? (
        <>
          <span className="animate-spin inline-block">🔄</span>{" "}
          {uiText[language].generating}
        </>
      ) : (
        uiText[language].random
      )}
    </button>
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center font-sans p-5"
      style={{ backgroundColor: "#f5e6d3" }}
    >
      <div className="bg-transparent max-w-sm w-full text-center">
        {/* Logo */}
        <div className="mb-5 leading-none">
          <img
            src="/sleep_logo.svg"
            alt="Logo"
            className="object-contain mx-auto"
          />
        </div>

        {/* Language selector buttons */}
        <div className="mb-10 flex gap-3 justify-center">
          <LanguageButton
            lang={languages.THAI}
            isActive={language === languages.THAI}
            onClick={() => setLanguage(languages.THAI)}
          >
            Thai
          </LanguageButton>
          <LanguageButton
            lang={languages.ENGLISH}
            isActive={language === languages.ENGLISH}
            onClick={() => setLanguage(languages.ENGLISH)}
          >
            English
          </LanguageButton>
        </div>

        {/* Excuse display area */}
        <ExcuseDisplay />

        {/* Generate button */}
        <GenerateButton />
      </div>
    </div>
  );
};

export default ExcuseGenerator;
