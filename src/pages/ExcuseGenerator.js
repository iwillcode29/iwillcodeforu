import React, { useState } from 'react';

const ExcuseGenerator = () => {
  const [currentExcuse, setCurrentExcuse] = useState('');
  const [language, setLanguage] = useState('thai');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  const thaiExcuses = [
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
    "นกบินชนกระจกรถ มองไม่เห็นทาง"
  ];

  const englishExcuses = [
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
    "Bird hit windshield, can't see road"
  ];

  const generateExcuse = () => {
    if (isAnimating) return; // Prevent multiple clicks during animation
    
    setIsAnimating(true);
    setAnimationClass('fadeOut');
    
    // First fade out the current excuse
    setTimeout(() => {
      const excuses = language === 'thai' ? thaiExcuses : englishExcuses;
      const randomIndex = Math.floor(Math.random() * excuses.length);
      setCurrentExcuse(excuses[randomIndex]);
      setAnimationClass('fadeIn');
      
      // After fade in completes, reset animation state
      setTimeout(() => {
        setIsAnimating(false);
        setAnimationClass('');
      }, 500);
    }, 300);
  };

  // CSS styles for animations
  const animationStyles = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    
    @keyframes fadeOut {
      from { opacity: 1; transform: translateY(0) scale(1); }
      to { opacity: 0; transform: translateY(-20px) scale(0.95); }
    }
    
    @keyframes buttonBounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-8px); }
      60% { transform: translateY(-4px); }
    }
    
         @keyframes pulse {
       0% { box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3); }
       50% { box-shadow: 0 6px 25px rgba(40, 167, 69, 0.5); }
       100% { box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3); }
     }
     
     @keyframes spin {
       from { transform: rotate(0deg); }
       to { transform: rotate(360deg); }
     }
     
     .fadeIn { animation: fadeIn 0.5s ease-out forwards; }
     .fadeOut { animation: fadeOut 0.3s ease-in forwards; }
     .bounce { animation: buttonBounce 0.6s ease; }
     .pulse { animation: pulse 2s infinite; }
     .spin { animation: spin 1s linear infinite; }
  `;

    return (
    <>
      <style>{animationStyles}</style>
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f5e6d3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'transparent',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center'
        }}>
          {/* Sleeping illustration */}
          <div style={{
            fontSize: '120px',
            marginBottom: '20px',
            lineHeight: '1'
          }}>
            😴
          </div>
          
          {/* Main title */}
          <h1 style={{
            color: '#2a2a2a',
            marginBottom: '40px',
            fontSize: '28px',
            fontWeight: '600',
            fontFamily: 'Arial, sans-serif'
          }}>
            วันนี้ฉันจะนอน
          </h1>

                  {/* Language selector buttons */}
          <div style={{ 
            marginBottom: '40px',
            display: 'flex',
            gap: '12px',
            justifyContent: 'center'
          }}>
            <button
              onClick={() => setLanguage('thai')}
              style={{
                backgroundColor: language === 'thai' ? '#f4c430' : '#ffffff',
                color: '#2a2a2a',
                border: '3px solid #2a2a2a',
                padding: '16px 32px',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                minWidth: '120px'
              }}
            >
              Thai
            </button>
            <button
              onClick={() => setLanguage('english')}
              style={{
                backgroundColor: language === 'english' ? '#f4c430' : '#ffffff',
                color: '#2a2a2a',
                border: '3px solid #2a2a2a',
                padding: '16px 32px',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                minWidth: '120px'
              }}
            >
              English
            </button>
          </div>

                           {/* Excuse display area */}
          <div 
            className={animationClass}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '30px',
              padding: '40px 30px',
              marginBottom: '40px',
              minHeight: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid #2a2a2a',
              boxShadow: '0 4px 0 #2a2a2a'
            }}>
            {currentExcuse ? (
              <p style={{
                fontSize: '20px',
                color: '#2a2a2a',
                lineHeight: '1.4',
                margin: 0,
                textAlign: 'center',
                fontWeight: '500'
              }}>
                "{currentExcuse}"
              </p>
            ) : (
              <p style={{
                fontSize: '18px',
                color: '#888',
                margin: 0,
                textAlign: 'center'
              }}>
                {language === 'thai' 
                  ? 'กดปุ่มเพื่อสุ่มข้ออ้างใหม่!' 
                  : 'Click the button to generate an excuse!'}
              </p>
            )}
          </div>

                                     {/* Random button */}
          <button
            className={!currentExcuse ? 'pulse' : ''}
            disabled={isAnimating}
            style={{
              backgroundColor: isAnimating ? '#d4af37' : '#f4c430',
              color: '#2a2a2a',
              border: '3px solid #2a2a2a',
              padding: '20px 60px',
              borderRadius: '50px',
              fontSize: '22px',
              fontWeight: '600',
              cursor: isAnimating ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 0 #2a2a2a',
              opacity: isAnimating ? 0.7 : 1,
              minWidth: '200px'
            }}
            onMouseOver={(e) => {
              if (!isAnimating) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 0 #2a2a2a';
              }
            }}
            onMouseOut={(e) => {
              if (!isAnimating) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 0 #2a2a2a';
              }
            }}
            onClick={(e) => {
              if (!isAnimating) {
                e.target.classList.add('bounce');
                setTimeout(() => {
                  e.target.classList.remove('bounce');
                }, 600);
                generateExcuse();
              }
            }}
          >
            {isAnimating ? (
              <><span className="spin">🔄</span> {language === 'thai' ? 'กำลังสุ่ม...' : 'Generating...'}</>
            ) : (
              <>{language === 'thai' ? 'Random' : 'Random'}</>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default ExcuseGenerator; 