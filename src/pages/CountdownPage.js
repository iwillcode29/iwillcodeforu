import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  defaultPersonName,
  defaultDaysToAdd,
  calculateTimeLeft,
  isCountdownExpired,
  calculateProgress,
  loadTrackingData,
  addDailyFeeling,
  getTodayFeeling,
  hasTrackedToday,
} from "../utils/countdownData";
import {
  SettingsButton,
  SettingsPanel,
  CountdownTitle,
  CountdownDisplay,
  QuoteSection,
  ProgressBar,
  DailyTracker,
  ProgressChart,
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
  
  // States สำหรับการติดตามประจำวัน
  const [trackingData, setTrackingData] = useState([]);
  const [todayFeeling, setTodayFeeling] = useState(null);
  const [trackedToday, setTrackedToday] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // โหลดข้อมูลการติดตามเมื่อ component mount
  useEffect(() => {
    const data = loadTrackingData();
    setTrackingData(data);
    
    const feeling = getTodayFeeling();
    setTodayFeeling(feeling);
    setTrackedToday(hasTrackedToday());
  }, []);

  const handleDailyTrack = (feeling) => {
    const newData = addDailyFeeling(feeling);
    setTrackingData(newData);
    setTodayFeeling(feeling);
    setTrackedToday(true);
  };

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

        {/* <DailyTracker
          onTrack={handleDailyTrack}
          hasTrackedToday={trackedToday}
          todayFeeling={todayFeeling}
        />

        <ProgressChart trackingData={trackingData} /> */}
      </div>
    </div>
  );
};

export default CountdownPage;
