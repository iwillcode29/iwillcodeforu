import moment from "moment";

export const defaultPersonName = "เขา";
export const defaultDaysToAdd = 100;

export const countdownLabels = {
  days: "วัน",
  hours: "ชั่วโมง", 
  minutes: "นาที",
  seconds: "วินาที",
};

export const countdownColors = {
  days: "#eaa142",
  hours: "#5fb274", 
  minutes: "#e9684d",
  seconds: "#cdeadd",
};

export const calculateTimeLeft = (targetDate) => {
  const now = moment();
  const target = moment(targetDate);
  const difference = target.diff(now);

  if (difference > 0) {
    const duration = moment.duration(difference);
    return {
      days: Math.floor(duration.asDays()),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    };
  } else {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
};

export const isCountdownExpired = (timeLeft) => {
  return timeLeft.days === 0 && 
         timeLeft.hours === 0 && 
         timeLeft.minutes === 0 && 
         timeLeft.seconds === 0;
};

export const calculateProgress = (targetDate) => {
  const now = moment();
  const startDate = moment().subtract(defaultDaysToAdd, "days");
  const endDate = moment(targetDate);
  
  const totalDuration = endDate.diff(startDate);
  const elapsed = now.diff(startDate);
  
  return Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
};

// ฟังก์ชันสำหรับจัดการข้อมูลการติดตามประจำวัน
export const STORAGE_KEY = 'forgetting_tracker_data';

export const getTodayDate = () => {
  return moment().format('YYYY-MM-DD');
};

export const loadTrackingData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading tracking data:', error);
    return [];
  }
};

export const saveTrackingData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving tracking data:', error);
  }
};

export const addDailyFeeling = (feeling) => {
  const today = getTodayDate();
  const trackingData = loadTrackingData();
  
  // ลบข้อมูลวันนี้ถ้ามีอยู่แล้ว (อัปเดตใหม่)
  const filteredData = trackingData.filter(item => item.date !== today);
  
  // เพิ่มข้อมูลใหม่
  const newData = [...filteredData, { date: today, feeling }];
  
  // เรียงตามวันที่
  newData.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  saveTrackingData(newData);
  return newData;
};

export const getTodayFeeling = () => {
  const today = getTodayDate();
  const trackingData = loadTrackingData();
  const todayData = trackingData.find(item => item.date === today);
  return todayData ? todayData.feeling : null;
};

export const hasTrackedToday = () => {
  return getTodayFeeling() !== null;
}; 