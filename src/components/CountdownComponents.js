import React from "react";
import { CountdownBox } from "../utils/sharedStyles";
import { countdownColors, countdownLabels } from "../utils/countdownData";

export const SettingsButton = ({ showSettings, setShowSettings }) => (
  <button
    onClick={() => setShowSettings(!showSettings)}
    className="absolute top-6 right-6 text-black hover:text-pink-300 transition-colors duration-300"
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  </button>
);

export const SettingsPanel = ({
  showSettings,
  setShowSettings,
  personName,
  setPersonName,
  targetDate,
  setTargetDate,
}) => {
  if (!showSettings) return null;

  return (
    <div className="absolute top-16 right-6 bg-black backdrop-blur-md rounded-lg p-4 z-50 border border-white border-opacity-20">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-white">
          ชื่อของเขา/เธอ:
        </label>
        <input
          type="text"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="ใส่ชื่อ..."
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-white">
          วันที่จะลืม:
        </label>
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>
      <button
        onClick={() => setShowSettings(false)}
        className="w-full bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-md transition-colors duration-300 text-white"
      >
        บันทึก
      </button>
    </div>
  );
};

export const CountdownTitle = ({ personName }) => (
  <h1 className="text-4xl md:text-6xl font-bold mb-8 text-black">
    อีกกี่วันฉันจะลืม{personName}
  </h1>
);

export const CountdownDisplay = ({ timeLeft, isExpired, personName }) => {
  if (isExpired) {
    return (
      <div className="mb-10 mt-10">
        <div className="text-4xl md:text-6xl font-bold text-green-800 mb-4 animate-bounce">
          🎉 ลืมแล้ว! 🎉
        </div>
        <p className="text-xl md:text-2xl text-black">
          เย้! เราลืม{personName}ได้สำเร็จแล้ว
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8">
      <CountdownBox
        value={timeLeft.days}
        label={countdownLabels.days}
        backgroundColor={countdownColors.days}
      />
      <CountdownBox
        value={timeLeft.hours}
        label={countdownLabels.hours}
        backgroundColor={countdownColors.hours}
      />
      <CountdownBox
        value={timeLeft.minutes}
        label={countdownLabels.minutes}
        backgroundColor={countdownColors.minutes}
      />
      <CountdownBox
        value={timeLeft.seconds}
        label={countdownLabels.seconds}
        backgroundColor={countdownColors.seconds}
      />
    </div>
  );
};

export const QuoteSection = () => (
  <div className="max-w-2xl mx-auto">
    <blockquote className="text-lg md:text-xl italic text-black leading-relaxed">
      "เวลาจะทำให้ทุกอย่างจางลง แม้แต่ความทรงจำที่เคยหวงแหน"
    </blockquote>
    <cite className="block mt-4 text-sm text-gray-800">
      - ใครคนหนึ่งที่เข้าใจ
    </cite>
  </div>
);

export const ProgressBar = ({ progress }) => (
  <div className="mt-8 max-w-md mx-auto">
    <div className="bg-white rounded-full h-2 overflow-hidden">
      <div
        className="bg-black h-full transition-all duration-1000 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
    <p className="text-xs text-gray-800 mt-2">ความคืบหน้าในการลืม</p>
  </div>
);
