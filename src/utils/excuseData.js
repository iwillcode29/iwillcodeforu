export const thaiExcuses = [
  "ท้องเสีย เพราะทานอาหารเก่าเมื่อคืน",
  "ติดฝน ขับรถไม่ได้ เพราะน้ำท่วมถนน",
  "รถเสีย แบตหมด สตาร์ทไม่ติด",
  "ลูกป่วย ต้องพาไปหาหมอ",
  "ฟันปวด นัดหมายทันตแพทย์เร่งด่วน",
  "แมวหาย ต้องออกตามหา",
  "น้ำประปาแตก บ้านท่วม ต้องรอช่างมาซ่อม",
  "ตื่นสาย นาฬิกาปลุกเสีย",
  "ลืมกุญแจบ้าน ติดอยู่ข้างนอก",
  "ปวดหัวรุนแรง คลื่นไส้",
  "รถติดมาก เพราะมีอุบัติเหตุบนถนน",
  "หมอนัดฉีดวัคซีน",
  "ไปส่งคุณยายที่สนามบิน",
  "สุนัขป่วย ต้องพาไปหาสัตวแพทย์",
  "ไฟฟ้าดับ ตื่นสายเพราะเครื่องใช้ไฟฟ้าไม่ทำงาน",
  "หลับในรถเมล์ ไปผิดทาง",
  "ปวดท้อง อาจเป็นไข้หวัดใหญ่",
  "รถยางแบน ไม่มียางอะไหล่",
  "ลูกสอบ ต้องไปส่งที่โรงเรียน",
  "บ้านถูกย่อย ต้องรอตำรวจมาตรวจสอบ",
  "งานบุญที่วัด ญาติมาจากต่างจังหวัด",
  "แม่ป่วย ต้องไปส่งโรงพยาบาล",
  "ตกน้ำ เสื้อผ้าเปียก ต้องกลับไปเปลี่ยน",
  "หลงทาง GPS ใช้ไม่ได้",
  "ไข้ขึ้น วัดได้ 38 องศา",
  "กบินทร์ไม่ทำงาน ติดอยู่ระหว่างชั้น",
  "หมดน้ำมัน ปั๊มปิด",
  "ภรรยาคลอดลูก (ฉุกเฉิน)",
  "ลิงเข้าบ้าน ทำของเสียหาย",
  "นกบินชนกระจกรถ มองไม่เห็นทาง",
];

export const englishExcuses = [
  "Stomach flu from eating expired food last night",
  "Stuck in traffic due to flooding",
  "Car battery died, can't start the engine",
  "Child is sick, need to take to doctor",
  "Severe toothache, emergency dental appointment",
  "Cat went missing, searching everywhere",
  "Water pipe burst, house is flooded",
  "Overslept, alarm clock broke",
  "Locked out of house, forgot keys inside",
  "Severe migraine with nausea",
  "Massive traffic jam due to accident",
  "Doctor's appointment for vaccination",
  "Taking grandma to the airport",
  "Dog is sick, need to visit vet",
  "Power outage, all alarms failed",
  "Fell asleep on bus, went wrong direction",
  "Food poisoning from restaurant meal",
  "Flat tire, no spare available",
  "Child's exam day, need to drop off",
  "House was burglarized, waiting for police",
  "Family wedding, relatives visiting",
  "Mother hospitalized, emergency situation",
  "Fell in water, clothes soaked",
  "Lost, GPS not working",
  "Fever of 102°F, feeling terrible",
  "Elevator stuck between floors",
  "Ran out of gas, station closed",
  "Wife in labor (emergency)",
  "Monkey invaded house, chaos everywhere",
  "Bird hit windshield, can't see road",
];

export const getRandomExcuse = (language) => {
  const excuses = language === "thai" ? thaiExcuses : englishExcuses;
  const randomIndex = Math.floor(Math.random() * excuses.length);
  return excuses[randomIndex];
};

export const languages = {
  THAI: "thai",
  ENGLISH: "english",
};

export const uiText = {
  thai: {
    clickToGenerate: "กดปุ่มเพื่อสุ่มข้ออ้างใหม่!",
    generating: "กำลังสุ่ม...",
    random: "Random",
  },
  english: {
    clickToGenerate: "Click the button to generate an excuse!",
    generating: "Generating...",
    random: "Random",
  },
}; 