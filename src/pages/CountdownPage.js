import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  defaultPersonName,
  defaultDaysToAdd,
  calculateTimeLeft,
  isCountdownExpired,
  calculateProgress,
} from "../utils/countdownData";
import {
  SettingsButton,
  SettingsPanel,
  CountdownTitle,
  CountdownDisplay,
  QuoteSection,
  ProgressBar,
  BackgroundAnimation,
} from "../components/CountdownComponents";
import { colorPalette } from "../utils/sharedStyles";

const CountdownPage = () => {
  const [targetDate, setTargetDate] = useState(
    moment().add(defaultDaysToAdd, "days").format("YYYY-MM-DD")
  );
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [personName, setPersonName] = useState(defaultPersonName);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const isExpired = isCountdownExpired(timeLeft);
  const progress = calculateProgress(targetDate);

  return (
    <div 
      className="min-h-screen p-4 relative flex flex-col items-center justify-center" 
      style={{ backgroundColor: colorPalette.background }}
    >
      <SettingsButton 
        showSettings={showSettings} 
        setShowSettings={setShowSettings} 
      />

      <SettingsPanel
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        personName={personName}
        setPersonName={setPersonName}
        targetDate={targetDate}
        setTargetDate={setTargetDate}
      />

      <div className="text-center z-10 px-4 max-w-4xl mx-auto">
        <CountdownTitle personName={personName} />

        <CountdownDisplay 
          timeLeft={timeLeft}
          isExpired={isExpired}
          personName={personName}
        />

        <QuoteSection />

        <ProgressBar progress={isExpired ? 100 : progress} />
      </div>
    </div>
  );
};

export default CountdownPage;
