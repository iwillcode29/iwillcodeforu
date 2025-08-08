import React from "react";
import {
  CountdownBox,
  StyledButton,
  cardBoxStyle,
  colorPalette,
} from "../utils/sharedStyles";
import { countdownColors, countdownLabels } from "../utils/countdownData";

export const SettingsButton = ({ showSettings, setShowSettings }) => (
  <button
    onClick={() => setShowSettings(!showSettings)}
    className="absolute top-6 right-6 text-black hover:opacity-70 transition-all duration-300 bg-white bg-opacity-90 backdrop-blur-md rounded-full p-2 shadow-lg border border-gray-200"
  >
    <svg
      className="w-5 h-5"
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
  targetDate,
  setTargetDate,
}) => {
  if (!showSettings) return null;

  return (
    <div className="absolute top-16 right-6 z-50 w-80">
      <div className="booking-card">
        <div className="form-group">
          <label
            style={{
              color: colorPalette.text,
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            วันที่จะลืม:
          </label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            style={{
              backgroundColor: "#fff",
              color: colorPalette.text,
              border: `2px solid #ddd`,
              borderRadius: "8px",
            }}
          />
        </div>

        <button
          onClick={() => setShowSettings(false)}
          className="btn btn-primary"
          style={{
            width: "100%",
            marginTop: "10px",
            fontSize: "14px",
          }}
        >
          บันทึก
        </button>
      </div>
    </div>
  );
};

export const CountdownTitle = () => <img src="/forget_logo.svg" alt="logo" />;

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

export const DailyTracker = ({ onTrack, hasTrackedToday, todayFeeling }) => (
  <div
    className="mt-8 mx-auto border-4 hover:scale-105 transition-all duration-300"
    style={{
      ...cardBoxStyle,
      backgroundColor: colorPalette.white,
      maxWidth: "500px",
    }}
  >
    <h2 className="text-xl md:text-2xl font-bold mb-6 text-black">
      วันนี้ยังคิดถึงไหม?
    </h2>

    {hasTrackedToday ? (
      <div className="text-center">
        <div className="text-4xl md:text-6xl mb-4">
          {todayFeeling === "yes" ? "💔" : "😌"}
        </div>
        <p className="text-lg md:text-xl font-medium text-black mb-4">
          {todayFeeling === "yes" ? "วันนี้ยังคิดถึง" : "วันนี้ไม่คิดถึงแล้ว"}
        </p>
        <p className="text-sm text-gray-600">บันทึกแล้วสำหรับวันนี้</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StyledButton
          onClick={() => onTrack("yes")}
          backgroundColor={colorPalette.accent}
          className="min-h-[80px]"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl">💔</span>
            <span className="text-lg font-medium">ยังคิดถึง</span>
          </div>
        </StyledButton>
        <StyledButton
          onClick={() => onTrack("no")}
          backgroundColor={colorPalette.secondary}
          className="min-h-[80px]"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl">😌</span>
            <span className="text-lg font-medium">ไม่คิดถึงแล้ว</span>
          </div>
        </StyledButton>
      </div>
    )}
  </div>
);

export const ProgressChart = ({ trackingData }) => {
  if (!trackingData || trackingData.length === 0) {
    return null;
  }

  // คำนวณเปอร์เซ็นต์ของการไม่คิดถึงในช่วง 7 วันล่าสุด
  const last7Days = trackingData.slice(-7);
  const forgettingPercentage =
    last7Days.length > 0
      ? Math.round(
          (last7Days.filter((day) => day.feeling === "no").length /
            last7Days.length) *
            100
        )
      : 0;

  const maxItems = 14; // แสดงข้อมูล 14 วันล่าสุด
  const displayData = trackingData.slice(-maxItems);

  return (
    <div
      className="mt-8 mx-auto border-4 hover:scale-105 transition-all duration-300"
      style={{
        ...cardBoxStyle,
        backgroundColor: colorPalette.white,
        maxWidth: "600px",
        minHeight: "200px",
      }}
    >
      <h3 className="text-xl md:text-2xl font-bold mb-6 text-black">
        กราฟความคืบหน้าในการลืม
      </h3>

      <div
        className="mb-6 p-4 border-4 rounded-3xl"
        style={{
          backgroundColor: colorPalette.light,
          borderColor: colorPalette.secondary,
        }}
      >
        <div
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{ color: colorPalette.secondary }}
        >
          {forgettingPercentage}%
        </div>
        <p className="text-sm md:text-base font-medium text-black">
          ช่วง 7 วันล่าสุดที่ไม่คิดถึง
        </p>
      </div>

      <div className="flex items-end justify-center gap-2 h-32 mb-6">
        {displayData.map((day, index) => {
          const isThinking = day.feeling === "yes";
          const height = isThinking ? "100%" : "30%";
          const backgroundColor = isThinking
            ? colorPalette.accent
            : colorPalette.secondary;

          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-6 rounded-t-lg transition-all duration-300 hover:opacity-80 border-2"
                style={{
                  height,
                  backgroundColor,
                  borderColor: colorPalette.text,
                }}
                title={`${day.date}: ${isThinking ? "คิดถึง" : "ไม่คิดถึง"}`}
              />
              <div className="text-xs font-medium text-black mt-2">
                {new Date(day.date).getDate()}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded border-2"
            style={{
              backgroundColor: colorPalette.accent,
              borderColor: colorPalette.text,
            }}
          ></div>
          <span className="font-medium text-black">ยังคิดถึง</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded border-2"
            style={{
              backgroundColor: colorPalette.secondary,
              borderColor: colorPalette.text,
            }}
          ></div>
          <span className="font-medium text-black">ไม่คิดถึงแล้ว</span>
        </div>
      </div>
    </div>
  );
};
